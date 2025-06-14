
import { useState } from 'react'
import { SentimentCard } from '@/components/SentimentCard'
import { SentimentChart } from '@/components/SentimentChart'
import { HeatmapView } from '@/components/HeatmapView'
import { PortfolioPreview } from '@/components/PortfolioPreview'
import { TopNewsPanel } from '@/components/TopNewsPanel'
import { TrendingUp, Users, Shield, Zap, Bell, Activity, Filter, ChevronDown, Info, Upload, AlertCircle, BarChart3, LineChart, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'

const tickerData = [
  { symbol: 'AAPL', name: 'Apple Inc.', sentiment: '+2.1%', score: 85, alerts: true, sparkline: [65, 68, 72, 70, 75, 78, 85] },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sentiment: '+1.8%', score: 78, alerts: true, sparkline: [60, 65, 68, 72, 75, 76, 78] },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sentiment: '+0.9%', score: 82, alerts: false, sparkline: [70, 72, 74, 78, 80, 81, 82] },
  { symbol: 'TSLA', name: 'Tesla Inc.', sentiment: '-1.2%', score: 65, alerts: true, sparkline: [75, 72, 68, 65, 67, 66, 65] },
]

const newsData = [
  {
    headline: 'Federal Reserve hints at potential rate cuts amid inflation concerns',
    source: 'Reuters',
    time: '2 minutes ago',
    sentiment: 'neutral',
    impact: 'High'
  },
  {
    headline: 'Tech stocks surge as AI adoption accelerates across industries',
    source: 'Bloomberg',
    time: '15 minutes ago',
    sentiment: 'positive',
    impact: 'Medium'
  },
  {
    headline: 'Energy sector faces headwinds as oil prices decline',
    source: 'CNBC',
    time: '32 minutes ago',
    sentiment: 'negative',
    impact: 'Medium'
  },
  {
    headline: 'Cryptocurrency market shows signs of recovery after recent volatility',
    source: 'CoinDesk',
    time: '1 hour ago',
    sentiment: 'positive',
    impact: 'Low'
  }
]

const portfolioData = [
  { ticker: 'AAPL', holdings: 150, sentiment: 85, prediction: 'Bullish', status: 'Stable', alerts: true },
  { ticker: 'GOOGL', holdings: 75, sentiment: 78, prediction: 'Neutral', status: 'Stable', alerts: true },
  { ticker: 'MSFT', holdings: 200, sentiment: 82, prediction: 'Bullish', status: 'High Risk', alerts: false },
  { ticker: 'TSLA', holdings: 50, sentiment: 65, prediction: 'Bearish', status: 'High Risk', alerts: true },
]

