import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Activity, Zap, Clock } from 'lucide-react'
import { useEnhancedNews } from '@/hooks/useEnhancedNews'

export function LiveMarketIndicator() {
  const { marketSummary, news, loading, generatedAt } = useEnhancedNews()
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simulate live indicator
    const interval = setInterval(() => {
      setIsLive(prev => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (loading || !marketSummary) {
    return (
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="animate-pulse">
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Loading Market Data...</p>
              <p className="text-xs text-muted-foreground">Fetching live insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getSentimentIcon = () => {
    switch (marketSummary.overall_sentiment) {
      case 'BULLISH':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'BEARISH':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-blue-600" />
    }
  }

  const getSentimentColor = () => {
    switch (marketSummary.overall_sentiment) {
      case 'BULLISH':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'BEARISH':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  return (
    <Card className="border border-border hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-green-400'}`} />
              <span className="text-xs text-muted-foreground font-medium">LIVE</span>
            </div>
            
            <div className="flex items-center gap-2">
              {getSentimentIcon()}
              <div>
                <p className="text-sm font-semibold">
                  Market: {marketSummary.overall_sentiment}
                </p>
                <p className="text-xs text-muted-foreground">
                  {news.length} active signals
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getSentimentColor()}>
              Nifty {marketSummary.nifty_prediction}
            </Badge>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {marketSummary.confidence}%
              </span>
            </div>
          </div>
        </div>

        {marketSummary.key_themes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex flex-wrap gap-1">
              {marketSummary.key_themes.slice(0, 3).map((theme, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {generatedAt && (
          <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Updated {new Date(generatedAt).toLocaleTimeString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}