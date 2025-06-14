
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

  const getSentimentGradient = () => {
    switch (sentiment) {
      case 'positive':
        return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
      case 'negative':
        return 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
      default:
        return 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
    }
  }

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br border-2 relative overflow-hidden group",
      getSentimentGradient()
    )}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
      
      {/* Gradient accent */}
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 blur-2xl opacity-20 transition-opacity group-hover:opacity-30",
        sentiment === 'positive' && "bg-green-400",
        sentiment === 'negative' && "bg-red-400",
        sentiment === 'neutral' && "bg-yellow-400"
      )}></div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {title}
        </CardTitle>
        <div className={cn(
          "flex items-center space-x-1 p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm",
          getSentimentColor()
        )}>
          {getSentimentIcon()}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{value}</div>
        <div className={cn("text-sm flex items-center space-x-2", getSentimentColor())}>
          <span className="font-semibold">{change}</span>
          {subtitle && <span className="text-slate-500 dark:text-slate-400">• {subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
