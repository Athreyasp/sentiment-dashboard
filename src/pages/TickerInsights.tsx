
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, BarChart3, Brain, Target, Zap, Eye } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const tickerData = [
  { date: '2024-01-01', sentiment: 45, price: 150.20 },
  { date: '2024-01-02', sentiment: 52, price: 152.15 },
  { date: '2024-01-03', sentiment: 48, price: 149.80 },
  { date: '2024-01-04', sentiment: 67, price: 156.30 },
  { date: '2024-01-05', sentiment: 73, price: 159.45 },
  { date: '2024-01-06', sentiment: 69, price: 157.90 },
  { date: '2024-01-07', sentiment: 75, price: 161.20 },
]

const relatedNews = [
  {
    headline: "Company announces breakthrough in AI technology",
    sentiment: "positive",
    impact: 0.85,
    time: "2 hours ago"
  },
  {
    headline: "Quarterly earnings exceed analyst expectations",
    sentiment: "positive", 
    impact: 0.92,
    time: "1 day ago"
  },
  {
    headline: "Regulatory concerns emerge in European markets",
    sentiment: "negative",
    impact: 0.73,
    time: "2 days ago"
  }
]

export default function TickerInsights() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-slate-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Ticker Insights
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  AI-powered deep dive into individual stock sentiment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search ticker..."
                  value={selectedTicker}
                  onChange={(e) => setSelectedTicker(e.target.value.toUpperCase())}
                  className="pl-12 w-56 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 focus:border-indigo-300"
                />
              </div>
              <Button className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                <Brain className="w-5 h-5 mr-2" />
                Analyze
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Ticker Summary */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border-2 border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">{selectedTicker.slice(0, 2)}</span>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">{selectedTicker}</CardTitle>
                <p className="text-lg text-slate-600 dark:text-slate-400">Apple Inc.</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">$161.20</div>
              <div className="flex items-center text-positive text-lg">
                <TrendingUp className="w-6 h-6 mr-2" />
                +2.8% (+$4.40)
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800">
              <div className="flex justify-center mb-3">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-positive mb-1">75</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Sentiment Score</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
              <div className="flex justify-center mb-3">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold mb-1">High</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Market Impact</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="flex justify-center mb-3">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold mb-1">247</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">News Articles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Sentiment Chart */}
      <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 border-2 border-blue-100 dark:border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span>Sentiment Timeline (7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tickerData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
                strokeWidth={4}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 8, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
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

      {/* Enhanced Related News */}
      <Card className="bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-800 dark:to-orange-900/20 border-2 border-orange-100 dark:border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span>Related News Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatedNews.map((news, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-white/80 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border border-white/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    className={`px-3 py-1 text-sm font-medium ${news.sentiment === 'positive' 
                      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                      : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                    }`}
                  >
                    {news.sentiment === 'positive' ? '📈 Positive' : '📉 Negative'}
                  </Badge>
                  <div className="text-right">
                    <div className="text-lg font-bold">Impact: {(news.impact * 100).toFixed(0)}%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{news.time}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-lg leading-relaxed">{news.headline}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
