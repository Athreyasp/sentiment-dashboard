
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Filter, ChevronDown, Clock, ExternalLink, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NewsItem {
  id: string
  headline: string
  sentiment: 'positive' | 'neutral' | 'negative'
  source: string
  time: string
  ticker?: string
  excerpt?: string
  url?: string
  timestamp: number
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Apple announces breakthrough in AI chip technology, stock surges in after-hours trading',
    sentiment: 'positive',
    source: 'Bloomberg',
    time: '2 hours ago',
    ticker: 'AAPL',
    excerpt: 'Revolutionary M4 chip shows 40% performance improvement in AI workloads',
    timestamp: Date.now() - 2 * 60 * 60 * 1000
  },
  {
    id: '2',
    headline: 'Federal Reserve signals potential rate cuts amid cooling inflation data',
    sentiment: 'positive',
    source: 'Reuters',
    time: '3 hours ago',
    excerpt: 'Market sentiment improves as Fed chair hints at monetary policy shift',
    timestamp: Date.now() - 3 * 60 * 60 * 1000
  },
  {
    id: '3',
    headline: 'Tesla faces production challenges at Shanghai Gigafactory, deliveries may be impacted',
    sentiment: 'negative',
    source: 'CNBC',
    time: '4 hours ago',
    ticker: 'TSLA',
    excerpt: 'Supply chain disruptions could affect Q4 delivery targets',
    timestamp: Date.now() - 4 * 60 * 60 * 1000
  },
  {
    id: '4',
    headline: 'Microsoft cloud revenue beats expectations, Azure growth remains strong',
    sentiment: 'positive',
    source: 'Wall Street Journal',
    time: '5 hours ago',
    ticker: 'MSFT',
    excerpt: 'Cloud computing segment drives 25% year-over-year growth',
    timestamp: Date.now() - 5 * 60 * 60 * 1000
  },
  {
    id: '5',
    headline: 'Oil prices remain stable despite geopolitical tensions in Middle East',
    sentiment: 'neutral',
    source: 'MarketWatch',
    time: '6 hours ago',
    excerpt: 'Crude oil trading within expected range as markets assess risk factors',
    timestamp: Date.now() - 6 * 60 * 60 * 1000
  },
  {
    id: '6',
    headline: 'Netflix subscriber growth slows as streaming competition intensifies',
    sentiment: 'negative',
    source: 'TechCrunch',
    time: '8 hours ago',
    ticker: 'NFLX',
    excerpt: 'Quarterly report shows first decline in subscriber additions in two years',
    timestamp: Date.now() - 8 * 60 * 60 * 1000
  },
  {
    id: '7',
    headline: 'Gold reaches new highs as investors seek safe haven assets',
    sentiment: 'positive',
    source: 'Financial Times',
    time: '10 hours ago',
    excerpt: 'Precious metals rally continues amid market uncertainty',
    timestamp: Date.now() - 10 * 60 * 60 * 1000
  },
  {
    id: '8',
    headline: 'Cryptocurrency market shows mixed signals following regulatory updates',
    sentiment: 'neutral',
    source: 'CoinDesk',
    time: '12 hours ago',
    excerpt: 'Bitcoin and Ethereum trade sideways as investors digest new SEC guidelines',
    timestamp: Date.now() - 12 * 60 * 60 * 1000
  }
]

