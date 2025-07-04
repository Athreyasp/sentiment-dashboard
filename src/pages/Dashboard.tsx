
import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Bell, Brain, Target, Eye, BarChart3, IndianRupee, Zap, LineChart, Plus, RefreshCw } from 'lucide-react'
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
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-500'
      default: return 'text-amber-600'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-200">
              <LineChart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-pixel text-gray-800">
                INDIAN MARKET DASHBOARD
              </h1>
              <p className="text-gray-600 font-space">
                Live NSE & BSE Market Analysis with AI Predictions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200">
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
              <span className="text-sm text-green-600 font-pixel">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketIndices.map((index, i) => (
          <Card key={index.name} className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-pixel">{index.name}</p>
                  <p className="text-xl font-bold text-gray-800 font-space">₹{index.value.toLocaleString()}</p>
                  <p className={`text-sm font-pixel ${index.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change}%
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  {index.change >= 0 ? 
                    <TrendingUp className="w-5 h-5 text-green-600" /> : 
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid - Optimized Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel text-gray-800">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>LIVE INDIAN FINANCIAL NEWS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="text-center p-8">
                    <div className="p-4 bg-blue-50 rounded-lg inline-block">
                      <Brain className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <p className="text-blue-600 font-pixel mt-2">LOADING NEWS FEED...</p>
                  </div>
                ) : news.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-gray-500 font-pixel">No news available</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {news.slice(0, 8).map((item, index) => (
                      <div
                        key={item.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between space-x-3">
                          <div className="flex-1" onClick={() => item.url && window.open(item.url, '_blank')}>
                            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 font-space text-sm">
                              {item.headline}
                            </h3>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="text-xs text-blue-600 font-pixel">{item.source}</span>
                              <span className="text-xs text-gray-500 font-pixel">
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
                              className="bg-blue-600 hover:bg-blue-700 text-white font-pixel text-xs h-6 px-3"
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
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Sidebar - Watchlist & Tools */}
        <div className="space-y-6">
          {/* Add Stock to Watchlist */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel text-gray-800">
                <Plus className="w-5 h-5 text-green-600" />
                <span>ADD TO WATCHLIST</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Stock Symbol (e.g., RELIANCE.NS)"
                value={newStockSymbol}
                onChange={(e) => setNewStockSymbol(e.target.value)}
                className="bg-gray-50 border-gray-200 font-pixel"
              />
              <Input
                placeholder="Company Name"
                value={newStockName}
                onChange={(e) => setNewStockName(e.target.value)}
                className="bg-gray-50 border-gray-200 font-space"
              />
              <Button 
                onClick={handleAddStock} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-pixel"
                disabled={!newStockSymbol || !newStockName}
              >
                <Plus className="w-4 h-4 mr-2" />
                ADD STOCK
              </Button>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg font-pixel text-gray-800">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-amber-600" />
                  <span>MY WATCHLIST</span>
                </div>
                <Button
                  size="sm"
                  onClick={updateAllPrices}
                  disabled={watchlistLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-pixel text-xs h-6"
                >
                  <RefreshCw className={`w-3 h-3 mr-1 ${watchlistLoading ? 'animate-spin' : ''}`} />
                  UPDATE
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlist.length === 0 ? (
                <p className="text-center text-gray-500 font-pixel text-sm py-4">
                  No stocks in watchlist
                </p>
              ) : (
                watchlist.map((stock, index) => (
                  <div 
                    key={stock.symbol} 
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800 font-pixel text-sm">{stock.symbol}</span>
                        <p className="text-xs text-gray-600 line-clamp-1 font-space">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        {stock.current_price && (
                          <>
                            <span className="font-bold text-gray-800 font-space">₹{stock.current_price.toFixed(2)}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs font-pixel ${stock.change && stock.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {stock.change_percent && (stock.change_percent >= 0 ? '+' : '')}{stock.change_percent?.toFixed(2)}%
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromWatchlist(stock.symbol)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-5 w-5 p-0 hover:bg-red-100 hover:text-red-600"
                              >
                                ×
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-pixel text-gray-800">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI INSIGHTS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-pixel text-green-700 text-sm mb-1">MARKET SENTIMENT</h4>
                <p className="text-xs text-gray-600 font-space">
                  Bullish trend detected in banking sector based on RBI policy announcements
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-pixel text-amber-700 text-sm mb-1">VOLATILITY ALERT</h4>
                <p className="text-xs text-gray-600 font-space">
                  High volatility expected in IT stocks due to quarterly results
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-pixel text-blue-700 text-sm mb-1">SECTOR FOCUS</h4>
                <p className="text-xs text-gray-600 font-space">
                  Energy sector showing strong momentum with crude oil price changes
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-pixel text-gray-800">QUICK ACTIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white font-pixel">
                <Target className="w-4 h-4 mr-2" />
                View Portfolio Analysis
              </Button>
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white font-pixel">
                <Bell className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white font-pixel">
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
