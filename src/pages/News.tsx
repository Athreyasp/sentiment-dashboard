
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
import { NewsFilter } from '@/components/NewsFilter'

export default function News() {
  const [sentimentFilter, setSentimentFilter] = useState<string>('All')
  const [tickerFilter, setTickerFilter] = useState<string>('All')
  const [regionFilter, setRegionFilter] = useState<string>('Indian') // Default to Indian news
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
          <Badge className="bg-pixel-green/15 text-pixel-green border-pixel-green/30 hover:bg-pixel-green/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-pixel-green rounded-full mr-2 animate-pixel-pulse"></div>
            BULLISH
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-red-400/15 text-red-400 border-red-400/30 hover:bg-red-400/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pixel-pulse"></div>
            BEARISH
          </Badge>
        )
      default:
        return (
          <Badge className="bg-pixel-orange/15 text-pixel-orange border-pixel-orange/30 hover:bg-pixel-orange/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-pixel-orange rounded-full mr-2 animate-pixel-pulse"></div>
            NEUTRAL
          </Badge>
        )
    }
  }

  // Helper function to determine if news is Indian
  const isIndianNews = (item: any) => {
    const indianKeywords = [
      'NSE', 'BSE', 'India', 'Indian', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
      'Reliance', 'TCS', 'Infosys', 'HDFC', 'ICICI', 'SBI', 'Wipro', 'HCL',
      'Tata', 'Adani', 'Bajaj', 'Axis', 'Kotak', 'Maruti', 'Mahindra',
      'rupee', 'INR', 'crore', 'lakh', 'SEBI', 'RBI', 'Modi', 'Nifty', 'Sensex'
    ]
    const content = `${item.headline} ${item.content || ''} ${item.source || ''}`.toLowerCase()
    return indianKeywords.some(keyword => content.includes(keyword.toLowerCase()))
  }

  const filteredNews = news.filter(item => {
    if (sentimentFilter !== 'All' && item.sentiment !== sentimentFilter.toLowerCase()) {
      return false
    }
    if (tickerFilter !== 'All' && item.ticker !== tickerFilter) {
      return false
    }
    if (regionFilter === 'Indian' && !isIndianNews(item)) {
      return false
    }
    if (regionFilter === 'Global' && isIndianNews(item)) {
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
      <div className="space-y-6 animate-fade-in">
        <Card className="pixel-card border-red-400/30 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-400/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2 font-pixel">ERROR LOADING NEWS</h3>
                <p className="text-red-300 font-space mb-3">{error}</p>
                <p className="text-sm text-red-400/80 mb-4 font-space">
                  Please check if your NEWS_API_KEY is properly configured in the project settings.
                </p>
                <Button onClick={handleRefresh} className="pixel-button" variant="default">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  TRY AGAIN
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Pixel-styled Header */}
      <div className="pixel-card rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg pixel-glow">
              <Newspaper className="w-6 h-6 text-pixel-green" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-pixel gradient-text">
                INDIAN FINANCIAL NEWS FEED
              </h1>
              <p className="text-muted-foreground font-space">
                Real-time NSE & BSE market insights with AI sentiment analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className={`${autoRefresh ? 'text-pixel-green border-pixel-green bg-pixel-green/10 hover:bg-pixel-green/20' : 'text-muted-foreground hover:bg-secondary'} transition-all duration-200 font-pixel`}
            >
              {autoRefresh ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
              {autoRefresh ? 'LIVE (60s)' : 'MANUAL'}
            </Button>
            
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="pixel-button"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              REFRESH
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pixel-green rounded-full animate-pixel-pulse"></div>
              <span className="text-sm text-pixel-green font-pixel">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company News Search */}
      <div className="pixel-card rounded-lg p-4 border">
        <CompanyNewsSearch 
          onSearch={setSearchQuery}
          currentSearch={searchQuery}
        />
      </div>

      {/* News Filter */}
      <div className="pixel-card rounded-lg p-4 border">
        <NewsFilter
          sentimentFilter={sentimentFilter}
          tickerFilter={tickerFilter}
          regionFilter={regionFilter}
          onSentimentChange={setSentimentFilter}
          onTickerChange={setTickerFilter}
          onRegionChange={setRegionFilter}
          availableTickers={availableTickers}
          totalArticles={news.length}
          filteredArticles={filteredNews.length}
        />
      </div>

      {/* Enhanced News Feed */}
      {loading ? (
        <Card className="pixel-card shadow-xl">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="p-4 bg-pixel-green/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center animate-pixel-glow">
                <RefreshCw className="w-8 h-8 animate-spin text-pixel-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground font-pixel">LOADING FINANCIAL NEWS</h3>
                <p className="text-muted-foreground font-space">Fetching the latest market insights...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="pixel-card rounded-lg border">
          <ScrollArea className="h-[calc(100vh-400px)] p-6">
            <div className="space-y-4">
              {filteredNews.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="p-4 bg-pixel-orange/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-pixel-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground font-pixel mb-2">NO NEWS FOUND</h3>
                    <p className="text-muted-foreground font-space mb-4">
                      {searchQuery ? `No news found for "${searchQuery}". Try searching for Indian companies like Reliance, TCS, HDFC, or Infosys.` : 'No financial news available. Try fetching the latest news.'}
                    </p>
                    <Button onClick={handleRefresh} className="pixel-button" variant="default">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      FETCH LATEST NEWS
                    </Button>
                  </div>
                </div>
              ) : (
                filteredNews.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="news-card p-6 rounded-lg hover:pixel-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg animate-slide-in-pixel border"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => item.url && window.open(item.url, '_blank')}
                  >
                    <div className="space-y-4">
                      {/* Header with sentiment and ticker */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-bold text-foreground hover:text-pixel-green transition-colors leading-tight font-space">
                            {item.headline}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          {item.ticker && (
                            <Badge variant="outline" className="font-pixel text-xs bg-secondary text-muted-foreground border-pixel-cyan/30 px-2 py-1">
                              {item.ticker}
                            </Badge>
                          )}
                          {getSentimentBadge(item.sentiment)}
                        </div>
                      </div>

                      {/* Content */}
                      {item.content && (
                        <p className="text-sm text-muted-foreground leading-relaxed font-space">
                          {item.content.substring(0, 200)}
                          {item.content.length > 200 && '...'}
                        </p>
                      )}

                      {/* Enhanced Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-pixel-green/20">
                        <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-pixel-cyan rounded-full animate-pixel-pulse"></div>
                            <span className="font-pixel">{item.source}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span className="font-pixel">{formatTime(item.published_at)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="pixel-button text-xs h-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('Opening stock prediction for:', item.headline)
                            }}
                          >
                            PREDICT STOCKS
                          </Button>
                          {item.url && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 font-pixel text-xs hover:bg-pixel-green/10 hover:text-pixel-green"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              READ MORE
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
