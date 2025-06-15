
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

      let query = supabase
        .from('financial_news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(50)

      // Add search functionality
      if (searchQuery && searchQuery.trim()) {
        query = query.or(`headline.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,ticker.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      setNews(data || [])
      console.log(`Loaded ${data?.length || 0} news articles`)
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
            setNews(prev => [payload.new as FinancialNewsItem, ...prev])
            toast({
              title: "📰 Breaking News",
              description: (payload.new as FinancialNewsItem).headline.substring(0, 60) + "...",
            })
          } else if (payload.eventType === 'UPDATE') {
            setNews(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as FinancialNewsItem : item
            ))
          } else if (payload.eventType === 'DELETE') {
            setNews(prev => prev.filter(item => item.id !== payload.old.id))
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
