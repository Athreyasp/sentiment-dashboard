
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Filter, ChevronDown, Clock, ExternalLink, RefreshCw, Wifi, WifiOff, Search, AlertCircle, TrendingUp, Newspaper } from 'lucide-react'
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

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (autoRefresh && isLive) {
      const interval = setInterval(() => {
        fetchNews()
      }, 60000)

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
          <Badge className="bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30 hover:bg-[#00C49F]/25 transition-all duration-200 font-medium px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-[#00C49F] rounded-full mr-2"></div>
            Positive
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30 hover:bg-[#FF4C4C]/25 transition-all duration-200 font-medium px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-[#FF4C4C] rounded-full mr-2"></div>
            Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FFCB05]/15 text-[#FFCB05] border-[#FFCB05]/30 hover:bg-[#FFCB05]/25 transition-all duration-200 font-medium px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-[#FFCB05] rounded-full mr-2"></div>
            Neutral
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2 font-inter">Error Loading News</h3>
                  <p className="text-red-600 dark:text-red-300 font-inter mb-3">{error}</p>
                  <p className="text-sm text-red-500 dark:text-red-400 mb-4 font-inter">
                    Please check if your NEWS_API_KEY is properly configured in the project settings.
                  </p>
                  <Button onClick={handleRefresh} className="bg-red-600 hover:bg-red-700 text-white font-inter" variant="default">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent font-inter">
                Financial News Feed
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium font-inter mt-1">
                Real-time market insights powered by AI sentiment analysis
              </p>
            </div>
          </div>
          
          {/* Live Status and Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className={`${autoRefresh ? 'text-green-600 border-green-300 bg-green-50 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-50'} transition-all duration-200 font-inter shadow-sm`}
            >
              {autoRefresh ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
              {autoRefresh ? 'Live (60s)' : 'Manual'}
            </Button>
            
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="transition-all duration-200 font-inter shadow-sm hover:shadow-md"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">{filteredNews.length} articles</span>
            </div>
          </div>
        </div>

        {/* Company News Search */}
        <CompanyNewsSearch 
          onSearch={setSearchQuery}
          currentSearch={searchQuery}
        />

        {/* Enhanced Filter Bar */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-inter">Filters</span>
              </div>
              
              {/* Sentiment Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="font-medium font-inter shadow-sm hover:shadow-md transition-all duration-200">
                    Sentiment: {sentimentFilter}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700">
                  <DropdownMenuItem onClick={() => setSentimentFilter('All')}>All Sentiments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSentimentFilter('Positive')}>🟢 Positive</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSentimentFilter('Neutral')}>🟡 Neutral</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSentimentFilter('Negative')}>🔴 Negative</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Ticker Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="font-medium font-inter shadow-sm hover:shadow-md transition-all duration-200">
                    Ticker: {tickerFilter}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700">
                  <DropdownMenuItem onClick={() => setTickerFilter('All')}>All Tickers</DropdownMenuItem>
                  {availableTickers.slice(0, 15).map(ticker => (
                    <DropdownMenuItem key={ticker} onClick={() => setTickerFilter(ticker)}>
                      📈 {ticker}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced News Feed */}
        {loading ? (
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-inter">Loading Financial News</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-inter">Fetching the latest market insights...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-500px)]">
            <div className="space-y-6 pr-4">
              {filteredNews.length === 0 ? (
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
                  <CardContent className="p-12 text-center space-y-4">
                    <div className="p-4 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Newspaper className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-inter mb-2">No News Found</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-inter mb-4">
                        {searchQuery ? `No news found for "${searchQuery}". Try searching for other companies like Apple, Tesla, Microsoft, or Renesas.` : 'No financial news available. Try fetching the latest news.'}
                      </p>
                      <Button onClick={handleRefresh} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-inter shadow-lg" variant="default">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Fetch Latest News
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredNews.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => item.url && window.open(item.url, '_blank')}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header with sentiment and ticker */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight font-inter">
                              {item.headline}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            {item.ticker && (
                              <Badge variant="outline" className="font-mono text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 px-2 py-1">
                                {item.ticker}
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

                        {/* Enhanced Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="font-medium font-inter">{item.source}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3 h-3" />
                              <span className="font-inter">{formatTime(item.published_at)}</span>
                            </div>
                          </div>
                          {item.url && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 font-inter text-xs hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Read More
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
    </div>
  )
}
