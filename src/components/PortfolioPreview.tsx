
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const portfolioData = [
  { ticker: 'AAPL', sentiment: 85, alerts: true, change: '+2.1%', price: '$175.43' },
  { ticker: 'GOOGL', sentiment: 78, alerts: true, change: '+1.8%', price: '$138.21' },
  { ticker: 'MSFT', sentiment: 82, alerts: false, change: '+0.9%', price: '$378.85' },
  { ticker: 'TSLA', sentiment: 65, alerts: true, change: '-1.2%', price: '$248.50' },
  { ticker: 'AMZN', sentiment: 72, alerts: false, change: '+1.5%', price: '$145.86' },
]

export function PortfolioPreview() {
  return (
    <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/50 dark:from-slate-800 dark:via-purple-900/10 dark:to-pink-900/20 border border-purple-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
            💼 Portfolio Preview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {portfolioData.map((stock) => (
            <div
              key={stock.ticker}
              className="flex items-center justify-between p-3 bg-white/70 dark:bg-slate-700/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{stock.ticker.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800 dark:text-white">{stock.ticker}</span>
                    <Badge variant="outline" className={`text-xs ${
                      stock.sentiment >= 70 ? 'border-green-500 text-green-700' : 
                      stock.sentiment >= 50 ? 'border-yellow-500 text-yellow-700' : 
                      'border-red-500 text-red-700'
                    }`}>
                      {stock.sentiment}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stock.price}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`font-semibold flex items-center space-x-1 ${
                    stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change.startsWith('+') ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{stock.change}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-1">
                  <Switch checked={stock.alerts} />
                  <span className="text-xs text-muted-foreground">Alerts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-center text-blue-700 dark:text-blue-300">
            📊 Total Portfolio Value: <span className="font-bold">$87,432.50</span>
            <span className="ml-2 text-green-600">+2.3% today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
