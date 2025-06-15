
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, BarChart3, Clock, ExternalLink, Target, Zap, Eye } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TickerAnalysisData {
  ticker: string
  company: string
  price: number
  change: number
  changePercent: number
  current_sentiment: number
  sentimentLabel: 'positive' | 'negative' | 'neutral'
  trend: Array<{
    date: string
    sentiment: number
  }>
  news: Array<{
    headline: string
    sentiment: 'positive' | 'negative' | 'neutral'
    source: string
    time: string
    impact: number
    url?: string
  }>
  marketCap?: string
  volume?: string
  peRatio?: number
}

interface TickerAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
  ticker: string
}

export function TickerAnalysisModal({ isOpen, onClose, ticker }: TickerAnalysisModalProps) {
  const [data, setData] = useState<TickerAnalysisData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && ticker) {
      fetchTickerAnalysis(ticker)
    }
  }, [isOpen, ticker])

  const fetchTickerAnalysis = async (symbol: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate mock comprehensive data
      const mockData: TickerAnalysisData = {
        ticker: symbol,
        company: getCompanyName(symbol),
        price: 150 + Math.random() * 100,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        current_sentiment: (Math.random() - 0.5) * 2,
        sentimentLabel: Math.random() > 0.5 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
        marketCap: `$${(Math.random() * 2000 + 500).toFixed(0)}B`,
        volume: `${(Math.random() * 50 + 10).toFixed(1)}M`,
        peRatio: Math.random() * 30 + 15,
        trend: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
          sentiment: (Math.random() - 0.5) * 2
        })),
        news: Array.from({ length: 5 }, (_, i) => ({
          headline: `${getCompanyName(symbol)} ${['reports strong quarterly earnings', 'announces new product launch', 'faces regulatory challenges', 'expands into new markets', 'updates guidance'][i]}`,
          sentiment: ['positive', 'positive', 'negative', 'neutral', 'positive'][i] as any,
          source: ['Reuters', 'Bloomberg', 'CNBC', 'Wall Street Journal', 'MarketWatch'][i],
          time: `${i + 1}h ago`,
          impact: Math.random() * 0.8 + 0.2
        }))
      }
      
      setData(mockData)
    } catch (error) {
      console.error('Failed to fetch ticker analysis:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCompanyName = (symbol: string): string => {
    const companies: Record<string, string> = {
      'AAPL': 'Apple Inc.',
      'AMZN': 'Amazon.com Inc.',
      'TSLA': 'Tesla Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'META': 'Meta Platforms Inc.',
      'NVDA': 'NVIDIA Corporation',
    }
    return companies[symbol] || `${symbol} Corporation`
  }

  const getSentimentBadge = (sentiment: 'positive' | 'negative' | 'neutral') => {
    const colors = {
      positive: 'bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30',
      negative: 'bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30',
      neutral: 'bg-[#FFCB05]/15 text-[#FFCB05] border-[#FFCB05]/30'
    }
    
    return (
      <Badge className={`${colors[sentiment]} hover:opacity-80 transition-all duration-200 font-medium px-2 py-1 text-xs`}>
        <div className={`w-2 h-2 rounded-full mr-1.5 ${
          sentiment === 'positive' ? 'bg-[#00C49F]' : 
          sentiment === 'negative' ? 'bg-[#FF4C4C]' : 'bg-[#FFCB05]'
        }`}></div>
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </Badge>
    )
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${changePercent.toFixed(2)}% (${sign}$${change.toFixed(2)})`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">{ticker.slice(0, 2)}</span>
            </div>
            <div>
              <span>Detailed Analysis: {ticker}</span>
              {data && (
                <p className="text-sm text-slate-600 dark:text-slate-400 font-normal mt-1">
                  {data.company}
                </p>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Price and Key Metrics */}
            <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold mb-2">{formatPrice(data.price)}</div>
                    <div className={`flex items-center text-lg ${data.change >= 0 ? 'text-[#00C49F]' : 'text-[#FF4C4C]'}`}>
                      {data.change >= 0 ? <TrendingUp className="w-5 h-5 mr-2" /> : <TrendingDown className="w-5 h-5 mr-2" />}
                      {formatChange(data.change, data.changePercent)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    {getSentimentBadge(data.sentimentLabel)}
                    <div className="text-right">
                      <div className="text-sm text-slate-600 dark:text-slate-400">Sentiment Score</div>
                      <div className="text-xl font-bold">{data.current_sentiment.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{data.marketCap}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Market Cap</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800">
                    <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{data.volume}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Volume</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                    <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{data.peRatio?.toFixed(1)}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">P/E Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                    <Eye className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{data.news.length}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">News Articles</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Chart */}
            <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 border border-blue-100 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>7-Day Sentiment Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.trend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-muted-foreground"
                      tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-muted-foreground"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="url(#gradient)"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
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

            {/* News Analysis */}
            <Card className="bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-800 dark:to-orange-900/20 border border-orange-100 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <span>Latest News Impact Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.news.map((news, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-white/80 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl border border-white/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 space-y-2 md:space-y-0">
                        <div className="flex items-center space-x-3">
                          {getSentimentBadge(news.sentiment)}
                          <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {news.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">Impact: {(news.impact * 100).toFixed(0)}%</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{news.source}</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base leading-relaxed mb-2">{news.headline}</h4>
                      <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 p-0 h-auto">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read full article
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No analysis data available for {ticker}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
