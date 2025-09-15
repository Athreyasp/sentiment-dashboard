import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Zap, Activity, Target, ArrowUpRight, RefreshCw } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useExtendedStockData } from '@/hooks/useExtendedStockData'

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  trend: 'up' | 'down'
  sector: string
  marketCap?: number
  isNifty50: boolean
}

export function EssentialIndianStocks() {
  const [loadingPrediction, setLoadingPrediction] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Record<string, any>>({})
  const { toast } = useToast()
  const { allStocks, loading, error, refreshData } = useExtendedStockData()

  // Essential Indian stock symbols to focus on
  const essentialSymbols = [
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 
    'HINDUNILVR', 'LT', 'BHARTIARTL'
  ]

  // Filter and format essential stocks from live data
  const essentialStocks: StockData[] = essentialSymbols
    .map(symbol => {
      const liveStock = allStocks.find(stock => stock.symbol === symbol)
      if (!liveStock) return null

      return {
        symbol: liveStock.symbol,
        name: liveStock.name,
        price: liveStock.price,
        change: liveStock.change,
        changePercent: liveStock.changePercent,
        trend: liveStock.change >= 0 ? 'up' as const : 'down' as const,
        sector: liveStock.sector || 'General',
        marketCap: liveStock.marketCap,
        isNifty50: true
      }
    })
    .filter((stock) => stock !== null) as StockData[]

  const handlePredictStock = async (stock: StockData) => {
    setLoadingPrediction(stock.symbol)
    
    try {
      const { data, error } = await supabase.functions.invoke('stock-analysis', {
        body: {
          symbol: `${stock.symbol}.NS`,
          newsHeadline: `${stock.name} market analysis and prediction for Indian stock market`
        }
      })

      if (error) throw error

      setPredictions(prev => ({
        ...prev,
        [stock.symbol]: data
      }))

      toast({
        title: "🎯 Prediction Generated",
        description: `AI analysis completed for ${stock.name}`,
      })
    } catch (err) {
      console.error('Prediction error:', err)
      toast({
        title: "⚠️ Prediction Failed",
        description: `Could not generate prediction for ${stock.name}`,
        variant: "destructive"
      })
    } finally {
      setLoadingPrediction(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A'
    
    if (marketCap >= 1e12) {
      return `₹${(marketCap / 1e12).toFixed(1)}L Cr`
    } else if (marketCap >= 1e9) {
      return `₹${(marketCap / 1e9).toFixed(1)}K Cr`
    }
    return `₹${(marketCap / 1e7).toFixed(1)} Cr`
  }

  const getSectorColor = (sector: string) => {
    const colors = {
      'Banking': 'from-pixel-blue/20 to-pixel-cyan/20 border-pixel-blue/30',
      'IT Services': 'from-pixel-green/20 to-pixel-cyan/20 border-pixel-green/30',
      'Oil & Gas': 'from-pixel-orange/20 to-pixel-pink/20 border-pixel-orange/30',
      'FMCG': 'from-pixel-purple/20 to-pixel-pink/20 border-pixel-purple/30',
      'Construction': 'from-pixel-cyan/20 to-pixel-blue/20 border-pixel-cyan/30',
      'Telecom': 'from-pixel-pink/20 to-pixel-purple/20 border-pixel-pink/30'
    }
    return colors[sector as keyof typeof colors] || 'from-muted/20 to-muted/30 border-border'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pixel-green to-pixel-cyan bg-clip-text text-transparent">
            Essential Indian Stocks
          </h2>
          <p className="text-muted-foreground">
            Top Nifty 50 stocks with AI-powered predictions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-pixel-green/30 text-pixel-green">
            <Activity className="w-3 h-3 mr-1" />
            Live Market Data
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={loading}
            className="border-pixel-blue/30 text-pixel-blue hover:bg-pixel-blue/10"
          >
            {loading ? (
              <Activity className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && essentialStocks.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-5 h-5 animate-spin" />
            <span>Loading live stock data...</span>
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

      {/* Essential Stocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {essentialStocks.map((stock) => (
          <Card 
            key={stock.symbol} 
            className={`relative overflow-hidden bg-gradient-to-br ${getSectorColor(stock.sector)} backdrop-blur-sm hover:shadow-lg transition-all duration-300 group`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold text-foreground mb-1">
                    {stock.symbol}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {stock.name}
                  </p>
                </div>
                {stock.isNifty50 && (
                  <Badge variant="secondary" className="text-xs bg-pixel-green/10 text-pixel-green border-pixel-green/20">
                    N50
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price & Change */}
              <div className="space-y-2">
                <div className="text-xl font-bold text-foreground">
                  {formatPrice(stock.price)}
                </div>
                <div className={`flex items-center space-x-2 ${
                  stock.trend === 'up' ? 'text-pixel-green' : 'text-pixel-orange'
                }`}>
                  {stock.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm font-medium">
                    {stock.trend === 'up' ? '+' : ''}{stock.change.toFixed(2)}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      stock.trend === 'up' 
                        ? 'bg-pixel-green/10 text-pixel-green border-pixel-green/20' 
                        : 'bg-pixel-orange/10 text-pixel-orange border-pixel-orange/20'
                    }`}
                  >
                    {stock.trend === 'up' ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>

              {/* Stock Details */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Sector:</span>
                  <span className="text-foreground font-medium">{stock.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Cap:</span>
                  <span className="text-foreground font-medium">{formatMarketCap(stock.marketCap)}</span>
                </div>
              </div>

              {/* Prediction Button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full bg-gradient-to-r from-pixel-green/10 to-pixel-cyan/10 border-pixel-green/30 hover:from-pixel-green/20 hover:to-pixel-cyan/20 group-hover:border-pixel-green/50 transition-all duration-300"
                onClick={() => handlePredictStock(stock)}
                disabled={loadingPrediction === stock.symbol}
              >
                {loadingPrediction === stock.symbol ? (
                  <>
                    <Activity className="w-3 h-3 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-3 h-3 mr-2" />
                    AI Predict
                  </>
                )}
              </Button>

              {/* Prediction Result */}
              {predictions[stock.symbol] && (
                <div className="mt-3 p-3 rounded-lg bg-card/60 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-pixel-green" />
                    <span className="text-xs font-medium text-pixel-green">AI Prediction</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {predictions[stock.symbol].prediction && (
                      <p className="line-clamp-2">{predictions[stock.symbol].prediction}</p>
                    )}
                    {predictions[stock.symbol].confidenceScore && (
                      <div className="flex items-center gap-2 mt-2">
                        <span>Confidence:</span>
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-pixel-cyan/10 text-pixel-cyan border-pixel-cyan/20"
                        >
                          {Math.round(predictions[stock.symbol].confidenceScore * 100)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-pixel-green/5 to-pixel-cyan/5 border-pixel-green/20">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-pixel-green mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Bulk Analysis</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get predictions for all essential stocks
            </p>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-pixel-green to-pixel-cyan text-white hover:from-pixel-green/80 hover:to-pixel-cyan/80"
              onClick={() => {
                essentialStocks.forEach(stock => {
                  setTimeout(() => handlePredictStock(stock), Math.random() * 2000)
                })
              }}
              disabled={loadingPrediction !== null}
            >
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Analyze All
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pixel-blue/5 to-pixel-cyan/5 border-pixel-blue/20">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-pixel-blue mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Live Updates</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Real-time price updates every 30 seconds
            </p>
            <Badge variant="outline" className="border-pixel-blue/30 text-pixel-blue">
              <div className="w-2 h-2 bg-pixel-blue rounded-full animate-pulse mr-2"></div>
              Active
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pixel-orange/5 to-pixel-pink/5 border-pixel-orange/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-pixel-orange mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Smart Alerts</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get notified of significant moves
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-pixel-orange/30 text-pixel-orange hover:bg-pixel-orange/10"
            >
              Setup Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}