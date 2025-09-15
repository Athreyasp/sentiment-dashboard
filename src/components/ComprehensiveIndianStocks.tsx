import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { TrendingUp, TrendingDown, Brain, Search, Filter, BarChart3, Activity, RefreshCw } from 'lucide-react'
import { useExtendedStockData } from '@/hooks/useExtendedStockData'
import { StockPredictionModal } from './StockPredictionModal'
import { useEnhancedNews } from '@/hooks/useEnhancedNews'

export function ComprehensiveIndianStocks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false)
  const [currentNewsHeadline, setCurrentNewsHeadline] = useState<string>('')
  
  const { allStocks, loading, error, refreshData } = useExtendedStockData()
  const { news } = useEnhancedNews()

  // Get unique sectors for filtering
  const sectors = Array.from(new Set(allStocks.map(stock => stock.sector).filter(Boolean)))

  // Filter stocks based on search and sector
  const filteredStocks = allStocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = !selectedSector || stock.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const handlePredictStock = (stock: any, newsHeadline?: string) => {
    setSelectedStock(stock)
    setCurrentNewsHeadline(newsHeadline || '')
    setIsPredictionModalOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const getSectorColor = (sector: string) => {
    const colors = {
      'Banking': 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      'IT': 'from-green-500/20 to-green-600/20 border-green-500/30',
      'Oil & Gas': 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      'FMCG': 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      'Pharmaceuticals': 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
      'Automobile': 'from-red-500/20 to-red-600/20 border-red-500/30',
      'Metals': 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
      'Telecom': 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
      'Infrastructure': 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      'Power': 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30'
    }
    return colors[sector as keyof typeof colors] || 'from-muted/20 to-muted/30 border-border'
  }

  // Get relevant news for stock predictions
  const getRelevantNews = (symbol: string) => {
    return news.find(item => 
      item.stock_symbols?.some(s => s.includes(symbol)) ||
      item.headline.toLowerCase().includes(symbol.toLowerCase())
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pixel-green to-pixel-cyan bg-clip-text text-transparent font-pixel">
            COMPREHENSIVE INDIAN STOCKS
          </h2>
          <p className="text-muted-foreground font-space">
            Complete NSE/BSE stocks with AI-powered predictions based on live news
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-pixel-green/30 text-pixel-green">
            <Activity className="w-3 h-3 mr-1" />
            {allStocks.length} Stocks
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={loading}
            className="border-pixel-blue/30 text-pixel-blue hover:bg-pixel-blue/10"
          >
            {loading ? (
              <Activity className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks by symbol or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && allStocks.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-5 h-5 animate-spin" />
            <span>Loading comprehensive stock data...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-destructive mb-2">Failed to load stock data</p>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Stocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStocks.map((stock) => {
          const relevantNews = getRelevantNews(stock.symbol)
          
          return (
            <Card 
              key={stock.symbol} 
              className={`relative overflow-hidden bg-gradient-to-br ${getSectorColor(stock.sector || '')} backdrop-blur-sm hover:shadow-lg transition-all duration-300 group`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-semibold text-foreground mb-1 font-pixel">
                      {stock.symbol}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-2 font-space">
                      {stock.name}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-pixel-green/10 text-pixel-green border-pixel-green/20">
                    {stock.exchange}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price & Change */}
                <div className="space-y-2">
                  <div className="text-lg font-bold text-foreground font-space">
                    {formatPrice(stock.price)}
                  </div>
                  <div className={`flex items-center space-x-2 ${
                    stock.change >= 0 ? 'text-pixel-green' : 'text-red-400'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-sm font-medium">
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        stock.change >= 0 
                          ? 'bg-pixel-green/10 text-pixel-green border-pixel-green/20' 
                          : 'bg-red-400/10 text-red-400 border-red-400/20'
                      }`}
                    >
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>

                {/* Stock Details */}
                {stock.sector && (
                  <div className="text-xs text-muted-foreground">
                    <span className="text-foreground font-medium">{stock.sector}</span>
                  </div>
                )}

                {/* News Indicator */}
                {relevantNews && (
                  <div className="bg-pixel-cyan/10 border border-pixel-cyan/20 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-3 h-3 text-pixel-cyan" />
                      <span className="text-xs font-medium text-pixel-cyan">Related News</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {relevantNews.headline}
                    </p>
                  </div>
                )}

                {/* Prediction Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-gradient-to-r from-pixel-green/10 to-pixel-cyan/10 border-pixel-green/30 hover:from-pixel-green/20 hover:to-pixel-cyan/20 group-hover:border-pixel-green/50 transition-all duration-300 font-pixel"
                  onClick={() => handlePredictStock(stock, relevantNews?.headline)}
                >
                  <Brain className="w-3 h-3 mr-2" />
                  AI PREDICT
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {filteredStocks.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No stocks found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => { setSearchTerm(''); setSelectedSector('') }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Prediction Modal */}
      {selectedStock && (
        <StockPredictionModal
          isOpen={isPredictionModalOpen}
          onClose={() => setIsPredictionModalOpen(false)}
          stock={selectedStock}
          newsHeadline={currentNewsHeadline}
        />
      )}
    </div>
  )
}