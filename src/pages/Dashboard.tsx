import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Bell, Brain, Target, Eye, BarChart3, IndianRupee, Zap, LineChart, Plus, RefreshCw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useFinancialNews } from '@/hooks/useFinancialNews'
import { useWatchlist } from '@/hooks/useWatchlist'
import { StockPredictionModal } from '@/components/StockPredictionModal'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d')
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [showPredictionModal, setShowPredictionModal] = useState(false)
  const [newStockSymbol, setNewStockSymbol] = useState('')
  const [newStockName, setNewStockName] = useState('')
  
  const { news, loading } = useFinancialNews()
  const { watchlist, loading: watchlistLoading, addToWatchlist, removeFromWatchlist, updateAllPrices } = useWatchlist()

  // Mock Indian stock data for market indices
  const marketIndices = [
    { name: 'NIFTY 50', value: 19842.75, change: 0.8 },
    { name: 'SENSEX', value: 66589.93, change: 1.2 },
    { name: 'BANK NIFTY', value: 44156.20, change: -0.3 },
    { name: 'NIFTY IT', value: 29876.45, change: -0.9 },
  ]

  // Popular Indian stocks for predictions when news doesn't specify
  const popularIndianStocks = [
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'HINDUNILVR.NS', 'ITC.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'KOTAKBANK.NS'
  ]

  const handleNewsClick = (newsItem: any) => {
    setSelectedNews(newsItem)
    setShowPredictionModal(true)
  }

  const handleAddStock = async () => {
    if (newStockSymbol && newStockName) {
      await addToWatchlist(newStockSymbol.toUpperCase(), newStockName)
      setNewStockSymbol('')
      setNewStockName('')
    }
  }

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive': return 'text-pixel-green'
      case 'negative': return 'text-red-400'
      default: return 'text-pixel-orange'
    }
  }

  const formatLastUpdated = (timestamp: string) => {
    const now = new Date()
    const updated = new Date(timestamp)
    const diff = now.getTime() - updated.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
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
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex-1" onClick={() => item.url && window.open(item.url, '_blank')}>
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
                            handleNewsClick(item)
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
        
        {/* Watchlist & Predictions */}
        <div className="space-y-6">
          {/* Add Stock to Watchlist */}
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel">
                <Plus className="w-5 h-5 text-pixel-green" />
                <span className="gradient-text">ADD TO WATCHLIST</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Stock Symbol (e.g., RELIANCE.NS)"
                value={newStockSymbol}
                onChange={(e) => setNewStockSymbol(e.target.value)}
                className="bg-secondary/50 border-pixel-green/30 font-pixel"
              />
              <Input
                placeholder="Company Name"
                value={newStockName}
                onChange={(e) => setNewStockName(e.target.value)}
                className="bg-secondary/50 border-pixel-green/30 font-space"
              />
              <Button 
                onClick={handleAddStock} 
                className="w-full pixel-button"
                disabled={!newStockSymbol || !newStockName}
              >
                <Plus className="w-4 h-4 mr-2" />
                ADD STOCK
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Watchlist with Live Prices */}
          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg font-pixel">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-pixel-orange" />
                  <span className="gradient-text">MY WATCHLIST</span>
                </div>
                <Button
                  size="sm"
                  onClick={updateAllPrices}
                  disabled={watchlistLoading}
                  className="pixel-button text-xs h-6"
                >
                  <RefreshCw className={`w-3 h-3 mr-1 ${watchlistLoading ? 'animate-spin' : ''}`} />
                  UPDATE
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlist.length === 0 ? (
                <p className="text-center text-muted-foreground font-pixel text-sm py-4">
                  No stocks in watchlist
                </p>
              ) : (
                watchlist.map((stock, index) => (
                  <div 
                    key={stock.symbol} 
                    className="stock-card p-3 rounded-lg hover:pixel-glow-cyan transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-foreground font-pixel text-sm">{stock.symbol}</span>
                          {stock.current_price && (
                            <Badge variant="outline" className="text-xs px-1 py-0 font-pixel">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 font-space">{stock.name}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromWatchlist(stock.symbol)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-5 w-5 p-0 hover:bg-red-400/20 hover:text-red-400"
                      >
                        ×
                      </Button>
                    </div>
                    
                    {stock.current_price ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground font-space">₹{stock.current_price.toFixed(2)}</span>
                          <span className={`text-xs font-pixel ${stock.change && stock.change >= 0 ? 'text-pixel-green' : 'text-red-400'}`}>
                            {stock.change_percent && (stock.change_percent >= 0 ? '+' : '')}{stock.change_percent?.toFixed(2)}%
                          </span>
                        </div>
                        
                        {stock.day_high && stock.day_low && (
                          <div className="flex items-center justify-between text-xs text-muted-foreground font-pixel">
                            <span>H: ₹{stock.day_high.toFixed(2)}</span>
                            <span>L: ₹{stock.day_low.toFixed(2)}</span>
                          </div>
                        )}
                        
                        {stock.last_updated && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground font-pixel">
                            <Clock className="w-3 h-3" />
                            <span>{formatLastUpdated(stock.last_updated)}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground font-pixel">
                        Loading price data...
                      </div>
                    )}
                  </div>
                ))
              )}
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

          <Card className="pixel-card border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-pixel gradient-text">QUICK ACTIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start pixel-button">
                <Target className="w-4 h-4 mr-2" />
                View Portfolio Analysis
              </Button>
              <Button className="w-full justify-start pixel-button">
                <Bell className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
              <Button className="w-full justify-start pixel-button">
                <Eye className="w-4 h-4 mr-2" />
                Market Trends Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stock Prediction Modal */}
      {selectedNews && (
        <StockPredictionModal 
          isOpen={showPredictionModal}
          onClose={() => {
            setShowPredictionModal(false)
            setSelectedNews(null)
          }}
          newsHeadline={selectedNews.headline}
          sentiment={selectedNews.sentiment}
          potentialStocks={selectedNews.ticker ? [selectedNews.ticker] : popularIndianStocks}
        />
      )}
    </div>
  )
}