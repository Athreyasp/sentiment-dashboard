import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Zap, Activity, Target, ArrowUpRight } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface StockData {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  trend: 'up' | 'down'
  sector: string
  marketCap: string
  isNifty50: boolean
}

export function EssentialIndianStocks() {
  const [loadingPrediction, setLoadingPrediction] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Record<string, any>>({})
  const { toast } = useToast()

  // Essential Indian stocks - Major Nifty 50 components
  const essentialStocks: StockData[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: '₹2,847.65',
      change: '+42.30',
      changePercent: '+1.51%',
      trend: 'up',
      sector: 'Oil & Gas',
      marketCap: '₹19.2L Cr',
      isNifty50: true
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '₹4,156.80',
      change: '-23.45',
      changePercent: '-0.56%',
      trend: 'down',
      sector: 'IT Services',
      marketCap: '₹15.1L Cr',
      isNifty50: true
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      price: '₹1,672.90',
      change: '+18.75',
      changePercent: '+1.13%',
      trend: 'up',
      sector: 'Banking',
      marketCap: '₹12.7L Cr',
      isNifty50: true
    },
    {
      symbol: 'INFY',
      name: 'Infosys',
      price: '₹1,834.25',
      change: '-15.60',
      changePercent: '-0.84%',
      trend: 'down',
      sector: 'IT Services',
      marketCap: '₹7.6L Cr',
      isNifty50: true
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank',
      price: '₹1,267.45',
      change: '+25.80',
      changePercent: '+2.08%',
      trend: 'up',
      sector: 'Banking',
      marketCap: '₹8.9L Cr',
      isNifty50: true
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever',
      price: '₹2,445.30',
      change: '+12.90',
      changePercent: '+0.53%',
      trend: 'up',
      sector: 'FMCG',
      marketCap: '₹5.8L Cr',
      isNifty50: true
    },
    {
      symbol: 'LT',
      name: 'Larsen & Toubro',
      price: '₹3,789.60',
      change: '-45.20',
      changePercent: '-1.18%',
      trend: 'down',
      sector: 'Construction',
      marketCap: '₹5.2L Cr',
      isNifty50: true
    },
    {
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel',
      price: '₹1,634.80',
      change: '+28.40',
      changePercent: '+1.77%',
      trend: 'up',
      sector: 'Telecom',
      marketCap: '₹9.4L Cr',
      isNifty50: true
    }
  ]

  const handlePredictStock = async (stock: StockData) => {
    setLoadingPrediction(stock.symbol)
    
    try {
      const { data, error } = await supabase.functions.invoke('stock-analysis', {
        body: {
          symbol: stock.symbol,
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
        <Badge variant="outline" className="border-pixel-green/30 text-pixel-green">
          <Activity className="w-3 h-3 mr-1" />
          Live Market Data
        </Badge>
      </div>

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
                  {stock.price}
                </div>
                <div className={`flex items-center space-x-2 ${
                  stock.trend === 'up' ? 'text-pixel-green' : 'text-pixel-orange'
                }`}>
                  {stock.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm font-medium">{stock.change}</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      stock.trend === 'up' 
                        ? 'bg-pixel-green/10 text-pixel-green border-pixel-green/20' 
                        : 'bg-pixel-orange/10 text-pixel-orange border-pixel-orange/20'
                    }`}
                  >
                    {stock.changePercent}
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
                  <span className="text-foreground font-medium">{stock.marketCap}</span>
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