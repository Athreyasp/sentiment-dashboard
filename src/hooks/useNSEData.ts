import { useState, useEffect, useCallback } from 'react'

export interface NSEStock {
  symbol: string
  name: string
  price: number
  volume: number
  lastUpdated: string
}

export interface UseNSEDataReturn {
  nifty50Stocks: NSEStock[]
  loading: boolean
  error: string | null
  searchStock: (query: string) => Promise<NSEStock | null>
  refreshData: () => Promise<void>
}

// NIFTY 50 constituent stocks with their Yahoo Finance symbols
const NIFTY_50_STOCKS = [
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and SEZ' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv' },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corporation' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries' },
  { symbol: 'CIPLA.NS', name: 'Cipla' },
  { symbol: 'COALINDIA.NS', name: 'Coal India' },
  { symbol: 'DIVISLAB.NS', name: 'Divi\'s Laboratories' },
  { symbol: 'DRREDDY.NS', name: 'Dr. Reddy\'s Laboratories' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors' },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance Company' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
  { symbol: 'ITC.NS', name: 'ITC' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank' },
  { symbol: 'INFY.NS', name: 'Infosys' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India' },
  { symbol: 'NTPC.NS', name: 'NTPC' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India' },
  { symbol: 'ONGC.NS', name: 'Oil and Natural Gas Corporation' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation of India' },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
  { symbol: 'SBILIFE.NS', name: 'SBI Life Insurance Company' },
  { symbol: 'SHRIRAMFIN.NS', name: 'Shriram Finance' },
  { symbol: 'SBIN.NS', name: 'State Bank of India' },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
  { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel' },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra' },
  { symbol: 'TITAN.NS', name: 'Titan Company' },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement' },
  { symbol: 'UPL.NS', name: 'UPL' },
  { symbol: 'VEDL.NS', name: 'Vedanta' },
  { symbol: 'WIPRO.NS', name: 'Wipro' },
  { symbol: 'ZOMATO.NS', name: 'Zomato' }
]

export function useNSEData(): UseNSEDataReturn {
  const [nifty50Stocks, setNifty50Stocks] = useState<NSEStock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStockData = async (symbol: string, name: string): Promise<NSEStock | null> => {
    try {
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
        return null
      }

      const data = await response.json()
      const result = data.chart?.result?.[0]
      
      if (result && result.meta) {
        const meta = result.meta
        const price = meta.regularMarketPrice || meta.previousClose || 0
        const volume = meta.regularMarketVolume || 0

        return {
          symbol: symbol.replace('.NS', ''),
          name,
          price,
          volume,
          lastUpdated: new Date().toISOString()
        }
      }
      return null
    } catch (err) {
      console.error(`Failed to fetch data for ${symbol}:`, err)
      return null
    }
  }

  const refreshData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Fetching NIFTY 50 stock data...')
      
      const stockPromises = NIFTY_50_STOCKS.map(stock => 
        fetchStockData(stock.symbol, stock.name)
      )
      
      const results = await Promise.allSettled(stockPromises)
      const validStocks = results
        .map(result => result.status === 'fulfilled' ? result.value : null)
        .filter((stock): stock is NSEStock => stock !== null)
      
      setNifty50Stocks(validStocks)
      console.log(`Successfully fetched data for ${validStocks.length} stocks`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stock data'
      setError(errorMessage)
      console.error('Error fetching NIFTY 50 data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchStock = useCallback(async (query: string): Promise<NSEStock | null> => {
    if (!query.trim()) return null
    
    try {
      // Format the search query - add .NS if not present
      let searchSymbol = query.toUpperCase()
      if (!searchSymbol.endsWith('.NS')) {
        searchSymbol = `${searchSymbol}.NS`
      }
      
      // Try to find the stock name from our known stocks first
      const knownStock = NIFTY_50_STOCKS.find(stock => 
        stock.symbol === searchSymbol || 
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.replace('.NS', '') === query.toUpperCase()
      )
      
      const stockName = knownStock?.name || query
      
      return await fetchStockData(searchSymbol, stockName)
    } catch (err) {
      console.error('Error searching for stock:', err)
      return null
    }
  }, [])

  // Auto-refresh data every 30 seconds (within free tier limits)
  useEffect(() => {
    refreshData()
    
    const interval = setInterval(() => {
      refreshData()
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [refreshData])

  return {
    nifty50Stocks,
    loading,
    error,
    searchStock,
    refreshData
  }
}