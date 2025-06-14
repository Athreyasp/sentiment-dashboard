
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

const newsData = [
  {
    id: 1,
    headline: "Federal Reserve hints at potential rate cuts amid inflation concerns",
    sentiment: "neutral",
    impact: "High",
    time: "2 minutes ago",
    source: "Reuters"
  },
  {
    id: 2,
    headline: "Tech stocks surge as AI adoption accelerates across industries",
    sentiment: "positive",
    impact: "Medium",
    time: "15 minutes ago",
    source: "Bloomberg"
  },
  {
    id: 3,
    headline: "Energy sector faces headwinds as oil prices decline",
    sentiment: "negative",
    impact: "Medium",
    time: "32 minutes ago",
    source: "CNBC"
  },
  {
    id: 4,
    headline: "Cryptocurrency market shows signs of recovery after recent volatility",
    sentiment: "positive",
    impact: "Low",
    time: "1 hour ago",
    source: "CoinDesk"
  }
]

const getSentimentBadge = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <Badge className="bg-positive/10 text-positive border-positive/20">Positive</Badge>
    case 'negative':
      return <Badge className="bg-negative/10 text-negative border-negative/20">Negative</Badge>
    default:
      return <Badge className="bg-neutral/10 text-neutral border-neutral/20">Neutral</Badge>
  }
}

export function NewsHighlights() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>News Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsData.map((news) => (
            <div key={news.id} className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                {getSentimentBadge(news.sentiment)}
                <Badge variant="outline" className="text-xs">
                  {news.impact} Impact
                </Badge>
              </div>
              <h4 className="text-sm font-medium leading-tight mb-2">
                {news.headline}
              </h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
