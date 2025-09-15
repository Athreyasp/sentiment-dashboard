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
}

export function useIndianFinancialNews() {
  const [news, setNews] = useState<IndianFinancialNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Dedupe helper: prefer unique by URL, else by normalized headline; keep latest published_at
  const dedupeNews = (items: IndianFinancialNewsItem[]) => {
    const map = new Map<string, IndianFinancialNewsItem>()
    for (const item of items) {
      const key = (item.url || item.headline || '').trim().toLowerCase()
      const existing = map.get(key)
      if (!existing) {
        map.set(key, item)
      } else {
        // Keep the latest by published_at
        map.set(key, new Date(item.published_at) > new Date(existing.published_at) ? item : existing)
      }
    }
    // Preserve ordering by date desc
    return Array.from(map.values()).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
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

      let query = supabase
        .from('financial_news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(100)

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

      // Filter for Indian context
      const indianNews = (data || [])
        .filter(item => {
          const content = `${item.headline} ${item.content || ''}`.toLowerCase()
          const indianKeywords = ['india', 'indian', 'nse', 'bse', 'nifty', 'sensex', 'rupee', 'rbi', 'mumbai']
          return indianKeywords.some(keyword => content.includes(keyword))
        })
        .map(item => ({
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

    // Auto-refresh news every 5 minutes
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing Indian financial news...')
      fetchIndianFinancialNews().then(() => {
        // Reload the news after processing
        setTimeout(() => loadIndianFinancialNews(), 2000)
      })
    }, 5 * 60 * 1000) // 5 minutes

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
            
            // Check if it's Indian financial news
            const content = `${newItem.headline} ${newItem.content || ''}`.toLowerCase()
            const indianKeywords = ['india', 'indian', 'nse', 'bse', 'nifty', 'sensex', 'rupee', 'rbi']
            const isIndianNews = indianKeywords.some(keyword => content.includes(keyword))
            
            if (isIndianNews) {
              setNews(prev => dedupeNews([newItem, ...prev]))
              toast({
                title: "📈 Indian Market News",
                description: newItem.headline.substring(0, 60) + "...",
                duration: 5000
              })
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