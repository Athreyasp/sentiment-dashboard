
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const portfolioData = [
  { ticker: 'AAPL', sentiment: 85, alerts: true, change: '+2.1%', price: '$175.43', logo: 'AA' },
  { ticker: 'GOOGL', sentiment: 78, alerts: true, change: '+1.8%', price: '$138.21', logo: 'GO' },
  { ticker: 'MSFT', sentiment: 82, alerts: false, change: '+0.9%', price: '$378.85', logo: 'MS' },
  { ticker: 'TSLA', sentiment: 65, alerts: true, change: '-1.2%', price: '$248.50', logo: 'TS' },
  { ticker: 'AMZN', sentiment: 72, alerts: false, change: '+1.5%', price: '$145.86', logo: 'AM' },
]

export function PortfolioPreview() {
  const totalValue = 87432.50
  const totalChange = '+2.3%'

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl text-white max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-white">
            Portfolio Preview
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {portfolioData.map((stock) => (
          <div
            key={stock.ticker}
            className="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">{stock.logo}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-white text-lg">{stock.ticker}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-1 rounded-full ${
                      stock.sentiment >= 70 ? 'border-green-500 text-green-400 bg-green-500/10' : 
                      stock.sentiment >= 50 ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' : 
                      'border-red-500 text-red-400 bg-red-500/10'
                    }`}
                  >
                    {stock.sentiment}
                  </Badge>
                </div>
                <div className="text-sm text-slate-400">{stock.price}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-1 font-semibold ${
                stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.change.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stock.change}</span>
              </div>
              
              <div className="flex flex-col items-center space-y-1">
                <Switch 
                  checked={stock.alerts} 
                  className="data-[state=checked]:bg-cyan-500"
                />
                <span className="text-xs text-slate-400">Alerts</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Total Portfolio Value */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl border border-blue-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">📊</span>
              </div>
              <span className="text-slate-300 font-medium">Total Portfolio Value:</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</span>
            <span className="text-green-400 font-semibold">{totalChange} today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
