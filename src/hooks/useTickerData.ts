
import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

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
      // Use Supabase edge function to fetch Yahoo Finance data
      const yahooSymbol = ticker.endsWith('.NS') ? ticker : `${ticker}.NS`
      
      const { data: response, error: functionError } = await supabase.functions.invoke(
        'fetch-yahoo-finance',
        {
          body: { symbol: yahooSymbol }
        }
      )
      
      if (functionError) {
        throw new Error(functionError.message)
      }
      
      if (!response?.success) {
        throw new Error(response?.error || 'Failed to fetch data')
      }

      const yahooData = response.data
      
      const mockData: TickerData = {
        ticker: ticker.replace('.NS', ''),
        company: getIndianCompanyName(ticker),
        current_sentiment: Math.random() * 100, // Mock sentiment
        price: yahooData.currentPrice,
        change: yahooData.change,
        changePercent: yahooData.changePercent,
        trend: yahooData.trend,
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
