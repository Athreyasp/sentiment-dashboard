
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SentimentCardProps {
  title: string
  value: string
  change: string
  sentiment: 'positive' | 'negative' | 'neutral'
  subtitle?: string
}

export function SentimentCard({ title, value, change, sentiment, subtitle }: SentimentCardProps) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'text-positive'
      case 'negative':
        return 'text-negative'
      default:
        return 'text-neutral'
    }
  }

  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4" />
      case 'negative':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("flex items-center space-x-1", getSentimentColor())}>
          {getSentimentIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={cn("text-xs flex items-center space-x-1", getSentimentColor())}>
          <span>{change}</span>
          {subtitle && <span className="text-muted-foreground">• {subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