export default function Dashboard() {
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')
  const [chartTimeframe, setChartTimeframe] = useState('7d')

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-[#00C49F]/10 text-[#00C49F] border-[#00C49F]/20">🟢 Positive</Badge>
      case 'negative':
        return <Badge className="bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/20">🔴 Negative</Badge>
      default:
        return <Badge className="bg-[#FBC02D]/10 text-[#FBC02D] border-[#FBC02D]/20">🟡 Neutral</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Stable':
        return <Badge className="bg-[#00C49F]/10 text-[#00C49F]">Stable</Badge>
      case 'High Risk':
        return <Badge className="bg-[#FF4C4C]/10 text-[#FF4C4C]">High Risk</Badge>
      default:
        return <Badge className="bg-[#FBC02D]/10 text-[#FBC02D]">Bullish</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-fade-in font-inter">
        
        {/* 🟨 SECTION 1: Market Sentiment Summary */}
        <Card className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-space-grotesk text-slate-800 dark:text-white flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <span>Market Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-[#00C49F]">+2.7%</div>
                  <div className="text-6xl">🟢</div>
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-300">Positive Market Sentiment</div>
                <div className="text-sm text-slate-500">Last Updated: 12:34 PM EST</div>
              </div>
              <div className="w-full lg:w-80 h-32">
                <SentimentChart />
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
                <TrendingUp className="w-5 h-5 text-[#00C49F]" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Active Traders</div>
                  <div className="font-semibold text-blue-600">2,847</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
                <Shield className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Security Score</div>
                  <div className="font-semibold text-purple-600">98.5%</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Response Time</div>
                  <div className="font-semibold text-yellow-600">12ms</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
                <Bell className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Active Alerts</div>
                  <div className="font-semibold text-red-600">12</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🟩 SECTION 2: Ticker Insights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-space-grotesk text-slate-800 dark:text-white">Ticker Insights</h2>
            <div className="flex items-center space-x-4">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tickerData.map((ticker) => (
              <Card key={ticker.symbol} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">{ticker.symbol}</CardTitle>
                      <p className="text-sm text-slate-500 truncate">{ticker.name}</p>
                    </div>
                    <Badge className={`${ticker.sentiment.startsWith('+') ? 'bg-[#00C49F]/10 text-[#00C49F]' : 'bg-[#FF4C4C]/10 text-[#FF4C4C]'}`}>
                      {ticker.sentiment}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mini Sparkline */}
                  <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-end justify-center space-x-1 p-2">
                    {ticker.sparkline.map((value, index) => (
                      <div 
                        key={index} 
                        className="bg-blue-500 rounded-sm" 
                        style={{ 
                          height: `${(value / Math.max(...ticker.sparkline)) * 100}%`,
                          width: '8px'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-slate-500">Sentiment Score: </span>
                      <span className="font-semibold">{ticker.score}</span>
                    </div>
                    <Switch checked={ticker.alerts} />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" size="sm">View Details</Button>
                    <Button variant="ghost" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 🟧 SECTION 3: News Sentiment Feed */}
        <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-slate-800 dark:via-green-900/10 dark:to-emerald-900/20 border border-green-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-space-grotesk text-slate-800 dark:text-white flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-green-500" />
              <span>Latest News</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {newsData.map((news, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm text-slate-800 dark:text-white">{news.headline}</h3>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.time}</span>
                        <Badge variant="outline" className="text-xs">{news.impact} Impact</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {getSentimentBadge(news.sentiment)}
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <div className={`h-full rounded-full ${news.impact === 'High' ? 'w-full bg-red-500' : news.impact === 'Medium' ? 'w-2/3 bg-yellow-500' : 'w-1/3 bg-green-500'}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 🟫 SECTION 4: Portfolio Overview */}
        <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/50 dark:from-slate-800 dark:via-purple-900/10 dark:to-pink-900/20 border border-purple-100 dark:border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold font-space-grotesk text-slate-800 dark:text-white flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-purple-500" />
                <span>Your Portfolio</span>
              </CardTitle>
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload CSV</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Ticker</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Holdings</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Sentiment</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Prediction</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Alert</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.map((stock) => (
                    <tr key={stock.ticker} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-white">{stock.ticker}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{stock.holdings}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${stock.sentiment >= 70 ? 'bg-[#00C49F]/10 text-[#00C49F]' : stock.sentiment >= 50 ? 'bg-[#FBC02D]/10 text-[#FBC02D]' : 'bg-[#FF4C4C]/10 text-[#FF4C4C]'}`}>
                          {stock.sentiment}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{stock.prediction}</td>
                      <td className="py-3 px-4">{getStatusBadge(stock.status)}</td>
                      <td className="py-3 px-4">
                        <Switch checked={stock.alerts} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 🟥 SECTION 5: Sentiment Visualizations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-space-grotesk text-slate-800 dark:text-white">Sentiment Visualizations</h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant={chartTimeframe === '7d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartTimeframe('7d')}
              >
                7D
              </Button>
              <Button 
                variant={chartTimeframe === '30d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartTimeframe('30d')}
              >
                30D
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HeatmapView />
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-800 dark:via-blue-900/10 dark:to-indigo-900/20 border border-blue-100 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-space-grotesk text-slate-800 dark:text-white flex items-center space-x-3">
                  <LineChart className="w-6 h-6 text-blue-500" />
                  <span>Sentiment Over Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <SentimentChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>🔒 Secured by AI</span>
              </span>
              <span>•</span>
              <span>Contact</span>
              <span>•</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
