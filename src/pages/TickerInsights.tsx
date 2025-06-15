
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, BarChart3, Brain, Target, Zap, Eye, RefreshCw, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TickerSearch } from '@/components/TickerSearch'
import { useTickerData } from '@/hooks/useTickerData'
import { useIsMobile } from '@/hooks/use-mobile'

export default function TickerInsights() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')
  const { data, loading, error, fetchTickerData } = useTickerData()
  const isMobile = useIsMobile()

  useEffect(() => {
    fetchTickerData(selectedTicker)
  }, [selectedTicker, fetchTickerData])

  const handleTickerSelect = (ticker: string) => {
    setSelectedTicker(ticker)
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return (
          <Badge className="bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30 hover:bg-[#00C49F]/25 transition-all duration-200 font-medium px-2 py-1 text-xs">
            <div className="w-2 h-2 bg-[#00C49F] rounded-full mr-1.5"></div>
            Positive
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30 hover:bg-[#FF4C4C]/25 transition-all duration-200 font-medium px-2 py-1 text-xs">
            <div className="w-2 h-2 bg-[#FF4C4C] rounded-full mr-1.5"></div>
            Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FFCB05]/15 text-[#FFCB05] border-[#FFCB05]/30 hover:bg-[#FFCB05]/25 transition-all duration-200 font-medium px-2 py-1 text-xs">
            <div className="w-2 h-2 bg-[#FFCB05] rounded-full mr-1.5"></div>
            Neutral
          </Badge>
        )
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${changePercent.toFixed(2)}% (${sign}$${change.toFixed(2)})`
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800 shadow-lg">
          <CardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-red-800 dark:text-red-200 mb-2">Error Loading Ticker Data</h3>
                <p className="text-sm sm:text-base text-red-600 dark:text-red-300 mb-3">{error}</p>
                <Button onClick={() => fetchTickerData(selectedTicker)} className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto" variant="default">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Mobile-Responsive Hero Header with Search */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-indigo-100 dark:border-slate-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl">
                  <BarChart3 className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Ticker Insights
                  </h1>
                  <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300">
                    AI-powered deep dive into individual stock sentiment
                  </p>
                </div>
              </div>
            </div>
            
            {/* Search and Action Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 max-w-none sm:max-w-md">
                <TickerSearch 
                  onTickerSelect={handleTickerSelect}
                  currentTicker={selectedTicker}
                  isLoading={loading}
                />
              </div>
              <Button 
                onClick={() => fetchTickerData(selectedTicker)}
                disabled={loading}
                className="h-12 px-4 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg w-full sm:w-auto"
              >
                <Brain className="w-5 h-5 mr-2" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border-2 border-slate-100 dark:border-slate-700 shadow-xl">
          <CardContent className="p-6 sm:p-12">
            <div className="text-center space-y-4">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center">
                <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200">Loading {selectedTicker} Data</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Fetching latest sentiment and market data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : data ? (
        <>
          {/* Mobile-Responsive Ticker Summary */}
          <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border-2 border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm sm:text-xl">{data.ticker.slice(0, 2)}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-3xl font-bold">{data.ticker}</CardTitle>
                    <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400">{data.company}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="text-2xl sm:text-4xl font-bold">{formatPrice(data.price)}</div>
                  <div className={`flex items-center text-sm sm:text-lg ${data.change >= 0 ? 'text-[#00C49F]' : 'text-[#FF4C4C]'}`}>
                    {data.change >= 0 ? <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" /> : <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" />}
                    {isMobile ? `${data.change >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%` : formatChange(data.change, data.changePercent)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl border border-green-100 dark:border-green-800">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#00C49F] mb-1">{Math.round(data.current_sentiment)}</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Sentiment Score</div>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl border border-purple-100 dark:border-purple-800">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1">High</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Market Impact</div>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl sm:rounded-2xl border border-blue-100 dark:border-blue-800">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{data.news.length}</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">News Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile-Responsive Sentiment Chart */}
          <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 border-2 border-blue-100 dark:border-slate-700 shadow-xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-2xl">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-base lg:text-2xl">Sentiment Timeline (7 Days)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
                <LineChart data={data.trend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground"
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    interval={isMobile ? 1 : 0}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground"
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="url(#gradient)"
                    strokeWidth={isMobile ? 3 : 4}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: isMobile ? 4 : 6 }}
                    activeDot={{ r: isMobile ? 6 : 8, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Mobile-Responsive Related News */}
          <Card className="bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-800 dark:to-orange-900/20 border-2 border-orange-100 dark:border-slate-700 shadow-xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-2xl">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span>Related News Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {data.news.map((news, index) => (
                  <div key={index} className="p-4 sm:p-6 bg-gradient-to-r from-white/80 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl sm:rounded-2xl border border-white/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                      {getSentimentBadge(news.sentiment)}
                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-bold">Impact: {(news.impact * 100).toFixed(0)}%</div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{news.time}</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg leading-relaxed mb-2">{news.headline}</h4>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{news.source}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
          <CardContent className="p-6 sm:p-12 text-center space-y-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No Data Available</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4">
                No sentiment data found for '{selectedTicker}'. Please try another symbol.
              </p>
              <Button onClick={() => fetchTickerData(selectedTicker)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
