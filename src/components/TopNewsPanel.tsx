
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, ExternalLink } from 'lucide-react'
import { useIndianFinancialNews } from '@/hooks/useIndianFinancialNews'

export function TopNewsPanel() {
  const { news, loading } = useIndianFinancialNews()

  // Get top 5 most recent news items
  const topNews = news.slice(0, 5)

  const getSentimentBadge = (sentiment: string | null) => {
    const variants = {
      positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
    return variants[sentiment as keyof typeof variants] || variants.neutral
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const newsTime = new Date(timestamp)
    const diff = now.getTime() - newsTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-slate-800 dark:via-green-900/10 dark:to-emerald-900/20 border border-green-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
            📈 Indian Market News
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-600 dark:text-slate-400">Loading news...</p>
              </div>
            ) : topNews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-600 dark:text-slate-400">No news available</p>
              </div>
            ) : (
              topNews.map((news, index) => (
                <div
                  key={news.id}
                  className="group p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                  onClick={() => news.url && window.open(news.url, '_blank')}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {news.headline}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{formatTime(news.published_at)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={`text-xs px-2 py-0.5 ${getSentimentBadge(news.sentiment)}`}>
                        {news.sentiment?.toUpperCase() || 'NEUT'}
                      </Badge>
                      {news.url && (
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
