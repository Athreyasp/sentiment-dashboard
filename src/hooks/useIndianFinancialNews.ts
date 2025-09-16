import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface IndianFinancialNewsItem {
  id: string
  headline: string
  content: string | null
  source: string
  sentiment: 'positive' | 'neutral' | 'negative' | null
  ticker: string | null
  url: string | null
  published_at: string
  created_at: string
  updated_at: string
  is_indian_market?: boolean
}

export function useIndianFinancialNews() {
  const [news, setNews] = useState<IndianFinancialNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Enhanced dedupe helper: remove duplicates by exact headline match and URL
  const dedupeNews = (items: IndianFinancialNewsItem[]) => {
    const seenHeadlines = new Set<string>()
    const seenUrls = new Set<string>()
    const deduped: IndianFinancialNewsItem[] = []
    
    // Sort by published_at desc first to keep the latest
    const sortedItems = items.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    
    for (const item of sortedItems) {
      // Skip if we've seen this exact headline before
      if (seenHeadlines.has(item.headline)) {
        continue
      }
      
      // Skip if we've seen this exact URL before (and URL exists)
      if (item.url && seenUrls.has(item.url)) {
        continue
      }
      
      // Add to our tracking sets
      seenHeadlines.add(item.headline)
      if (item.url) {
        seenUrls.add(item.url)
      }
      
      deduped.push(item)
    }
    
    return deduped
  }

  // Fetch live Indian financial news from Inoreader
  const fetchIndianFinancialNews = async () => {
    try {
      console.log('Triggering Inoreader feed processing...')
      const { data, error } = await supabase.functions.invoke('process-inoreader-feed')
      
      if (error) {
        console.error('Error processing Inoreader feed:', error)
        toast({
          title: "Error fetching news",
          description: error.message,
          variant: "destructive"
        })
      } else {
        console.log('Inoreader feed processed successfully:', data)
        toast({
          title: "📈 Indian Financial News Updated",
          description: `${data?.added || 0} new articles added`
        })
      }
    } catch (err) {
      console.error('Error calling Inoreader processing function:', err)
      toast({
        title: "Error",
        description: "Failed to fetch latest Indian financial news",
        variant: "destructive"
      })
    }
  }

  // Load news from database with Indian market focus
  const loadIndianFinancialNews = async (searchQuery?: string, sentiment?: string, ticker?: string) => {
    try {
      setLoading(true)
      setError(null)

      // Filter to only show news from current day or previous day
      const currentTime = new Date()
      const twoDaysAgo = new Date(currentTime)
      twoDaysAgo.setDate(currentTime.getDate() - 2)

      let query = supabase
        .from('financial_news')
        .select('*')
        .eq('is_indian_market', true)
        .gte('published_at', twoDaysAgo.toISOString())
        .order('published_at', { ascending: false })
        .limit(50)

      // Filter for Indian financial news
      if (searchQuery && searchQuery.trim()) {
        const indianFinancialQuery = `headline.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,ticker.ilike.%${searchQuery}%`
        query = query.or(indianFinancialQuery)
      }

      // Add sentiment filter
      if (sentiment && sentiment !== 'all') {
        query = query.eq('sentiment', sentiment)
      }

      // Add ticker filter
      if (ticker && ticker.trim()) {
        query = query.ilike('ticker', `%${ticker}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      // Map data since we're already filtering by is_indian_market in query
      const indianNews = (data || []).map(item => ({
        ...item,
        sentiment: item.sentiment as 'positive' | 'neutral' | 'negative' | null
      }))

      setNews(dedupeNews(indianNews))
      console.log(`Loaded ${indianNews.length} Indian financial news articles`)
    } catch (err) {
      console.error('Error loading Indian financial news:', err)
      setError(err instanceof Error ? err.message : 'Failed to load news')
    } finally {
      setLoading(false)
    }
  }

  // Get ticker-specific news for prediction
  const getTickerNews = async (ticker: string): Promise<IndianFinancialNewsItem[]> => {
    try {
      const { data, error } = await supabase
        .from('financial_news')
        .select('*')
        .or(`ticker.ilike.%${ticker}%,headline.ilike.%${ticker}%,content.ilike.%${ticker}%`)
        .order('published_at', { ascending: false })
        .limit(10)

      if (error) throw error

      return (data || []).map(item => ({
        ...item,
        sentiment: item.sentiment as 'positive' | 'neutral' | 'negative' | null
      }))
    } catch (err) {
      console.error('Error fetching ticker news:', err)
      return []
    }
  }

  // Set up real-time subscription and auto-refresh
  useEffect(() => {
    loadIndianFinancialNews()

    // Auto-refresh news every 10 minutes (reduced frequency)
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing Indian financial news...')
      fetchIndianFinancialNews().then(() => {
        // Reload the news after processing
        setTimeout(() => loadIndianFinancialNews(), 3000)
      })
    }, 10 * 60 * 1000) // 10 minutes

    const channel = supabase
      .channel('indian_financial_news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'financial_news'
        },
        (payload) => {
          console.log('Real-time Indian financial news update:', payload)
          
          if (payload.eventType === 'INSERT') {
            const newItem: IndianFinancialNewsItem = {
              ...payload.new as any,
              sentiment: (payload.new as any).sentiment as 'positive' | 'neutral' | 'negative' | null
            }
            
            // Only process if it's marked as Indian market news
            if ((payload.new as any).is_indian_market) {
              // Check if news is recent (within 2 days)
              const newsDate = new Date(newItem.published_at)
              const twoDaysAgo = new Date()
              twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
              
              if (newsDate >= twoDaysAgo) {
                setNews(prev => dedupeNews([newItem, ...prev]))
                toast({
                  title: "📈 Indian Market News",
                  description: newItem.headline.substring(0, 60) + "...",
                  duration: 3000
                })
              }
            }
          }
        }
      )
      .subscribe()

    return () => {
      clearInterval(refreshInterval)
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    news,
    loading,
    error,
    fetchIndianFinancialNews,
    loadIndianFinancialNews,
    getTickerNews,
    searchNews: (query: string, sentiment?: string, ticker?: string) => 
      loadIndianFinancialNews(query, sentiment, ticker)
  }
}