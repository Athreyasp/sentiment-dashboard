
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
          <Badge className="bg-pixel-green/15 text-pixel-green border-pixel-green/30 hover:bg-pixel-green/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-pixel-green rounded-full mr-2 animate-pixel-pulse"></div>
            BULLISH
          </Badge>
        )
      case 'negative':
        return (
          <Badge className="bg-red-400/15 text-red-400 border-red-400/30 hover:bg-red-400/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pixel-pulse"></div>
            BEARISH
          </Badge>
        )
      default:
        return (
          <Badge className="bg-pixel-orange/15 text-pixel-orange border-pixel-orange/30 hover:bg-pixel-orange/25 transition-all duration-200 font-pixel px-3 py-1 text-xs">
            <div className="w-2 h-2 bg-pixel-orange rounded-full mr-2 animate-pixel-pulse"></div>
            NEUTRAL
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
      <div className="space-y-6 animate-fade-in">
        <Card className="pixel-card border-red-400/30 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-400/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2 font-pixel">ERROR LOADING TICKER DATA</h3>
                <p className="text-red-300 font-space mb-3">{error}</p>
                <Button onClick={() => fetchTickerData(selectedTicker)} className="pixel-button" variant="default">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  TRY AGAIN
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Pixel-styled Header */}
      <div className="pixel-card rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg pixel-glow">
              <BarChart3 className="w-6 h-6 text-pixel-green" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-pixel gradient-text">
                TICKER INSIGHTS
              </h1>
              <p className="text-muted-foreground font-space">
                AI-powered deep dive into individual stock sentiment
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pixel-green rounded-full animate-pixel-pulse"></div>
            <span className="text-sm text-pixel-green font-pixel">ANALYZING</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="pixel-card rounded-lg p-6 border">
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
            className="pixel-button"
          >
            <Brain className="w-5 h-5 mr-2" />
            {loading ? 'ANALYZING...' : 'ANALYZE'}
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="pixel-card shadow-xl">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="p-4 bg-pixel-green/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center animate-pixel-glow">
                <RefreshCw className="w-8 h-8 animate-spin text-pixel-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground font-pixel">LOADING {selectedTicker} DATA</h3>
                <p className="text-muted-foreground font-space">Fetching latest sentiment and market data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : data ? (
        <>
          {/* Ticker Summary */}
          <Card className="pixel-card shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-pixel-green font-bold text-xl font-pixel">{data.ticker.slice(0, 2)}</span>
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold font-pixel">{data.ticker}</CardTitle>
                    <p className="text-lg text-muted-foreground font-space">{data.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold font-space">{formatPrice(data.price)}</div>
                  <div className={`flex items-center text-lg ${data.change >= 0 ? 'text-pixel-green' : 'text-red-400'}`}>
                    {data.change >= 0 ? <TrendingUp className="w-6 h-6 mr-2" /> : <TrendingDown className="w-6 h-6 mr-2" />}
                    {formatChange(data.change, data.changePercent)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 pixel-card rounded-xl border border-pixel-green/30">
                  <div className="flex justify-center mb-3">
                    <Target className="w-8 h-8 text-pixel-green" />
                  </div>
                  <div className="text-3xl font-bold text-pixel-green mb-1 font-pixel">{Math.round(data.current_sentiment)}</div>
                  <div className="text-sm text-muted-foreground font-space">Sentiment Score</div>
                </div>
                <div className="text-center p-6 pixel-card rounded-xl border border-pixel-purple/30">
                  <div className="flex justify-center mb-3">
                    <Zap className="w-8 h-8 text-pixel-purple" />
                  </div>
                  <div className="text-3xl font-bold mb-1 font-pixel">HIGH</div>
                  <div className="text-sm text-muted-foreground font-space">Market Impact</div>
                </div>
                <div className="text-center p-6 pixel-card rounded-xl border border-pixel-cyan/30">
                  <div className="flex justify-center mb-3">
                    <Eye className="w-8 h-8 text-pixel-cyan" />
                  </div>
                  <div className="text-3xl font-bold mb-1 font-pixel">{data.news.length}</div>
                  <div className="text-sm text-muted-foreground font-space">News Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Chart */}
          <Card className="pixel-card shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl font-pixel">
                <div className="p-2 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-pixel-green" />
                </div>
                <span className="gradient-text">SENTIMENT TIMELINE (7 DAYS)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.trend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground font-pixel"
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground font-pixel"
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
                    stroke="rgb(var(--pixel-green))"
                    strokeWidth={4}
                    dot={{ fill: 'rgb(var(--pixel-green))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'rgb(var(--pixel-green))', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Related News */}
          <Card className="pixel-card shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl font-pixel">
                <div className="p-2 bg-gradient-to-r from-pixel-orange/20 to-pixel-pink/20 rounded-lg">
                  <Eye className="w-6 h-6 text-pixel-orange" />
                </div>
                <span className="gradient-text">RELATED NEWS IMPACT</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.news.map((news, index) => (
                  <div key={index} className="p-6 news-card rounded-xl border hover:pixel-glow transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-4">
                      {getSentimentBadge(news.sentiment)}
                      <div className="text-right">
                        <div className="text-lg font-bold font-pixel">IMPACT: {(news.impact * 100).toFixed(0)}%</div>
                        <div className="text-sm text-muted-foreground font-space">{news.time}</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg leading-relaxed mb-2 font-space">{news.headline}</h4>
                    <div className="text-sm text-muted-foreground font-pixel">{news.source}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="pixel-card shadow-xl">
          <CardContent className="p-12 text-center space-y-4">
            <div className="p-4 bg-pixel-orange/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-pixel-orange" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground font-pixel mb-2">NO DATA AVAILABLE</h3>
              <p className="text-muted-foreground font-space mb-4">
                No sentiment data found for '{selectedTicker}'. Please try another symbol.
              </p>
              <Button onClick={() => fetchTickerData(selectedTicker)} className="pixel-button">
                <RefreshCw className="w-4 h-4 mr-2" />
                RETRY
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
