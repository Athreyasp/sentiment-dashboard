
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Filter, ChevronDown, Clock, ExternalLink } from 'lucide-react'
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
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Apple announces breakthrough in AI chip technology, stock surges in after-hours trading',
    sentiment: 'positive',
    source: 'Bloomberg',
    time: '2 hours ago',
    ticker: 'AAPL',
    excerpt: 'Revolutionary M4 chip shows 40% performance improvement in AI workloads'
  },
  {
    id: '2',
    headline: 'Federal Reserve signals potential rate cuts amid cooling inflation data',
    sentiment: 'positive',
    source: 'Reuters',
    time: '3 hours ago',
    excerpt: 'Market sentiment improves as Fed chair hints at monetary policy shift'
  },
  {
    id: '3',
    headline: 'Tesla faces production challenges at Shanghai Gigafactory, deliveries may be impacted',
    sentiment: 'negative',
    source: 'CNBC',
    time: '4 hours ago',
    ticker: 'TSLA',
    excerpt: 'Supply chain disruptions could affect Q4 delivery targets'
  },
  {
    id: '4',
    headline: 'Microsoft cloud revenue beats expectations, Azure growth remains strong',
    sentiment: 'positive',
    source: 'Wall Street Journal',
    time: '5 hours ago',
    ticker: 'MSFT',
    excerpt: 'Cloud computing segment drives 25% year-over-year growth'
  },
  {
    id: '5',
    headline: 'Oil prices remain stable despite geopolitical tensions in Middle East',
    sentiment: 'neutral',
    source: 'MarketWatch',
    time: '6 hours ago',
    excerpt: 'Crude oil trading within expected range as markets assess risk factors'
  },
  {
    id: '6',
    headline: 'Netflix subscriber growth slows as streaming competition intensifies',
    sentiment: 'negative',
    source: 'TechCrunch',
    time: '8 hours ago',
    ticker: 'NFLX',
    excerpt: 'Quarterly report shows first decline in subscriber additions in two years'
  },
  {
    id: '7',
    headline: 'Gold reaches new highs as investors seek safe haven assets',
    sentiment: 'positive',
    source: 'Financial Times',
    time: '10 hours ago',
    excerpt: 'Precious metals rally continues amid market uncertainty'
  },
  {
    id: '8',
    headline: 'Cryptocurrency market shows mixed signals following regulatory updates',
    sentiment: 'neutral',
    source: 'CoinDesk',
    time: '12 hours ago',
    excerpt: 'Bitcoin and Ethereum trade sideways as investors digest new SEC guidelines'
  }
]

export default function News() {
  const [sentimentFilter, setSentimentFilter] = useState<string>('All')
  const [tickerFilter, setTickerFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<string>('All')

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

  const filteredNews = mockNewsData.filter(item => {
    if (sentimentFilter !== 'All' && item.sentiment !== sentimentFilter.toLowerCase()) {
      return false
    }
    if (tickerFilter !== 'All' && item.ticker !== tickerFilter) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-inter tracking-tight">
          🤖 AI-Powered News Feed
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Latest headlines with sentiment analysis powered by FinBERT
        </p>
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

            {/* Date Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-medium">
                  📅 Date: {dateFilter}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="animate-scale-in">
                <DropdownMenuItem onClick={() => setDateFilter('All')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateFilter('Today')}>Today</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateFilter('7d')}>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateFilter('30d')}>Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1"></div>
            
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {filteredNews.length} articles
            </span>
          </div>
        </CardContent>
      </Card>

      {/* News Feed */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4 pr-4">
          {filteredNews.map((item, index) => (
            <Card 
              key={item.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header with sentiment and ticker */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00C49F] transition-colors leading-tight pr-4">
                        {item.headline}
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
                        <span>{item.time}</span>
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
