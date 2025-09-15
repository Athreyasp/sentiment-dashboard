
import { useState, useCallback } from 'react'

interface TickerData {
  ticker: string
  company: string
  current_sentiment: number
  price: number
  change: number
  changePercent: number
  trend: Array<{
    date: string
    sentiment: number
    price: number
  }>
  news: Array<{
    headline: string
    sentiment: string
    source: string
    time: string
    impact: number
    url?: string
  }>
}

interface UseTickerDataReturn {
  data: TickerData | null
  loading: boolean
  error: string | null
  fetchTickerData: (ticker: string) => Promise<void>
}

export function useTickerData(): UseTickerDataReturn {
  const [data, setData] = useState<TickerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickerData = useCallback(async (ticker: string) => {
    if (!ticker) return

    setLoading(true)
    setError(null)

    try {
      // Fetch real Yahoo Finance data for Indian stocks
      const yahooSymbol = ticker.endsWith('.NS') ? ticker : `${ticker}.NS`
      
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=7d&includePrePost=false`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${ticker}`)
      }

      const yahooData = await response.json()
      const result = yahooData.chart?.result?.[0]
      
      if (!result) {
        throw new Error('No data available for this stock')
      }

      const meta = result.meta
      const timestamps = result.timestamp || []
      const quotes = result.indicators?.quote?.[0] || {}
      const closes = quotes.close || []

      const currentPrice = meta.regularMarketPrice || meta.previousClose || 0
      const previousClose = meta.previousClose || 0
      const change = currentPrice - previousClose
      const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

      // Generate trend data from historical prices
      const trendData = timestamps.slice(-7).map((timestamp: number, index: number) => ({
        date: new Date(timestamp * 1000).toISOString().split('T')[0],
        sentiment: Math.random() * 100, // Mock sentiment data
        price: closes[closes.length - 7 + index] || currentPrice
      }))

      const mockData: TickerData = {
        ticker: ticker.replace('.NS', ''),
        company: getIndianCompanyName(ticker),
        current_sentiment: Math.random() * 100, // Mock sentiment
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        trend: trendData,
        news: generateIndianNewsData(ticker)
      }

      setData(mockData)
    } catch (err) {
      console.error('Error fetching ticker data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch ticker data')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchTickerData }
}

function getIndianCompanyName(ticker: string): string {
  const cleanTicker = ticker.replace('.NS', '').toUpperCase()
  const companyMap: Record<string, string> = {
    'RELIANCE': 'Reliance Industries Limited',
    'TCS': 'Tata Consultancy Services',
    'HDFCBANK': 'HDFC Bank Limited',
    'INFY': 'Infosys Limited',
    'HINDUNILVR': 'Hindustan Unilever Limited',
    'ICICIBANK': 'ICICI Bank Limited',
    'BHARTIARTL': 'Bharti Airtel Limited',
    'LT': 'Larsen & Toubro Limited',
    'SBIN': 'State Bank of India',
    'WIPRO': 'Wipro Limited',
    'MARUTI': 'Maruti Suzuki India Limited',
    'KOTAKBANK': 'Kotak Mahindra Bank Limited',
    'ASIANPAINT': 'Asian Paints Limited',
    'BAJFINANCE': 'Bajaj Finance Limited',
    'ADANIPORTS': 'Adani Ports and SEZ Limited'
  }
  return companyMap[cleanTicker] || `${cleanTicker} Limited`
}

function generateIndianNewsData(ticker: string) {
  const sentiments = ['positive', 'negative', 'neutral']
  const sources = ['Economic Times', 'Moneycontrol', 'Business Standard', 'Livemint', 'CNBC TV18']
  const times = ['1h ago', '2h ago', '4h ago', '6h ago', '1d ago']
  const cleanTicker = ticker.replace('.NS', '').toUpperCase()
  
  return Array.from({ length: 5 }, (_, i) => ({
    headline: `${getIndianCompanyName(ticker)} ${getRandomIndianHeadline()}`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    time: times[Math.floor(Math.random() * times.length)],
    impact: Math.random()
  }))
}

function getRandomIndianHeadline(): string {
  const headlines = [
    'reports strong quarterly results',
    'announces major expansion plans',
    'faces regulatory challenges in new sector',
    'launches innovative product in Indian market',
    'stock surges on positive analyst upgrade',
    'declares dividend for shareholders',
    'enters strategic partnership agreement',
    'posts record revenue growth',
    'plans to increase manufacturing capacity',
    'receives major government contract'
  ]
  return headlines[Math.floor(Math.random() * headlines.length)]
}
