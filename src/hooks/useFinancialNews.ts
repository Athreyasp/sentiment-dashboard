import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface FinancialNewsItem {
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

export function useFinancialNews() {
  const [news, setNews] = useState<FinancialNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Enhanced dedupe helper: remove duplicates by exact headline match and URL
  const dedupeNews = (items: FinancialNewsItem[]) => {
    const seenHeadlines = new Set<string>()
    const seenUrls = new Set<string>()
    const deduped: FinancialNewsItem[] = []
    
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

  // Fetch news from API
  const fetchNews = async () => {
    try {
      console.log('Triggering news fetch...')
      const { data, error } = await supabase.functions.invoke('fetch-financial-news')
      
      if (error) {
        console.error('Error fetching news:', error)
        toast({
          title: "Error fetching news",
          description: error.message,
          variant: "destructive"
        })
      } else {
        console.log('News fetch triggered successfully:', data)
        toast({
          title: "News Updated",
          description: "Latest financial news has been fetched"
        })
      }
    } catch (err) {
      console.error('Error calling news function:', err)
      toast({
        title: "Error",
        description: "Failed to fetch latest news",
        variant: "destructive"
      })
    }
  }

  // Load news from database
  const loadNews = async (searchQuery?: string) => {
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
        .gte('published_at', twoDaysAgo.toISOString())
        .order('published_at', { ascending: false })
        .limit(30)

      // Add search functionality
      if (searchQuery && searchQuery.trim()) {
        query = query.or(`headline.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,ticker.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      // Type the data properly to handle sentiment field
      const typedData: FinancialNewsItem[] = (data || []).map(item => ({
        ...item,
        sentiment: item.sentiment as 'positive' | 'neutral' | 'negative' | null
      }))

      setNews(dedupeNews(typedData))
      console.log(`Loaded ${dedupeNews(typedData).length} unique recent news articles (${typedData.length} total before deduplication)`)
    } catch (err) {
      console.error('Error loading news:', err)
      setError(err instanceof Error ? err.message : 'Failed to load news')
    } finally {
      setLoading(false)
    }
  }

  // Set up real-time subscription
  useEffect(() => {
    // Initial load
    loadNews()

    // Set up real-time subscription
    const channel = supabase
      .channel('financial_news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'financial_news'
        },
        (payload) => {
          console.log('Real-time news update:', payload)
          
          if (payload.eventType === 'INSERT') {
            const newItem: FinancialNewsItem = {
              ...payload.new as any,
              sentiment: (payload.new as any).sentiment as 'positive' | 'neutral' | 'negative' | null
            }
            
            // Check if news is recent (within 2 days)
            const newsDate = new Date(newItem.published_at)
            const twoDaysAgo = new Date()
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
            
            if (newsDate >= twoDaysAgo) {
              setNews(prev => dedupeNews([newItem, ...prev]))
              toast({
                title: "📰 Breaking News",
                description: newItem.headline.substring(0, 60) + "...",
                duration: 3000
              })
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem: FinancialNewsItem = {
              ...payload.new as any,
              sentiment: (payload.new as any).sentiment as 'positive' | 'neutral' | 'negative' | null
            }
            setNews(prev => prev.map(item => 
              item.id === updatedItem.id ? updatedItem : item
            ))
          } else if (payload.eventType === 'DELETE') {
            setNews(prev => prev.filter(item => item.id !== (payload.old as any).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    news,
    loading,
    error,
    fetchNews,
    loadNews,
    searchNews: (query: string) => loadNews(query)
  }
}