import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { IndianFinancialNewsItem } from '@/hooks/useIndianFinancialNews'

interface NewsTickerSummaryProps {
  news: IndianFinancialNewsItem[]
  loading: boolean
}

export const NewsTickerSummary = ({ news, loading }: NewsTickerSummaryProps) => {
  // Get latest 3 news items
  const latestNews = news.slice(0, 3)

  const getSentimentIcon = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-yellow-600" />
    }
  }

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      case 'negative':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      default:
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const publishedAt = new Date(timestamp)
    const diffMs = now.getTime() - publishedAt.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`
    }
    return `${Math.floor(diffMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="h-3 bg-muted rounded w-64"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!latestNews.length) {
    return (
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 border-slate-200 dark:border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">No recent Indian financial news</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            🇮🇳 Latest Market News
          </h3>
          <Badge variant="outline" className="text-xs">
            {news.length} total
          </Badge>
        </div>

        <div className="space-y-3">
          {latestNews.map((article, index) => (
            <div key={article.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getSentimentIcon(article.sentiment)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
                  {article.headline}
                </p>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {article.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(article.published_at)}
                  </span>
                  {article.ticker && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-0 ${getSentimentColor(article.sentiment)}`}
                    >
                      {article.ticker}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length > 3 && (
          <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800">
            <p className="text-xs text-center text-muted-foreground">
              +{news.length - 3} more articles below
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}