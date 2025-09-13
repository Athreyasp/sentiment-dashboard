import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface StockPrediction {
  symbol: string
  prediction: 'UP' | 'DOWN' | 'STABLE'
  confidence: number
  target_price_change: number
  timeframe: string
  reasoning: string
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
  key_factors: string[]
  recommendation: 'BUY' | 'SELL' | 'HOLD'
}

interface NewsItem {
  id: string
  headline: string
  content: string
  source: string
  url: string
  published_at: string
  sentiment: string
  prediction: string
  confidence_score: number
  stock_symbols: string[]
  key_factors: string[]
  stock_predictions?: StockPrediction[]
}

interface MarketSummary {
  overall_sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  market_outlook: string
  key_themes: string[]
  sector_impact: Record<string, string>
  nifty_prediction: 'UP' | 'DOWN' | 'STABLE'
  confidence: number
}

interface EnhancedNewsData {
  news: NewsItem[]
  market_summary: MarketSummary | null
  total_count: number
  generated_at: string
}

export function useEnhancedNews() {
  const [data, setData] = useState<EnhancedNewsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEnhancedNews = useCallback(async (options: {
    limit?: number
    includePredictions?: boolean
  } = {}) => {
    setLoading(true)
    setError(null)

    try {
      const { limit = 20, includePredictions = true } = options

      const { data: response, error: functionError } = await supabase.functions.invoke(
        'get-news-with-predictions',
        {
          body: { 
            predictions: includePredictions, 
            limit 
          }
        }
      )

      if (functionError) {
        throw functionError
      }

      if (response?.success) {
        setData(response.data)
      } else {
        throw new Error(response?.error || 'Failed to fetch enhanced news')
      }
    } catch (err) {
      console.error('Enhanced news fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshNews = useCallback(() => {
    return fetchEnhancedNews({ includePredictions: true })
  }, [fetchEnhancedNews])

  useEffect(() => {
    fetchEnhancedNews({ includePredictions: true })
  }, [fetchEnhancedNews])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEnhancedNews({ includePredictions: true })
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [fetchEnhancedNews])

  return {
    news: data?.news || [],
    marketSummary: data?.market_summary || null,
    totalCount: data?.total_count || 0,
    generatedAt: data?.generated_at || null,
    loading,
    error,
    refreshNews,
    fetchEnhancedNews
  }
}