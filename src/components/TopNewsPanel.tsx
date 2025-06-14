
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, ExternalLink } from 'lucide-react'

const newsData = [
  {
    title: 'Apple announces new AI features for iOS',
    sentiment: 'POS',
    impact: 'High',
    time: '2 hours ago',
    source: 'TechCrunch'
  },
  {
    title: 'Federal Reserve hints at rate cuts',
    sentiment: 'POS',
    impact: 'Medium',
    time: '4 hours ago',
    source: 'Bloomberg'
  },
  {
    title: 'Tesla production concerns emerge',
    sentiment: 'NEG',
    impact: 'Medium',
    time: '6 hours ago',
    source: 'Reuters'
  },
  {
    title: 'Microsoft cloud revenue beats expectations',
    sentiment: 'POS',
    impact: 'High',
    time: '8 hours ago',
    source: 'CNBC'
  },
  {
    title: 'Energy sector shows mixed signals',
    sentiment: 'NEUT',
    impact: 'Low',
    time: '10 hours ago',
    source: 'WSJ'
  },
]

export function TopNewsPanel() {
  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      POS: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      NEG: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      NEUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
    return variants[sentiment as keyof typeof variants]
  }

  return (
    <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-slate-800 dark:via-green-900/10 dark:to-emerald-900/20 border border-green-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
            📰 Top News
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {newsData.map((news, index) => (
              <div
                key={index}
                className="group p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`text-xs px-2 py-0.5 ${getSentimentBadge(news.sentiment)}`}>
                      {news.sentiment}
                    </Badge>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
