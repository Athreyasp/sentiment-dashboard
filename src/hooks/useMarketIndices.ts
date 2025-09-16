import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  lastUpdated: string
  currency: string
  icon?: string
}

export interface UseMarketIndicesReturn {
  indices: MarketIndex[]
  loading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

// Major Indian market indices with their Yahoo Finance symbols
const MARKET_INDICES = [
  { 
    symbol: '^NSEI', 
    name: 'NIFTY 50',
    icon: '📊'
  },
  { 
    symbol: '^BSESN', 
    name: 'SENSEX',
    icon: '📈'
  },
  { 
    symbol: '^NSEBANK', 
    name: 'NIFTY BANK',
    icon: '🏦'
  },
  { 
    symbol: '^INDIAVIX', 
    name: 'INDIA VIX',
    icon: '⚡'
  }
]

export function useMarketIndices(): UseMarketIndicesReturn {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchIndexData = async (symbol: string, name: string, icon?: string): Promise<MarketIndex | null> => {
    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('fetch-yahoo-finance', {
        body: { symbol }
      })

      if (supabaseError) {
        console.error(`Supabase error for ${symbol}:`, supabaseError)
        return null
      }

      if (!data?.success || !data?.data) {
        console.error(`No data returned for ${symbol}`)
        return null
      }

      const indexData = data.data
      
      return {
        symbol: symbol,
        name,
        price: indexData.currentPrice || 0,
        change: indexData.change || 0,
        changePercent: indexData.changePercent || 0,
        lastUpdated: new Date().toISOString(),
        currency: indexData.meta?.currency || 'INR',
        icon
      }
    } catch (err) {
      console.error(`Failed to fetch data for ${symbol}:`, err)
      return null
    }
  }

  const refreshData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Fetching market indices data...')
      
      const indexPromises = MARKET_INDICES.map(index => 
        fetchIndexData(index.symbol, index.name, index.icon)
      )
      
      const results = await Promise.allSettled(indexPromises)
      const validIndices = results
        .map(result => result.status === 'fulfilled' ? result.value : null)
        .filter((index): index is MarketIndex => index !== null)
      
      if (validIndices.length === 0) {
        throw new Error('No market data could be fetched')
      }
      
      setIndices(validIndices)
      console.log(`Successfully fetched data for ${validIndices.length} indices`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market indices data'
      setError(errorMessage)
      console.error('Error fetching market indices:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-refresh data every 2 minutes for indices
  useEffect(() => {
    refreshData()
    
    const interval = setInterval(() => {
      refreshData()
    }, 120000) // 2 minutes
    
    return () => clearInterval(interval)
  }, [refreshData])

  return {
    indices,
    loading,
    error,
    refreshData
  }
}