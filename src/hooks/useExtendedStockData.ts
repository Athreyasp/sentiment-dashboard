import { useState, useEffect, useCallback } from 'react'

export interface ExtendedStock {
  symbol: string
  name: string
  price: number
  volume: number
  change: number
  changePercent: number
  marketCap?: number
  sector?: string
  exchange: 'NSE' | 'BSE'
  lastUpdated: string
}

export interface UseExtendedStockDataReturn {
  allStocks: ExtendedStock[]
  loading: boolean
  error: string | null
  searchStock: (query: string) => Promise<ExtendedStock | null>
  refreshData: () => Promise<void>
  filterByExchange: (exchange?: 'NSE' | 'BSE') => ExtendedStock[]
  filterBySector: (sector?: string) => ExtendedStock[]
}

// Extended list of major Indian stocks across NSE and BSE
const EXTENDED_INDIAN_STOCKS = [
  // NIFTY 50 stocks
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and SEZ', sector: 'Infrastructure', exchange: 'NSE' as const },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', sector: 'Chemicals', exchange: 'NSE' as const },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', sector: 'Telecom', exchange: 'NSE' as const },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corporation', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'CIPLA.NS', name: 'Cipla', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'COALINDIA.NS', name: 'Coal India', sector: 'Mining', exchange: 'NSE' as const },
  { symbol: 'DIVISLAB.NS', name: 'Divi\'s Laboratories', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'DRREDDY.NS', name: 'Dr. Reddy\'s Laboratories', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries', sector: 'Chemicals', exchange: 'NSE' as const },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance Company', sector: 'Insurance', exchange: 'NSE' as const },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'ITC.NS', name: 'ITC', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'INFY.NS', name: 'Infosys', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'LT.NS', name: 'Larsen & Toubro', sector: 'Infrastructure', exchange: 'NSE' as const },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'NTPC.NS', name: 'NTPC', sector: 'Power', exchange: 'NSE' as const },
  { symbol: 'ONGC.NS', name: 'Oil and Natural Gas Corporation', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation of India', sector: 'Power', exchange: 'NSE' as const },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'SBILIFE.NS', name: 'SBI Life Insurance Company', sector: 'Insurance', exchange: 'NSE' as const },
  { symbol: 'SBIN.NS', name: 'State Bank of India', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'SHRIRAMFIN.NS', name: 'Shriram Finance', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'TITAN.NS', name: 'Titan Company', sector: 'Consumer Goods', exchange: 'NSE' as const },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement', sector: 'Cement', exchange: 'NSE' as const },
  { symbol: 'UPL.NS', name: 'UPL', sector: 'Chemicals', exchange: 'NSE' as const },
  { symbol: 'VEDL.NS', name: 'Vedanta', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'WIPRO.NS', name: 'Wipro', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'ZOMATO.NS', name: 'Zomato', sector: 'Consumer Services', exchange: 'NSE' as const },

  // Additional major stocks beyond NIFTY 50
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy', sector: 'Power', exchange: 'NSE' as const },
  { symbol: 'ADANITRANS.NS', name: 'Adani Transmission', sector: 'Power', exchange: 'NSE' as const },
  { symbol: 'APOLLOHOSP.NS', name: 'Apollo Hospitals Enterprise', sector: 'Healthcare', exchange: 'NSE' as const },
  { symbol: 'AUBANK.NS', name: 'AU Small Finance Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'BHARATFORG.NS', name: 'Bharat Forge', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'BOSCHLTD.NS', name: 'Bosch', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'CADILAHC.NS', name: 'Cadila Healthcare', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'CANBK.NS', name: 'Canara Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'ESCORTS.NS', name: 'Escorts', sector: 'Automobile', exchange: 'NSE' as const },
  { symbol: 'FEDERALBNK.NS', name: 'Federal Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'GODREJCP.NS', name: 'Godrej Consumer Products', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'HDFCAMC.NS', name: 'HDFC Asset Management Company', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'ICICIPRULI.NS', name: 'ICICI Prudential Life Insurance Company', sector: 'Insurance', exchange: 'NSE' as const },
  { symbol: 'INDIGO.NS', name: 'InterGlobe Aviation', sector: 'Aviation', exchange: 'NSE' as const },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'JINDALSTEL.NS', name: 'Jindal Steel & Power', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'L&TFH.NS', name: 'L&T Finance Holdings', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'LICHSGFIN.NS', name: 'LIC Housing Finance', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'LUPIN.NS', name: 'Lupin', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'MARICO.NS', name: 'Marico', sector: 'FMCG', exchange: 'NSE' as const },
  { symbol: 'MINDTREE.NS', name: 'Mindtree', sector: 'IT', exchange: 'NSE' as const },
  { symbol: 'MUTHOOTFIN.NS', name: 'Muthoot Finance', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'NMDC.NS', name: 'NMDC', sector: 'Mining', exchange: 'NSE' as const },
  { symbol: 'ONGC.NS', name: 'Oil and Natural Gas Corporation', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'PAGEIND.NS', name: 'Page Industries', sector: 'Textiles', exchange: 'NSE' as const },
  { symbol: 'PETRONET.NS', name: 'Petronet LNG', sector: 'Oil & Gas', exchange: 'NSE' as const },
  { symbol: 'PFC.NS', name: 'Power Finance Corporation', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'PIDILITIND.NS', name: 'Pidilite Industries', sector: 'Chemicals', exchange: 'NSE' as const },
  { symbol: 'PNB.NS', name: 'Punjab National Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'RBLBANK.NS', name: 'RBL Bank', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'RECLTD.NS', name: 'REC', sector: 'Financial Services', exchange: 'NSE' as const },
  { symbol: 'SAIL.NS', name: 'Steel Authority of India', sector: 'Metals', exchange: 'NSE' as const },
  { symbol: 'SIEMENS.NS', name: 'Siemens', sector: 'Engineering', exchange: 'NSE' as const },
  { symbol: 'TORNTPHARM.NS', name: 'Torrent Pharmaceuticals', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
  { symbol: 'UNIONBANK.NS', name: 'Union Bank of India', sector: 'Banking', exchange: 'NSE' as const },
  { symbol: 'VOLTAS.NS', name: 'Voltas', sector: 'Consumer Goods', exchange: 'NSE' as const },

  // Major BSE stocks
  { symbol: 'RELIANCE.BO', name: 'Reliance Industries (BSE)', sector: 'Oil & Gas', exchange: 'BSE' as const },
  { symbol: 'TCS.BO', name: 'Tata Consultancy Services (BSE)', sector: 'IT', exchange: 'BSE' as const },
  { symbol: 'HDFCBANK.BO', name: 'HDFC Bank (BSE)', sector: 'Banking', exchange: 'BSE' as const },
  { symbol: 'INFY.BO', name: 'Infosys (BSE)', sector: 'IT', exchange: 'BSE' as const },
  { symbol: 'HINDUNILVR.BO', name: 'Hindustan Unilever (BSE)', sector: 'FMCG', exchange: 'BSE' as const },
  { symbol: 'ICICIBANK.BO', name: 'ICICI Bank (BSE)', sector: 'Banking', exchange: 'BSE' as const },
  { symbol: 'SBI.BO', name: 'State Bank of India (BSE)', sector: 'Banking', exchange: 'BSE' as const },
  { symbol: 'BHARTIARTL.BO', name: 'Bharti Airtel (BSE)', sector: 'Telecom', exchange: 'BSE' as const },
  { symbol: 'ITC.BO', name: 'ITC (BSE)', sector: 'FMCG', exchange: 'BSE' as const },
  { symbol: 'LICI.BO', name: 'Life Insurance Corporation of India', sector: 'Insurance', exchange: 'BSE' as const }
]

export function useExtendedStockData(): UseExtendedStockDataReturn {
  const [allStocks, setAllStocks] = useState<ExtendedStock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStockData = async (symbol: string, name: string, sector?: string, exchange?: 'NSE' | 'BSE'): Promise<ExtendedStock | null> => {
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
        const previousClose = meta.previousClose || 0
        const change = price - previousClose
        const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

        return {
          symbol: symbol.replace(/\.(NS|BO)$/, ''),
          name,
          price,
          volume,
          change,
          changePercent,
          marketCap: meta.marketCap,
          sector,
          exchange: exchange || 'NSE',
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
      console.log('Fetching extended Indian stock data...')
      
      const stockPromises = EXTENDED_INDIAN_STOCKS.map(stock => 
        fetchStockData(stock.symbol, stock.name, stock.sector, stock.exchange)
      )
      
      const results = await Promise.allSettled(stockPromises)
      const validStocks = results
        .map(result => result.status === 'fulfilled' ? result.value : null)
        .filter((stock): stock is ExtendedStock => stock !== null)
      
      setAllStocks(validStocks)
      console.log(`Successfully fetched data for ${validStocks.length} stocks`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stock data'
      setError(errorMessage)
      console.error('Error fetching extended stock data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchStock = useCallback(async (query: string): Promise<ExtendedStock | null> => {
    if (!query.trim()) return null
    
    try {
      // Search in existing stocks first
      const existingStock = allStocks.find(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
      
      if (existingStock) return existingStock
      
      // Format the search query - try both NSE and BSE
      let searchSymbol = query.toUpperCase()
      if (!searchSymbol.endsWith('.NS') && !searchSymbol.endsWith('.BO')) {
        searchSymbol = `${searchSymbol}.NS`
      }
      
      // Try to find the stock info from our known stocks first
      const knownStock = EXTENDED_INDIAN_STOCKS.find(stock => 
        stock.symbol === searchSymbol || 
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.replace(/\.(NS|BO)$/, '') === query.toUpperCase()
      )
      
      const stockName = knownStock?.name || query
      const sector = knownStock?.sector
      const exchange = knownStock?.exchange || 'NSE'
      
      return await fetchStockData(searchSymbol, stockName, sector, exchange)
    } catch (err) {
      console.error('Error searching for stock:', err)
      return null
    }
  }, [allStocks])

  const filterByExchange = useCallback((exchange?: 'NSE' | 'BSE') => {
    if (!exchange) return allStocks
    return allStocks.filter(stock => stock.exchange === exchange)
  }, [allStocks])

  const filterBySector = useCallback((sector?: string) => {
    if (!sector) return allStocks
    return allStocks.filter(stock => stock.sector === sector)
  }, [allStocks])

  // Auto-refresh data every 2 minutes (within free tier limits)
  useEffect(() => {
    refreshData()
    
    const interval = setInterval(() => {
      refreshData()
    }, 120000) // 2 minutes
    
    return () => clearInterval(interval)
  }, [refreshData])

  return {
    allStocks,
    loading,
    error,
    searchStock,
    refreshData,
    filterByExchange,
    filterBySector
  }
}