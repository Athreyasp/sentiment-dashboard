
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, TrendingUp, TrendingDown, Briefcase, Target, Shield, Zap, Eye, BarChart3, Wallet, Activity } from 'lucide-react'

const portfolioData = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    avgPrice: 150.20,
    currentPrice: 161.20,
    sentiment: 75,
    change: 7.32,
    alerts: true,
    logo: '🍎'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    shares: 50,
    avgPrice: 330.45,
    currentPrice: 342.10,
    sentiment: 68,
    change: 3.53,
    alerts: false,
    logo: '🖥️'
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 25,
    avgPrice: 2650.30,
    currentPrice: 2680.75,
    sentiment: 72,
    change: 1.15,
    alerts: true,
    logo: '🔍'
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    shares: 75,
    avgPrice: 245.80,
    currentPrice: 267.50,
    sentiment: 82,
    change: 8.83,
    alerts: true,
    logo: '⚡'
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
  const totalGainLossPercent = ((totalGainLoss / (totalValue - totalGainLoss)) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Hero Header with stunning design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Wallet className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">
                    Portfolio Overview
                  </h1>
                  <p className="text-xl text-white/90">
                    Your investment journey at a glance
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Live Updates Active</span>
                    </div>
                    <div className="w-px h-4 bg-white/30"></div>
                    <span className="text-sm">{holdings.length} Holdings</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="secondary" className="h-12 px-6 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Upload className="w-5 h-5 mr-2" />
                  Import
                </Button>
                <Button className="h-12 px-6 bg-white text-indigo-600 hover:bg-white/90 font-semibold">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Stock
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Stats - Modern Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/10 border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Total Value</p>
                  <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">${totalValue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-emerald-500 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Total P&L</p>
                  <div className="flex items-center space-x-2">
                    <p className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
                    </p>
                    {totalGainLoss >= 0 ? <TrendingUp className="w-6 h-6 text-green-500" /> : <TrendingDown className="w-6 h-6 text-red-500" />}
                  </div>
                  <p className={`text-sm ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-2xl">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Avg Sentiment</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {(holdings.reduce((sum, h) => sum + h.sentiment, 0) / holdings.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-green-600">Positive</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-2xl">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/10 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Active Alerts</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {holdings.filter(h => h.alerts).length}
                  </p>
                  <p className="text-sm text-gray-600">of {holdings.length} stocks</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings - Modern List Design */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span>Your Holdings</span>
              </CardTitle>
              <Button variant="outline" size="sm" className="h-10">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {holdings.map((holding, index) => (
                <div key={holding.ticker} className="group p-6 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 dark:hover:from-slate-800/50 dark:hover:to-blue-900/10 transition-all duration-300 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {holding.logo}
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{holding.ticker}</h3>
                          <Badge 
                            variant="secondary"
                            className={`px-3 py-1 ${holding.sentiment >= 70 
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400" 
                              : holding.sentiment >= 50
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {holding.sentiment}% Sentiment
                          </Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{holding.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">{holding.shares} shares • Avg: ${holding.avgPrice.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right space-y-1">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          ${holding.currentPrice.toFixed(2)}
                        </div>
                        <div className={`flex items-center justify-end space-x-1 text-lg font-semibold ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          <span>{holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%</span>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          ${(holding.shares * holding.currentPrice).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Total Value
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Alerts</div>
                          <Switch
                            checked={holding.alerts}
                            onCheckedChange={() => toggleAlert(holding.ticker)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
