
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const sectorData = [
  { name: 'Technology', sentiment: 85, change: '+2.4%', impact: 'high' },
  { name: 'Finance', sentiment: 72, change: '+1.8%', impact: 'medium' },
  { name: 'Healthcare', sentiment: 68, change: '-0.5%', impact: 'medium' },
  { name: 'Energy', sentiment: 45, change: '-3.2%', impact: 'high' },
  { name: 'Retail', sentiment: 58, change: '+0.8%', impact: 'low' },
  { name: 'Automotive', sentiment: 62, change: '+1.2%', impact: 'medium' },
  { name: 'Real Estate', sentiment: 55, change: '-1.1%', impact: 'low' },
  { name: 'Utilities', sentiment: 70, change: '+0.3%', impact: 'low' },
]

export function HeatmapView() {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'bg-green-500'
    if (sentiment >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
    return variants[impact as keyof typeof variants]
  }

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-800 dark:via-blue-900/10 dark:to-indigo-900/20 border border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
            🗺️ Sector Heatmap
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className="group relative p-4 rounded-xl border-2 border-white/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getSentimentColor(sector.sentiment)}`}></div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-white">{sector.name}</h3>
                <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">{sector.sentiment}</div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${
                    sector.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {sector.change}
                  </span>
                  <Badge className={`text-xs px-2 py-0.5 ${getImpactBadge(sector.impact)}`}>
                    {sector.impact}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Positive (70+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Neutral (50-69)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Negative (&lt;50)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
