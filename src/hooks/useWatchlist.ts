import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface WatchlistStock {
  symbol: string
  name: string
  current_price?: number
  change?: number
  change_percent?: number
  last_updated?: string
  day_high?: number
  day_low?: number
  volume?: number
  market_cap?: number
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

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  const addToWatchlist = async (symbol: string, name: string) => {
    try {
      // Validate and format symbol for Indian stocks
      const formattedSymbol = formatStockSymbol(symbol.toUpperCase())
      
      // Check if already exists
      if (watchlist.find(stock => stock.symbol === formattedSymbol)) {
        throw new Error('Stock already in watchlist')
      }

      const newStock: WatchlistStock = { symbol: formattedSymbol, name }
      const updatedWatchlist = [...watchlist, newStock]
      
      setWatchlist(updatedWatchlist)
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
      
      // Fetch current price immediately
      await updateStockPrice(formattedSymbol)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to watchlist')
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    const updatedWatchlist = watchlist.filter(stock => stock.symbol !== symbol)
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  // Format stock symbol for Yahoo Finance API (Indian stocks)
  const formatStockSymbol = (symbol: string): string => {
    // If already has .NS or .BO, return as is
    if (symbol.includes('.NS') || symbol.includes('.BO')) {
      return symbol
    }
    
    // Add .NS for NSE stocks by default
    return `${symbol}.NS`
  }

  const updateStockPrice = async (symbol: string) => {
    try {
      console.log(`Fetching live price for ${symbol}...`)
      
      // Yahoo Finance API endpoint for real-time data
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d&includePrePost=false`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )
      
      if (!response.ok) {
        console.error(`Failed to fetch data for ${symbol}: ${response.status}`)
        return
      }

      const data = await response.json()
      const result = data.chart?.result?.[0]
      
      if (result && result.meta) {
        const meta = result.meta
        const currentPrice = meta.regularMarketPrice || meta.previousClose
        const previousClose = meta.previousClose
        const change = currentPrice - previousClose
        const changePercent = (change / previousClose) * 100

        console.log(`Updated ${symbol}: ₹${currentPrice} (${changePercent.toFixed(2)}%)`)

        setWatchlist(prev => prev.map(stock => 
          stock.symbol === symbol 
            ? {
                ...stock,
                current_price: currentPrice,
                change,
                change_percent: changePercent,
                day_high: meta.regularMarketDayHigh,
                day_low: meta.regularMarketDayLow,
                volume: meta.regularMarketVolume,
                market_cap: meta.marketCap,
                last_updated: new Date().toISOString()
              }
            : stock
        ))

        // Update localStorage
        const updatedWatchlist = watchlist.map(stock => 
          stock.symbol === symbol 
            ? {
                ...stock,
                current_price: currentPrice,
                change,
                change_percent: changePercent,
                day_high: meta.regularMarketDayHigh,
                day_low: meta.regularMarketDayLow,
                volume: meta.regularMarketVolume,
                market_cap: meta.marketCap,
                last_updated: new Date().toISOString()
              }
            : stock
        )
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
      }
    } catch (err) {
      console.error(`Failed to update price for ${symbol}:`, err)
    }
  }

  const updateAllPrices = async () => {
    if (watchlist.length === 0) return
    
    setLoading(true)
    setError(null)
    
    try {
      console.log('Updating all stock prices...')
      
      // Update prices sequentially to avoid rate limiting
      for (const stock of watchlist) {
        await updateStockPrice(stock.symbol)
        // Add small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      console.log('All prices updated successfully')
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

  // Auto-update prices every 5 minutes
  useEffect(() => {
    if (watchlist.length === 0) return

    // Update prices on mount
    updateAllPrices()

    // Set up interval for auto-updates
    const interval = setInterval(() => {
      updateAllPrices()
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [watchlist.length])

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
