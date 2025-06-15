
import { useState, useEffect } from 'react'
import { SentimentCard } from '@/components/SentimentCard'
import { SentimentChart } from '@/components/SentimentChart'
import { NewsHighlights } from '@/components/NewsHighlights'
import { HeatmapView } from '@/components/HeatmapView'
import { PortfolioPreview } from '@/components/PortfolioPreview'
import { TopNewsPanel } from '@/components/TopNewsPanel'
import { TrendingUp, Users, Shield, Zap, Bell, Activity, Filter, ChevronDown, Info, Sparkles, Brain, Target, Eye, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

const TypewriterText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span>{displayText}</span>
}

const CountUpNumber = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function Dashboard() {
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <TooltipProvider>
      <div className="space-y-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/3 to-purple-600/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/3 to-cyan-600/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/3 to-pink-600/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Header Section with enhanced animations */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-100 dark:border-slate-700 shadow-2xl hover:shadow-3xl transition-all duration-700 z-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Enhanced background decorations */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl hover:scale-110 transition-transform duration-500 animate-bounce">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    <TypewriterText text="🚀 Market Command Center" delay={80} />
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mt-2">
                    <TypewriterText text="Real-time AI insights driving your investment success" delay={50} />
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-emerald-200 dark:border-emerald-800 hover:scale-105 transition-transform duration-200 animate-pulse">
                  <Brain className="w-4 h-4 mr-2 text-emerald-600" />
                  AI-Powered Analytics
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Live Data</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Filters Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                    <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">Smart Filters</span>
                </div>
                
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-56 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 border-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:scale-105">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent className="animate-scale-in z-50">
                    <SelectItem value="all">🌐 All Sectors</SelectItem>
                    <SelectItem value="tech">💻 Technology</SelectItem>
                    <SelectItem value="finance">🏦 Finance</SelectItem>
                    <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                    <SelectItem value="energy">⚡ Energy</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent className="animate-scale-in z-50">
                    <SelectItem value="1d">📅 1 Day</SelectItem>
                    <SelectItem value="1w">📊 1 Week</SelectItem>
                    <SelectItem value="1m">📈 1 Month</SelectItem>
                    <SelectItem value="3m">📉 3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            {/* Enhanced Quick Stats Row with count-up animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: TrendingUp, label: 'Market Sentiment', value: '🔥 Bullish +73%', color: 'text-emerald-500', bgColor: 'from-emerald-500/10 to-green-500/10', tooltip: 'Overall market sentiment based on AI analysis of 10,000+ news sources', count: 73 },
                { icon: Users, label: 'Active Signals', value: '2,847 📈', color: 'text-blue-500', bgColor: 'from-blue-500/10 to-cyan-500/10', tooltip: 'Number of active trading signals generated by our AI', count: 2847 },
                { icon: Shield, label: 'Accuracy Score', value: '⭐ 94.7%', color: 'text-purple-500', bgColor: 'from-purple-500/10 to-pink-500/10', tooltip: 'AI prediction accuracy over the last 30 days', count: 94.7 },
                { icon: Zap, label: 'Processing Speed', value: '⚡ 8ms', color: 'text-amber-500', bgColor: 'from-amber-500/10 to-orange-500/10', tooltip: 'Average time to process and analyze new market data', count: 8 }
              ].map((stat, index) => (
                <Tooltip key={stat.label}>
                  <TooltipTrigger asChild>
                    <div className={`group cursor-help bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-fade-in hover:rotate-1`} style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 bg-gradient-to-r ${stat.color === 'text-emerald-500' ? 'from-emerald-500 to-green-600' : stat.color === 'text-blue-500' ? 'from-blue-500 to-cyan-600' : stat.color === 'text-purple-500' ? 'from-purple-500 to-pink-600' : 'from-amber-500 to-orange-600'} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                          <div className={`font-bold text-lg ${stat.color} group-hover:scale-105 transition-transform duration-300`}>
                            {stat.label === 'Active Signals' ? (
                              <><CountUpNumber target={stat.count} /> 📈</>
                            ) : stat.label === 'Accuracy Score' ? (
                              <>⭐ <CountUpNumber target={stat.count} />%</>
                            ) : stat.label === 'Processing Speed' ? (
                              <>⚡ <CountUpNumber target={stat.count} />ms</>
                            ) : (
                              <>🔥 Bullish +<CountUpNumber target={stat.count} />%</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="animate-scale-in max-w-xs">
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment Score Cards with staggered animation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span>📊 Live Sentiment Intelligence</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-slate-400 hover:text-blue-500 transition-colors duration-200" />
                </TooltipTrigger>
                <TooltipContent className="animate-scale-in">
                  <p>Real-time AI sentiment analysis of market data from multiple sources</p>
                </TooltipContent>
              </Tooltip>
            </h2>
            
            <Button variant="outline" className="hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-200">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "🎯 Overall Market Sentiment", value: "73.2", change: "+2.4%", sentiment: "positive", subtitle: "vs yesterday", emoji: "🟢", gradient: "from-emerald-500/10 to-green-500/10" },
              { title: "🔔 Active Alerts", value: "12", change: "+3", sentiment: "neutral", subtitle: "new today", emoji: "🟡", gradient: "from-amber-500/10 to-orange-500/10" },
              { title: "💼 Portfolio Health", value: "8.7/10", change: "+0.3", sentiment: "positive", subtitle: "trending up", emoji: "🟢", gradient: "from-blue-500/10 to-cyan-500/10" },
              { title: "⚠️ Risk Level", value: "Moderate", change: "-5%", sentiment: "positive", subtitle: "improving", emoji: "🟡", gradient: "from-purple-500/10 to-pink-500/10" }
            ].map((card, index) => (
              <div key={card.title} className={`group hover:scale-105 transition-all duration-500 animate-fade-in hover:-rotate-1`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`p-6 bg-gradient-to-br ${card.gradient} backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/30 hover:shadow-2xl transition-all duration-500 hover:border-white/50 dark:hover:border-slate-600/50`}>
                  <SentimentCard
                    title={card.title}
                    value={card.value}
                    change={card.change}
                    sentiment={card.sentiment as any}
                    subtitle={card.subtitle}
                    emoji={card.emoji}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid with scroll animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '600ms' }}>
              <SentimentChart />
            </div>
            <div className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '800ms' }}>
              <HeatmapView />
            </div>
          </div>
          <div className="space-y-8">
            <div className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '700ms' }}>
              <PortfolioPreview />
            </div>
            <div className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '900ms' }}>
              <TopNewsPanel />
            </div>
          </div>
        </div>

        {/* Bottom Section with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-gradient-to-br from-white via-green-50/50 to-emerald-50/30 dark:from-slate-800 dark:via-green-900/10 dark:to-emerald-900/20 p-8 rounded-3xl border border-green-100 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">🏆 Market Champions</h3>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 animate-pulse">
                Live
              </Badge>
            </div>
            
            <div className="space-y-4">
              {['AAPL', 'MSFT', 'GOOGL', 'TSLA'].map((ticker, index) => (
                <div key={ticker} className={`group/item flex items-center justify-between p-4 bg-white/80 dark:bg-slate-700/50 rounded-2xl border border-white/50 dark:border-slate-600/50 hover:bg-white dark:hover:bg-slate-700/80 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg animate-fade-in hover:rotate-1`} style={{ animationDelay: `${1100 + index * 100}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300 group-hover/item:rotate-12">
                      <span className="text-white font-bold text-sm">{ticker.slice(0, 2)}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white text-lg">{ticker}</span>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Technology</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-positive font-bold text-xl">+{(2.5 + index * 0.5).toFixed(1)}%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Sentiment: {85 + index * 2}</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:rotate-180" />
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Breakdown */}
          <div className="bg-gradient-to-br from-white via-purple-50/50 to-blue-50/30 dark:from-slate-800 dark:via-purple-900/10 dark:to-blue-900/20 p-8 rounded-3xl border border-purple-100 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group animate-fade-in" style={{ animationDelay: '1200ms' }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">🧠 AI Sentiment Analysis</h3>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Target className="w-5 h-5 text-slate-400 hover:text-purple-500 transition-colors duration-200" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on analysis of 50,000+ news sources</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-6">
              {[
                { label: '🟢 Bullish Signals', percentage: 65, color: 'from-green-500 to-emerald-500', textColor: 'text-positive', count: '3,247' },
                { label: '🟡 Neutral Signals', percentage: 25, color: 'from-yellow-500 to-orange-500', textColor: 'text-neutral', count: '1,250' },
                { label: '🔴 Bearish Signals', percentage: 10, color: 'from-red-500 to-pink-500', textColor: 'text-negative', count: '500' }
              ].map((item, index) => (
                <div key={item.label} className={`space-y-3 animate-fade-in`} style={{ animationDelay: `${1300 + index * 200}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                      <span>{item.label}</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-bold ${item.textColor}`}>{item.percentage}%</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">({item.count})</span>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-2000 ease-out shadow-lg animate-[slideIn_2s_ease-out_forwards]`} 
                      style={{ 
                        width: `${item.percentage}%`,
                        animationDelay: `${1500 + index * 300}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
