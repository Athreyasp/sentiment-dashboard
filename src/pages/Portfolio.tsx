
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, TrendingUp, TrendingDown, Briefcase, Target, Shield, Zap } from 'lucide-react'

const portfolioData = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    avgPrice: 150.20,
    currentPrice: 161.20,
    sentiment: 75,
    change: 7.32,
    alerts: true
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    shares: 50,
    avgPrice: 330.45,
    currentPrice: 342.10,
    sentiment: 68,
    change: 3.53,
    alerts: false
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 25,
    avgPrice: 2650.30,
    currentPrice: 2680.75,
    sentiment: 72,
    change: 1.15,
    alerts: true
  }
]

export default function Portfolio() {
  const [holdings, setHoldings] = useState(portfolioData)

  const toggleAlert = (ticker: string) => {
    setHoldings(prev => 
      prev.map(holding => 
        holding.ticker === ticker 
          ? { ...holding, alerts: !holding.alerts }
          : holding
      )
    )
  }

  const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0)
  const totalGainLoss = holdings.reduce((sum, holding) => 
    sum + (holding.shares * (holding.currentPrice - holding.avgPrice)), 0
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-green-900/20 rounded-3xl p-8 border border-emerald-100 dark:border-slate-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-emerald-800 to-green-800 dark:from-white dark:via-emerald-200 dark:to-green-200 bg-clip-text text-transparent">
                  Portfolio Manager
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Track sentiment impact on your investments
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="h-12 px-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700">
                <Upload className="w-5 h-5 mr-2" />
                Import CSV
              </Button>
              <Button className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Stock
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-100 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Total Portfolio Value
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${totalValue.toLocaleString()}</div>
            <div className={`text-lg flex items-center ${totalGainLoss >= 0 ? 'text-positive' : 'text-negative'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="w-5 h-5 mr-2" /> : <TrendingDown className="w-5 h-5 mr-2" />}
              ${Math.abs(totalGainLoss).toLocaleString()} ({((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-100 dark:border-purple-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Average Sentiment
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">71.7</div>
            <div className="text-lg text-positive">Positive outlook</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-100 dark:border-orange-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Active Alerts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{holdings.filter(h => h.alerts).length}</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">of {holdings.length} holdings</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Holdings Table */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border-2 border-slate-100 dark:border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span>Your Holdings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.ticker} className="p-6 bg-gradient-to-r from-white/80 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border border-white/50 dark:border-slate-600/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{holding.ticker.slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{holding.ticker}</div>
                        <div className="text-slate-600 dark:text-slate-400">{holding.name}</div>
                      </div>
                    </div>
                    <Badge 
                      className={`px-4 py-2 text-sm font-medium ${holding.sentiment >= 70 
                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                        : holding.sentiment >= 50
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                          : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      }`}
                    >
                      Sentiment: {holding.sentiment}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="font-bold text-xl">${holding.currentPrice.toFixed(2)}</div>
                      <div className={`text-lg flex items-center ${holding.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {holding.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-slate-600 dark:text-slate-400">{holding.shares} shares</div>
                      <div className="font-bold text-lg">
                        ${(holding.shares * holding.currentPrice).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">Alerts</span>
                      <Switch
                        checked={holding.alerts}
                        onCheckedChange={() => toggleAlert(holding.ticker)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
