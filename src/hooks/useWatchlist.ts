
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface WatchlistStock {
  symbol: string
  name: string
  current_price?: number
  change?: number
  change_percent?: number
  last_updated?: string
}

export interface StockPrediction {
  symbol: string
  current_price: number
  predicted_price: number
  predicted_change: number
  confidence: number
  sentiment_impact: number
  recommendation: 'BUY' | 'SELL' | 'HOLD'
  factors: string[]
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load watchlist from localStorage (you can later integrate with Supabase for user accounts)
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  const addToWatchlist = async (symbol: string, name: string) => {
    try {
      // Check if already exists
      if (watchlist.find(stock => stock.symbol === symbol)) {
        throw new Error('Stock already in watchlist')
      }

      const newStock: WatchlistStock = { symbol, name }
      const updatedWatchlist = [...watchlist, newStock]
      
      setWatchlist(updatedWatchlist)
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
      
      // Fetch current price
      await updateStockPrice(symbol)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to watchlist')
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    const updatedWatchlist = watchlist.filter(stock => stock.symbol !== symbol)
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const updateStockPrice = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
      )
      
      if (!response.ok) return

      const data = await response.json()
      const result = data.chart.result[0]
      
      if (result) {
        const meta = result.meta
        const currentPrice = meta.regularMarketPrice
        const previousClose = meta.previousClose
        const change = currentPrice - previousClose
        const changePercent = (change / previousClose) * 100

        setWatchlist(prev => prev.map(stock => 
          stock.symbol === symbol 
            ? {
                ...stock,
                current_price: currentPrice,
                change,
                change_percent: changePercent,
                last_updated: new Date().toISOString()
              }
            : stock
        ))
      }
    } catch (err) {
      console.error(`Failed to update price for ${symbol}:`, err)
    }
  }

  const updateAllPrices = async () => {
    setLoading(true)
    try {
      await Promise.all(watchlist.map(stock => updateStockPrice(stock.symbol)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update prices')
    } finally {
      setLoading(false)
    }
  }

  const getStockPrediction = async (symbol: string, newsHeadline: string, sentiment: string): Promise<StockPrediction | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('stock-analysis', {
        body: { symbol, news_headline: newsHeadline, sentiment }
      })

      if (error) throw error
      return data.data
    } catch (err) {
      console.error('Failed to get stock prediction:', err)
      return null
    }
  }

  return {
    watchlist,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    updateAllPrices,
    getStockPrediction
  }
}
