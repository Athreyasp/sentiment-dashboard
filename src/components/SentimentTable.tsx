
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, TrendingDown, Minus, ArrowUpDown, Clock, Bell, BellOff, ChevronDown, ChevronRight } from 'lucide-react'

interface TickerData {
  ticker: string
  company: string
  sentiment: number
  sentimentLabel: 'positive' | 'negative' | 'neutral'
  lastUpdated: string
  alerts: boolean
  price: number
  change: number
  news: Array<{
    headline: string
    source: string
    time: string
    sentiment: 'positive' | 'negative' | 'neutral'
  }>
}

interface SentimentTableProps {
  tickers: string[]
  onToggleAlert: (ticker: string) => void
}

export function SentimentTable({ tickers, onToggleAlert }: SentimentTableProps) {
  const [sortBy, setSortBy] = useState<'ticker' | 'sentiment'>('ticker')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Mock data generation
  const generateMockData = (ticker: string): TickerData => {
    const companies: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'TSLA': 'Tesla Inc.',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.',
      'MSFT': 'Microsoft Corporation',
      'META': 'Meta Platforms Inc.',
      'NVDA': 'NVIDIA Corporation',
    }

    const sentiment = (Math.random() - 0.5) * 2 // -1 to 1
    const sentimentLabel = sentiment > 0.2 ? 'positive' : sentiment < -0.2 ? 'negative' : 'neutral'
    
    return {
      ticker,
      company: companies[ticker] || `${ticker} Corporation`,
      sentiment,
      sentimentLabel,
      lastUpdated: `${Math.floor(Math.random() * 60)}m ago`,
      alerts: Math.random() > 0.5,
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 10,
      news: Array.from({ length: 3 }, (_, i) => ({
        headline: `${companies[ticker] || ticker} ${['reports strong quarterly earnings', 'announces new product launch', 'faces regulatory challenges'][i]}`,
        source: ['Reuters', 'Bloomberg', 'CNBC'][i],
        time: `${i + 1}h ago`,
        sentiment: ['positive', 'neutral', 'negative'][i] as any
      }))
    }
  }

  const data = tickers.map(generateMockData)

  const sortedData = [...data].sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1
    if (sortBy === 'ticker') {
      return factor * a.ticker.localeCompare(b.ticker)
    }
    return factor * (a.sentiment - b.sentiment)
  })

  const handleSort = (column: 'ticker' | 'sentiment') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getSentimentIcon = (label: 'positive' | 'negative' | 'neutral') => {
    switch (label) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-[#00C49F]" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-[#FF4C4C]" />
      default:
        return <Minus className="w-4 h-4 text-[#FFCB05]" />
    }
  }

  const getSentimentBadge = (label: 'positive' | 'negative' | 'neutral') => {
    const colors = {
      positive: 'bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30',
      negative: 'bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30',
      neutral: 'bg-[#FFCB05]/15 text-[#FFCB05] border-[#FFCB05]/30'
    }
    
    return (
      <Badge className={`${colors[label]} hover:opacity-80 transition-all duration-200 font-medium`}>
        <div className={`w-2 h-2 rounded-full mr-1.5 ${
          label === 'positive' ? 'bg-[#00C49F]' : 
          label === 'negative' ? 'bg-[#FF4C4C]' : 'bg-[#FFCB05]'
        }`}></div>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Badge>
    )
  }

  if (tickers.length === 0) {
    return (
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="text-slate-400 dark:text-slate-500 mb-4">
            <TrendingUp className="w-16 h-16 mx-auto opacity-30" />
          </div>
          <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
            No Stocks Added Yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Upload a CSV file or manually add ticker symbols to start tracking sentiment analysis
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">Portfolio Sentiment Analysis</span>
          <Badge variant="secondary" className="text-sm">
            {tickers.length} Stock{tickers.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-slate-700">
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('ticker')} className="font-semibold">
                  Ticker <ArrowUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('sentiment')} className="font-semibold">
                  Sentiment <ArrowUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Alerts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <>
                <TableRow 
                  key={item.ticker} 
                  className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                  onClick={() => setExpandedRow(expandedRow === item.ticker ? null : item.ticker)}
                >
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                      {expandedRow === item.ticker ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-slate-900 dark:text-white">
                    {item.ticker}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {item.company}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getSentimentIcon(item.sentimentLabel)}
                      <span className="font-semibold">
                        {item.sentiment >= 0 ? '+' : ''}{item.sentiment.toFixed(2)}
                      </span>
                      {getSentimentBadge(item.sentimentLabel)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold">${item.price.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${
                        item.change >= 0 ? 'text-[#00C49F]' : 'text-[#FF4C4C]'
                      }`}>
                        {item.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{item.lastUpdated}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={item.alerts}
                        onCheckedChange={() => onToggleAlert(item.ticker)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {item.alerts ? (
                        <Bell className="w-4 h-4 text-[#00C49F]" />
                      ) : (
                        <BellOff className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Expanded Row Content */}
                {expandedRow === item.ticker && (
                  <TableRow className="border-slate-200 dark:border-slate-700">
                    <TableCell colSpan={7} className="bg-slate-50 dark:bg-slate-800/50">
                      <div className="p-4 space-y-4">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Latest News & Analysis
                        </h4>
                        <div className="grid gap-3">
                          {item.news.map((news, index) => (
                            <div key={index} className="flex items-start justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                                  {news.headline}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{news.source}</span>
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{news.time}</span>
                                </div>
                              </div>
                              <div className="ml-3 flex-shrink-0">
                                {getSentimentBadge(news.sentiment)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
