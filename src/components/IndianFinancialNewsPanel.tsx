import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RefreshCw, Search, TrendingUp, Activity, Calendar, ExternalLink } from 'lucide-react'
import { useIndianFinancialNews } from '@/hooks/useIndianFinancialNews'
import { StockPredictionModal } from './StockPredictionModal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const IndianFinancialNewsPanel = () => {
  const { 
    news, 
    loading, 
    error, 
    fetchIndianFinancialNews, 
    searchNews 
  } = useIndianFinancialNews()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sentimentFilter, setSentimentFilter] = useState('all')
  const [tickerFilter, setTickerFilter] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedNews, setSelectedNews] = useState<{
    headline: string
    sentiment: string
    ticker: string | null
  } | null>(null)

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchIndianFinancialNews()
    setTimeout(() => setRefreshing(false), 1000)
  }

  const handleSearch = () => {
    searchNews(searchQuery, sentimentFilter === 'all' ? undefined : sentimentFilter, tickerFilter)
  }

  const getSentimentBadge = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">📈 Positive</Badge>
      case 'negative':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">📉 Negative</Badge>
      case 'neutral':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">➖ Neutral</Badge>
      default:
        return <Badge variant="outline">❓ Unknown</Badge>
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const publishedAt = new Date(timestamp)
    const diffMs = now.getTime() - publishedAt.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffHours > 24) {
      return `${Math.floor(diffHours / 24)}d ago`
    } else if (diffHours > 0) {
      return `${diffHours}h ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`
    }
    return 'Just now'
  }

  const handlePredictStock = (headline: string, sentiment: string | null, ticker: string | null) => {
    if (!ticker) {
      // Extract potential tickers from headline
      const possibleTickers = headline.match(/\b[A-Z]{2,}\b/g) || []
      setSelectedNews({
        headline,
        sentiment: sentiment || 'neutral',
        ticker: possibleTickers[0] || null
      })
    } else {
      setSelectedNews({
        headline,
        sentiment: sentiment || 'neutral',
        ticker
      })
    }
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Indian Financial News</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" />
              🇮🇳 Indian Financial News
              <Badge variant="outline" className="ml-2">
                {news.length} articles
              </Badge>
            </CardTitle>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="positive">📈 Positive</SelectItem>
                <SelectItem value="negative">📉 Negative</SelectItem>
                <SelectItem value="neutral">➖ Neutral</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by ticker..."
              value={tickerFilter}
              onChange={(e) => setTickerFilter(e.target.value)}
            />

            <Button onClick={handleSearch} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[600px]">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 border rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No Indian financial news found</p>
                <Button onClick={handleRefresh} variant="outline" className="mt-4">
                  Fetch Latest News
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-medium leading-tight text-sm">
                            {article.headline}
                          </h3>
                          {article.url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(article.url!, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        {article.content && (
                          <p className="text-muted-foreground text-xs line-clamp-2">
                            {article.content}
                          </p>
                        )}

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{article.source}</span>
                            <Calendar className="h-3 w-3" />
                            <span>{formatTime(article.published_at)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {getSentimentBadge(article.sentiment)}
                            {article.ticker && (
                              <Badge variant="outline" className="text-xs">
                                {article.ticker}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePredictStock(
                              article.headline,
                              article.sentiment,
                              article.ticker
                            )}
                          >
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Predict Impact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedNews && (
        <StockPredictionModal
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          newsHeadline={selectedNews.headline}
          sentiment={selectedNews.sentiment}
          potentialStocks={selectedNews.ticker ? [selectedNews.ticker] : []}
        />
      )}
    </>
  )
}