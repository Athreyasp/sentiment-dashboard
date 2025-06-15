
import { useState } from 'react'
import { PortfolioPreview } from '@/components/PortfolioPreview'
import { TrendingUp, Users, Shield, Zap, Bell, Activity, Filter, Brain, Target, Eye, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Clean Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Your portfolio overview
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="1w">1 Week</SelectItem>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Essential Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Portfolio Value</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">$87,432</p>
                <p className="text-sm text-green-600">+2.3% today</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Market Sentiment</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">73%</p>
                <p className="text-sm text-green-600">Bullish</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Alerts</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">5</p>
                <p className="text-sm text-orange-600">2 new</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Risk Level</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">Moderate</p>
                <p className="text-sm text-blue-600">Improving</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Holdings */}
        <div className="lg:col-span-2">
          <PortfolioPreview />
        </div>
        
        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bell className="w-5 h-5 text-orange-500" />
                <span>Active Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { ticker: 'AAPL', message: 'Price target reached', type: 'success' },
                { ticker: 'TSLA', message: 'High volatility detected', type: 'warning' },
                { ticker: 'GOOGL', message: 'Earnings announcement', type: 'info' },
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">{alert.ticker}</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{alert.message}</p>
                  </div>
                  <Badge 
                    variant={alert.type === 'success' ? 'default' : alert.type === 'warning' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <span>Market Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">S&P 500</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900 dark:text-white">4,235.12</span>
                    <span className="text-green-600 text-sm ml-2">+0.8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">NASDAQ</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900 dark:text-white">13,240.77</span>
                    <span className="text-green-600 text-sm ml-2">+1.2%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">DOW</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900 dark:text-white">34,152.01</span>
                    <span className="text-red-600 text-sm ml-2">-0.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Add New Stock
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
