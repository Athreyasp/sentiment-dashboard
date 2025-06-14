
import { useState } from 'react'
import { SentimentCard } from '@/components/SentimentCard'
import { SentimentChart } from '@/components/SentimentChart'
import { NewsHighlights } from '@/components/NewsHighlights'
import { HeatmapView } from '@/components/HeatmapView'
import { PortfolioPreview } from '@/components/PortfolioPreview'
import { TopNewsPanel } from '@/components/TopNewsPanel'
import { TrendingUp, Users, Shield, Zap, Bell, Activity, Filter, ChevronDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-fade-in">
        {/* Hero Header Section with improved design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-100 dark:border-slate-700 shadow-xl">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    📊 Market Overview
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    Real-time sentiment analysis powered by AI
                  </p>
                </div>
              </div>
              
              {/* AI-backed insights badge */}
              <Badge variant="outline" className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-blue-200 dark:border-blue-800">
                🤖 AI-backed insights
              </Badge>
            </div>
            
            {/* Filters Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filters:</span>
              </div>
              
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-48 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
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
              
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Quick Stats Row with tooltips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-help">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Market Trend</div>
                      <div className="font-semibold text-green-600 flex items-center">
                        🟢 Bullish
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overall market sentiment based on AI analysis</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-help">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Active Traders</div>
                      <div className="font-semibold text-blue-600">2,847</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of active traders on the platform</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-help">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Security Score</div>
                      <div className="font-semibold text-purple-600">98.5%</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Platform security and data protection score</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-help">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Response Time</div>
                      <div className="font-semibold text-yellow-600">12ms</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average API response time for real-time data</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Enhanced Sentiment Score Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <span>📈 Sentiment Insights</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>AI-powered sentiment analysis of market data</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SentimentCard
              title="Overall Market Sentiment"
              value="73.2"
              change="+2.4%"
              sentiment="positive"
              subtitle="vs yesterday"
              emoji="🟢"
            />
            <SentimentCard
              title="Active Alerts"
              value="12"
              change="+3"
              sentiment="neutral"
              subtitle="new today"
              emoji="🟡"
            />
            <SentimentCard
              title="Portfolio Health"
              value="8.7/10"
              change="+0.3"
              sentiment="positive"
              subtitle="trending up"
              emoji="🟢"
            />
            <SentimentCard
              title="Risk Level"
              value="Moderate"
              change="-5%"
              sentiment="positive"
              subtitle="improving"
              emoji="🟡"
            />
          </div>
        </div>

        {/* Main Content Grid with new widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SentimentChart />
            <HeatmapView />
          </div>
          <div className="space-y-8">
            <PortfolioPreview />
            <TopNewsPanel />
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Performers with drill-down interaction */}
          <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-slate-800 dark:via-green-900/10 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">🏆 Top Performers Today</h3>
            </div>
            <div className="space-y-4">
              {['AAPL', 'MSFT', 'GOOGL', 'TSLA'].map((ticker, index) => (
                <div key={ticker} className="flex items-center justify-between p-3 bg-white/70 dark:bg-slate-700/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{ticker.slice(0, 2)}</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-white">{ticker}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-positive font-bold text-lg">+{(2.5 + index * 0.5).toFixed(1)}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Sentiment: {85 + index * 2}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Sentiment Breakdown */}
          <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/50 dark:from-slate-800 dark:via-purple-900/10 dark:to-blue-900/20 p-6 rounded-2xl border border-purple-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">🧠 Sentiment Breakdown</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                    <span>🟢 Positive News</span>
                  </span>
                  <span className="text-sm font-semibold text-positive">65%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                    <span>🟡 Neutral News</span>
                  </span>
                  <span className="text-sm font-semibold text-neutral">25%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                    <span>🔴 Negative News</span>
                  </span>
                  <span className="text-sm font-semibold text-negative">10%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
