
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
      // For now, we'll use mock data since the backend API isn't implemented yet
      // In a real implementation, this would be: 
      // const response = await fetch(`/api/ticker/${ticker}`)
      // const result = await response.json()

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data generator based on ticker
      const mockData: TickerData = {
        ticker: ticker,
        company: getCompanyName(ticker),
        current_sentiment: Math.random() * 100,
        price: Math.random() * 500 + 50,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 10,
        trend: generateTrendData(),
        news: generateNewsData(ticker)
      }

      setData(mockData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ticker data')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchTickerData }
}

function getCompanyName(ticker: string): string {
  const companyMap: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'TSLA': 'Tesla Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'NVDA': 'NVIDIA Corporation',
    'META': 'Meta Platforms Inc.',
    'NFLX': 'Netflix Inc.',
    'UBER': 'Uber Technologies Inc.',
    'SPOT': 'Spotify Technology SA',
  }
  return companyMap[ticker] || `${ticker} Corp.`
}

function generateTrendData() {
  const data = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      sentiment: Math.random() * 100,
      price: Math.random() * 500 + 50
    })
  }
  return data
}

function generateNewsData(ticker: string) {
  const sentiments = ['positive', 'negative', 'neutral']
  const sources = ['Reuters', 'Bloomberg', 'CNBC', 'MarketWatch', 'Yahoo Finance']
  const times = ['1h ago', '2h ago', '4h ago', '6h ago', '1d ago']
  
  return Array.from({ length: 3 }, (_, i) => ({
    headline: `${getCompanyName(ticker)} ${getRandomHeadline()}`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    time: times[Math.floor(Math.random() * times.length)],
    impact: Math.random()
  }))
}

function getRandomHeadline(): string {
  const headlines = [
    'announces breakthrough in AI technology',
    'quarterly earnings exceed analyst expectations',
    'faces regulatory concerns in European markets',
    'launches new product line with strong preorders',
    'reports record revenue for the quarter',
    'stock price surges on positive outlook'
  ]
  return headlines[Math.floor(Math.random() * headlines.length)]
}