export default function News() {
  const [sentimentFilter, setSentimentFilter] = useState<string>('All')
  const [tickerFilter, setTickerFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<string>('All')
  const [newsData, setNewsData] = useState<NewsItem[]>(mockNewsData)
  const [isLive, setIsLive] = useState(true)
  const [hasNewUpdates, setHasNewUpdates] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now())

  // Simulate real-time news updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate getting new news
      const shouldAddNews = Math.random() > 0.7 // 30% chance of new news
      
      if (shouldAddNews) {
        const newHeadlines = [
          'Breaking: Major tech company announces quarterly earnings beat',
          'Market Update: S&P 500 reaches new all-time high',
          'Economic Data: Unemployment rate drops to historic low',
          'Corporate News: Merger talks between industry giants confirmed',
          'Tech Alert: New cybersecurity threat impacts financial sector'
        ]
        
        const newNews: NewsItem = {
          id: Date.now().toString(),
          headline: newHeadlines[Math.floor(Math.random() * newHeadlines.length)],
          sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative',
          source: ['Reuters', 'Bloomberg', 'CNBC', 'WSJ', 'Financial Times'][Math.floor(Math.random() * 5)],
          time: 'Just now',
          ticker: ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN'][Math.floor(Math.random() * 5)],
          excerpt: 'Breaking news update with immediate market implications',
          timestamp: Date.now()
        }
        
        setNewsData(prev => [newNews, ...prev])
        setHasNewUpdates(true)
        setLastUpdateTime(Date.now())
        
        console.log('New financial news update:', newNews.headline)
      }
    }, 60000) // Check for updates every 60 seconds

    return () => clearInterval(interval)
  }, [isLive])

  // Auto-refresh timer
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (isLive) {
        setLastUpdateTime(Date.now())
      }
    }, 30000) // Update timestamp every 30 seconds

    return () => clearInterval(refreshInterval)
  }, [isLive])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setHasNewUpdates(false)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsRefreshing(false)
    setLastUpdateTime(Date.now())
    console.log('News feed refreshed')
  }

  const toggleLiveMode = () => {
    setIsLive(!isLive)
    if (!isLive) {
      setLastUpdateTime(Date.now())
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return (
          <Badge className="bg-[#00C49F]/10 text-[#00C49F] border-[#00C49F]/20 hover:bg-[#00C49F]/20 transition-colors">
            🟢 Positive
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/20 hover:bg-[#FF4C4C]/20 transition-colors">
            🔴 Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FFCB05]/10 text-[#FFCB05] border-[#FFCB05]/20 hover:bg-[#FFCB05]/20 transition-colors">
            🟡 Neutral
          </Badge>
        )
    }
  }

  const filteredNews = newsData.filter(item => {
    if (sentimentFilter !== 'All' && item.sentiment !== sentimentFilter.toLowerCase()) {
      return false
    }
    if (tickerFilter !== 'All' && item.ticker !== tickerFilter) {
      return false
    }
    return true
  })

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-inter tracking-tight">
              📰 Live News Feed
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Updated every few minutes using real-time financial sources
            </p>
          </div>
          
          {/* Live Status and Controls */}
          <div className="flex items-center space-x-3">
            {hasNewUpdates && (
              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse">
                🔄 New headlines available
              </Badge>
            )}
            
            <Button
              onClick={toggleLiveMode}
              variant="outline"
              size="sm"
              className={`${isLive ? 'text-green-600 border-green-500/20 bg-green-50/50' : 'text-gray-500'} transition-colors`}
            >
              {isLive ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />}
              {isLive ? 'Live' : 'Offline'}
            </Button>
            
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Last Update Indicator */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span>Last updated: {formatTime(lastUpdateTime)}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters:</span>
            </div>
            
            {/* Sentiment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-medium">
                  🏷 Sentiment: {sentimentFilter}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="animate-scale-in">
                <DropdownMenuItem onClick={() => setSentimentFilter('All')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentimentFilter('Positive')}>🟢 Positive</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentimentFilter('Neutral')}>🟡 Neutral</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentimentFilter('Negative')}>🔴 Negative</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Ticker Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-medium">
                  🔎 Ticker: {tickerFilter}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="animate-scale-in">
                <DropdownMenuItem onClick={() => setTickerFilter('All')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTickerFilter('AAPL')}>AAPL</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTickerFilter('TSLA')}>TSLA</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTickerFilter('MSFT')}>MSFT</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTickerFilter('NFLX')}>NFLX</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1"></div>
            
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {filteredNews.length} articles
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Real-time News Feed */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4 pr-4">
          {filteredNews.map((item, index) => (
            <Card 
              key={item.id} 
              className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer animate-fade-in ${item.time === 'Just now' ? 'ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header with sentiment and ticker */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00C49F] transition-colors leading-tight pr-4">
                        {item.headline}
                        {item.time === 'Just now' && (
                          <Badge className="ml-2 bg-blue-500/10 text-blue-600 text-xs animate-pulse">
                            NEW
                          </Badge>
                        )}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {item.ticker && (
                        <Badge variant="outline" className="font-mono text-xs bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          📈 {item.ticker}
                        </Badge>
                      )}
                      {getSentimentBadge(item.sentiment)}
                    </div>
                  </div>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Footer with source and time */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">🗞️ {item.source}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(item.timestamp)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      <span className="text-xs">Read more</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
