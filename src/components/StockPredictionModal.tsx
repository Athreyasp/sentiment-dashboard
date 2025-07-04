
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Target, Brain, AlertTriangle, Zap, IndianRupee } from 'lucide-react'
import { useWatchlist, StockPrediction } from '@/hooks/useWatchlist'

interface StockPredictionModalProps {
  isOpen: boolean
  onClose: () => void
  newsHeadline: string
  sentiment: string | null
  potentialStocks: string[]
}

export function StockPredictionModal({ 
  isOpen, 
  onClose, 
  newsHeadline, 
  sentiment,
  potentialStocks 
}: StockPredictionModalProps) {
  const [predictions, setPredictions] = useState<StockPrediction[]>([])
  const [loading, setLoading] = useState(false)
  const { getStockPrediction } = useWatchlist()

  useEffect(() => {
    if (isOpen && potentialStocks.length > 0) {
      fetchPredictions()
    }
  }, [isOpen, potentialStocks, newsHeadline])

  const fetchPredictions = async () => {
    setLoading(true)
    try {
      const predictionPromises = potentialStocks.slice(0, 5).map(symbol => 
        getStockPrediction(symbol, newsHeadline, sentiment || 'neutral')
      )
      
      const results = await Promise.all(predictionPromises)
      const validPredictions = results.filter(p => p !== null) as StockPrediction[]
      setPredictions(validPredictions)
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'text-pixel-green bg-pixel-green/10 border-pixel-green/30'
      case 'SELL': return 'text-red-400 bg-red-400/10 border-red-400/30'
      default: return 'text-pixel-orange bg-pixel-orange/10 border-pixel-orange/30'
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-pixel-green'
    if (change < 0) return 'text-red-400'
    return 'text-pixel-orange'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto pixel-card border-pixel-green/30">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-3 text-xl font-pixel gradient-text">
            <div className="p-2 bg-pixel-green/20 rounded-lg pixel-glow">
              <Brain className="w-6 h-6 text-pixel-green" />
            </div>
            <div>
              <span>AI STOCK PREDICTION ANALYSIS</span>
              <p className="text-sm text-muted-foreground font-space mt-1">
                Educational predictions based on news sentiment and technical analysis
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* News Context */}
        <Card className="news-card border-pixel-cyan/30 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-pixel text-pixel-cyan">ANALYZING NEWS IMPACT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground font-space leading-relaxed">{newsHeadline}</p>
            <div className="flex items-center space-x-2 mt-3">
              <Badge className={`font-pixel text-xs ${
                sentiment === 'positive' ? 'text-pixel-green bg-pixel-green/15 border-pixel-green/30' :
                sentiment === 'negative' ? 'text-red-400 bg-red-400/15 border-red-400/30' :
                'text-pixel-orange bg-pixel-orange/15 border-pixel-orange/30'
              }`}>
                {sentiment?.toUpperCase() || 'NEUTRAL'} SENTIMENT
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Predictions */}
        {loading ? (
          <div className="text-center py-12">
            <div className="p-4 bg-pixel-green/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center animate-pixel-glow mb-4">
              <Brain className="w-8 h-8 animate-spin text-pixel-green" />
            </div>
            <p className="text-pixel-green font-pixel">ANALYZING STOCK IMPACT...</p>
          </div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-pixel-orange mx-auto mb-4" />
            <p className="text-pixel-orange font-pixel">NO PREDICTIONS AVAILABLE</p>
            <p className="text-sm text-muted-foreground font-space mt-2">
              Unable to generate predictions for the selected stocks
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <Card 
                key={prediction.symbol} 
                className="stock-card border hover:pixel-glow-cyan transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stock Info */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-pixel-cyan/20 rounded-lg">
                          <IndianRupee className="w-5 h-5 text-pixel-cyan" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg font-pixel text-foreground">
                            {prediction.symbol}
                          </h3>
                          <p className="text-sm text-muted-foreground font-space">
                            Current: ₹{prediction.current_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <Badge className={`${getRecommendationColor(prediction.recommendation)} font-pixel px-3 py-1`}>
                        <Target className="w-3 h-3 mr-1" />
                        {prediction.recommendation}
                      </Badge>
                    </div>

                    {/* Prediction Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-pixel">PREDICTED PRICE</span>
                        <span className="font-bold font-space">₹{prediction.predicted_price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-pixel">EXPECTED CHANGE</span>
                        <div className={`flex items-center space-x-1 font-bold font-space ${getChangeColor(prediction.predicted_change)}`}>
                          {prediction.predicted_change > 0 ? 
                            <TrendingUp className="w-4 h-4" /> : 
                            <TrendingDown className="w-4 h-4" />
                          }
                          <span>{prediction.predicted_change >= 0 ? '+' : ''}{prediction.predicted_change.toFixed(2)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-pixel">CONFIDENCE</span>
                        <span className="font-bold font-space text-pixel-green">{prediction.confidence.toFixed(1)}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-pixel">NEWS IMPACT</span>
                        <span className={`font-bold font-space ${getChangeColor(prediction.sentiment_impact)}`}>
                          {prediction.sentiment_impact >= 0 ? '+' : ''}{prediction.sentiment_impact.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Analysis Factors */}
                    <div>
                      <h4 className="text-sm font-pixel text-muted-foreground mb-2">ANALYSIS FACTORS</h4>
                      <div className="space-y-1">
                        {prediction.factors.slice(0, 3).map((factor, i) => (
                          <div key={i} className="text-xs text-muted-foreground font-space p-2 bg-secondary/50 rounded">
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <Card className="bg-pixel-orange/5 border-pixel-orange/30 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-pixel-orange mt-0.5" />
              <div>
                <p className="text-sm font-pixel text-pixel-orange font-semibold mb-1">EDUCATIONAL DISCLAIMER</p>
                <p className="text-xs text-muted-foreground font-space leading-relaxed">
                  These predictions are for educational purposes only and should not be considered as financial advice. 
                  Stock market investments are subject to market risks. Always consult with a qualified financial advisor 
                  before making investment decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3 pt-4 border-t border-pixel-green/20">
          <Button onClick={onClose} className="pixel-button">
            <Zap className="w-4 h-4 mr-2" />
            CLOSE ANALYSIS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
