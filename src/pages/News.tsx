
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Filter, ChevronDown, Clock, ExternalLink, RefreshCw, Wifi, WifiOff, Search, AlertCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useFinancialNews } from '@/hooks/useFinancialNews'
import { CompanyNewsSearch } from '@/components/CompanyNewsSearch'

export default function News() {
  const [sentimentFilter, setSentimentFilter] = useState<string>('All')
  const [tickerFilter, setTickerFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLive, setIsLive] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  
  const { news, loading, error, fetchNews, searchNews } = useFinancialNews()

  // Auto-refresh every 60 seconds as specified
  useEffect(() => {
    if (autoRefresh && isLive) {
      const interval = setInterval(() => {
        fetchNews()
      }, 60000) // 60 seconds

      return () => clearInterval(interval)
    }
  }, [autoRefresh, isLive, fetchNews])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchNews(searchQuery)
      } else {
        searchNews('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchNews()
    setIsRefreshing(false)
  }

  const getSentimentBadge = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return (
          <Badge className="bg-[#00C49F]/10 text-[#00C49F] border-[#00C49F]/20 hover:bg-[#00C49F]/20 transition-colors font-inter">
            🟢 Positive
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/20 hover:bg-[#FF4C4C]/20 transition-colors font-inter">
            🔴 Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FFCB05]/10 text-[#FFCB05] border-[#FFCB05]/20 hover:bg-[#FFCB05]/20 transition-colors font-inter">
            🟡 Neutral
          </Badge>
        )
    }
  }

  const filteredNews = news.filter(item => {
    if (sentimentFilter !== 'All' && item.sentiment !== sentimentFilter.toLowerCase()) {
      return false
    }
    if (tickerFilter !== 'All' && item.ticker !== tickerFilter) {
      return false
    }
    return true
  })

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const newsTime = new Date(timestamp)
    const diff = now.getTime() - newsTime.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  // Get unique tickers for filter
  const availableTickers = [...new Set(news.map(item => item.ticker).filter(Boolean))]

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in font-inter">
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2 font-inter">Error Loading News</h3>
                <p className="text-red-600 dark:text-red-300 font-inter">{error}</p>
                <p className="text-sm text-red-500 dark:text-red-400 mt-2 font-inter">
                  Please check if your NEWS_API_KEY is properly configured in the project settings.
                </p>
                <Button onClick={handleRefresh} className="mt-4 font-inter" variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-inter tracking-tight">
              📰 Real-time Financial News Feed
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium font-inter">
              Live financial news powered by NewsAPI with sentiment analysis and ticker detection
            </p>
          </div>
          
          {/* Live Status and Controls */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className={`${autoRefresh ? 'text-green-600 border-green-500/20 bg-green-50/50' : 'text-gray-500'} transition-colors font-inter`}
            >
              {autoRefresh ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />}
              {autoRefresh ? 'Auto-refresh (60s)' : 'Manual'}
            </Button>
            
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="transition-all duration-200 font-inter"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              🔄 Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Company News Search */}
      <CompanyNewsSearch 
        onSearch={setSearchQuery}
        currentSearch={searchQuery}
      />

      {/* Filter Bar */}
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 font-inter">Filters:</span>
            </div>
            
            {/* Sentiment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-medium font-inter">
                  🧠 Sentiment: {sentimentFilter}
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
                <Button variant="outline" size="sm" className="font-medium font-inter">
                  📈 Ticker: {tickerFilter}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="animate-scale-in">
                <DropdownMenuItem onClick={() => setTickerFilter('All')}>All</DropdownMenuItem>
                {availableTickers.slice(0, 15).map(ticker => (
                  <DropdownMenuItem key={ticker} onClick={() => setTickerFilter(ticker)}>
                    {ticker}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1"></div>
            
            <span className="text-xs text-slate-500 dark:text-slate-400 font-inter">
              {filteredNews.length} articles
            </span>
          </div>
        </CardContent>
      </Card>

      {/* News Feed */}
      {loading ? (
        <Card className="rounded-lg shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              <p className="font-inter">Loading financial news...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-4 pr-4">
            {filteredNews.length === 0 ? (
              <Card className="rounded-lg shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="text-slate-600 dark:text-slate-400 font-inter">
                    {searchQuery ? `No news found for "${searchQuery}". Try searching for other companies like Apple, Tesla, Microsoft, or Renesas.` : 'No financial news available. Try fetching the latest news.'}
                  </p>
                  <Button onClick={handleRefresh} className="mt-4 font-inter" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Fetch News
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNews.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer animate-fade-in rounded-lg shadow-md p-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {/* Header with sentiment and ticker */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00C49F] transition-colors leading-tight pr-4 font-inter">
                            📰 {item.headline}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {item.ticker && (
                            <Badge variant="outline" className="font-mono text-xs bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-inter">
                              📈 {item.ticker}
                            </Badge>
                          )}
                          {getSentimentBadge(item.sentiment)}
                        </div>
                      </div>

                      {/* Content */}
                      {item.content && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                          {item.content.substring(0, 200)}
                          {item.content.length > 200 && '...'}
                        </p>
                      )}

                      {/* Footer with source and time */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium font-inter">🗞️ {item.source}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-inter">🕒 {formatTime(item.published_at)}</span>
                          </div>
                        </div>
                        {item.url && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity font-inter"
                            onClick={() => window.open(item.url!, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            <span className="text-xs">Read more</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
