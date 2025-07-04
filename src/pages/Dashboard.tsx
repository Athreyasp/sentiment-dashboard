
import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Bell, Brain, Target, Eye, BarChart3, IndianRupee, Zap, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFinancialNews } from '@/hooks/useFinancialNews'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')
  const { news, loading } = useFinancialNews()

  // Mock Indian stock data for demonstration
  const indianStocks = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: 2456.75, change: 2.3, prediction: 'bullish' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services', price: 3678.20, change: -0.8, prediction: 'neutral' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', price: 1598.45, change: 1.2, prediction: 'bullish' },
    { symbol: 'INFY.NS', name: 'Infosys', price: 1456.30, change: -1.5, prediction: 'bearish' },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', price: 987.60, change: 0.9, prediction: 'bullish' },
  ]

  const marketIndices = [
    { name: 'NIFTY 50', value: 19842.75, change: 0.8 },
    { name: 'SENSEX', value: 66589.93, change: 1.2 },
    { name: 'BANK NIFTY', value: 44156.20, change: -0.3 },
    { name: 'NIFTY IT', value: 29876.45, change: -0.9 },
  ]

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive': return 'text-pixel-green'
      case 'negative': return 'text-red-400'
      default: return 'text-pixel-orange'
    }
  }

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return 'text-pixel-green'
      case 'bearish': return 'text-red-400'
      default: return 'text-pixel-orange'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Pixel-styled Header */}
      <div className="pixel-card rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg pixel-glow">
              <LineChart className="w-6 h-6 text-pixel-green" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-pixel gradient-text">
                INDIAN MARKET DASHBOARD
              </h1>
              <p className="text-muted-foreground font-space">
                Live NSE & BSE Market Analysis with AI Predictions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-secondary/50 border-pixel-green/30">
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
              <div className="w-2 h-2 bg-pixel-green rounded-full animate-pixel-pulse"></div>
              <span className="text-sm text-pixel-green font-pixel">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketIndices.map((index, i) => (
          <Card key={index.name} className="stock-card hover:pixel-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-pixel">{index.name}</p>
                  <p className="text-xl font-bold text-foreground font-space">₹{index.value.toLocaleString()}</p>
                  <p className={`text-sm font-pixel ${index.change >= 0 ? 'text-pixel-green' : 'text-red-400'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change}%
                  </p>
                </div>
                <div className="p-2 bg-pixel-cyan/10 rounded-lg">
                  {index.change >= 0 ? 
                    <TrendingUp className="w-5 h-5 text-pixel-green" /> : 
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Indian Financial News Feed */}
        <div className="lg:col-span-2">
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel">
                <Activity className="w-5 h-5 text-pixel-green" />
                <span className="gradient-text">LIVE INDIAN FINANCIAL NEWS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center p-8">
                  <div className="animate-pixel-glow p-4 bg-pixel-green/10 rounded-lg inline-block">
                    <Brain className="w-8 h-8 text-pixel-green animate-spin" />
                  </div>
                  <p className="text-pixel-green font-pixel mt-2">LOADING NEWS FEED...</p>
                </div>
              ) : news.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground font-pixel">No news available</p>
                </div>
              ) : (
                news.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id}
                    className="news-card p-4 rounded-lg cursor-pointer hover:pixel-glow transition-all duration-300"
                    onClick={() => item.url && window.open(item.url, '_blank')}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground hover:text-pixel-green transition-colors line-clamp-2 font-space">
                          {item.headline}
                        </h3>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-xs text-pixel-cyan font-pixel">{item.source}</span>
                          <span className="text-xs text-muted-foreground font-pixel">
                            {new Date(item.published_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`text-xs px-2 py-1 font-pixel ${getSentimentColor(item.sentiment)} bg-transparent border`}>
                          {item.sentiment?.toUpperCase() || 'NEUTRAL'}
                        </Badge>
                        <Button
                          size="sm" 
                          className="pixel-button text-xs h-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            // This would open stock prediction modal
                            console.log('Opening stock prediction for:', item.headline)
                          }}
                        >
                          PREDICT
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Stock Watchlist & Predictions */}
        <div className="space-y-6">
          {/* Top Indian Stocks */}
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel">
                <IndianRupee className="w-5 h-5 text-pixel-orange" />
                <span className="gradient-text">TOP NSE STOCKS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {indianStocks.map((stock, index) => (
                <div 
                  key={stock.symbol} 
                  className="stock-card p-3 rounded-lg hover:pixel-glow-cyan transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-semibold text-foreground font-pixel text-sm">{stock.symbol}</span>
                      <p className="text-xs text-muted-foreground line-clamp-1 font-space">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground font-space">₹{stock.price}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-pixel ${stock.change >= 0 ? 'text-pixel-green' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change}%
                        </span>
                        <Badge className={`text-xs px-1 py-0 font-pixel ${getPredictionColor(stock.prediction)} bg-transparent border`}>
                          {stock.prediction.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel">
                <Brain className="w-5 h-5 text-pixel-purple" />
                <span className="gradient-text">AI INSIGHTS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-pixel-green/10 rounded-lg border border-pixel-green/30">
                <h4 className="font-pixel text-pixel-green text-sm mb-1">MARKET SENTIMENT</h4>
                <p className="text-xs text-muted-foreground font-space">
                  Bullish trend detected in banking sector based on RBI policy announcements
                </p>
              </div>
              <div className="p-3 bg-pixel-orange/10 rounded-lg border border-pixel-orange/30">
                <h4 className="font-pixel text-pixel-orange text-sm mb-1">VOLATILITY ALERT</h4>
                <p className="text-xs text-muted-foreground font-space">
                  High volatility expected in IT stocks due to quarterly results
                </p>
              </div>
              <div className="p-3 bg-pixel-cyan/10 rounded-lg border border-pixel-cyan/30">
                <h4 className="font-pixel text-pixel-cyan text-sm mb-1">SECTOR FOCUS</h4>
                <p className="text-xs text-muted-foreground font-space">
                  Energy sector showing strong momentum with crude oil price changes
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-pixel gradient-text">QUICK ACTIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start pixel-button">
                <Target className="w-4 h-4 mr-2" />
                Add Stock to Watchlist
              </Button>
              <Button className="w-full justify-start pixel-button">
                <Bell className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
              <Button className="w-full justify-start pixel-button">
                <Eye className="w-4 h-4 mr-2" />
                View AI Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
