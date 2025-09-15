import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3, Activity } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import type { ExtendedStock } from '@/hooks/useExtendedStockData'

interface StockPrediction {
  symbol: string
  prediction: 'UP' | 'DOWN' | 'STABLE'
  confidence: number
  target_price_change: number
  timeframe: string
  reasoning: string
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
  key_factors: string[]
  recommendation: 'BUY' | 'SELL' | 'HOLD'
  current_price?: number
  predicted_price?: number
  news_impact?: number
  technical_factors?: string[]
  rsi?: number
}

interface StockPredictionModalProps {
  isOpen: boolean
  onClose: () => void
  stock: ExtendedStock
  newsHeadline?: string
}

export function StockPredictionModal({ isOpen, onClose, stock, newsHeadline }: StockPredictionModalProps) {
  const [prediction, setPrediction] = useState<StockPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const analyzStock = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('stock-analysis', {
        body: {
          symbol: `${stock.symbol}.NS`,
          news_headline: newsHeadline || `${stock.name} market analysis and prediction`,
          sentiment: 'neutral'
        }
      })

      if (error) throw error

      console.log('Stock analysis response:', data)

      // Handle the response from the Gemini-enhanced analysis
      const responseData = data.data || data
      
      // Format the prediction data to match our interface
      const formattedPrediction: StockPrediction = {
        symbol: stock.symbol,
        prediction: responseData.predicted_change > 0 ? 'UP' : responseData.predicted_change < 0 ? 'DOWN' : 'STABLE',
        confidence: Math.round(responseData.confidence || 75),
        target_price_change: responseData.predicted_change || 0,
        timeframe: '1-3 days',
        reasoning: responseData.reasoning || 'AI analysis based on technical indicators and news sentiment',
        risk_level: responseData.confidence > 80 ? 'LOW' : responseData.confidence > 65 ? 'MEDIUM' : 'HIGH',
        key_factors: responseData.factors || ['Technical analysis', 'News sentiment', 'Market conditions'],
        recommendation: responseData.recommendation || 'HOLD',
        current_price: stock.price,
        predicted_price: responseData.predicted_price || stock.price,
        news_impact: responseData.sentiment_impact || 0,
        technical_factors: responseData.factors?.slice(0, 3) || [
          `Technical: Price analysis`,
          `RSI: Market momentum indicators`,
          `Sentiment: News impact assessment`
        ],
        rsi: 50 // Default RSI if not provided
      }

      setPrediction(formattedPrediction)
      
      toast({
        title: "🎯 AI Analysis Complete",
        description: `Gemini AI analyzed ${stock.name} with ${formattedPrediction.confidence}% confidence`,
      })
    } catch (err) {
      console.error('Prediction error:', err)
      toast({
        title: "⚠️ Analysis Failed",
        description: "Could not generate prediction. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-pixel-green'
      case 'negative': return 'text-red-400'
      default: return 'text-pixel-orange'
    }
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'bg-pixel-green/20 text-pixel-green border-pixel-green/30'
      case 'SELL': return 'bg-red-400/20 text-red-400 border-red-400/30'
      default: return 'bg-pixel-orange/20 text-pixel-orange border-pixel-orange/30'
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-black/95 border-2 border-primary/30">
        <DialogHeader className="space-y-6 pb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-pixel text-primary tracking-wider">
                AI STOCK PREDICTION ANALYSIS
              </h2>
              <p className="text-muted-foreground font-space text-sm mt-1">
                Educational predictions based on news sentiment and technical analysis
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* News Analysis Section */}
          {newsHeadline && (
            <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-4 font-pixel tracking-wider">
                ANALYZING NEWS IMPACT
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <p className="text-foreground text-sm leading-relaxed">{newsHeadline}</p>
              </div>
              <Badge className="bg-accent/20 text-accent border-accent/30 font-pixel text-sm px-3 py-1">
                NEUTRAL SENTIMENT
              </Badge>
            </div>
          )}

          {/* Main Prediction Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stock Info - Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-card/50 rounded-lg p-6 border border-primary/20 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <span className="text-xl font-bold text-primary font-pixel">₹</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-pixel text-primary tracking-wider">
                      {stock.symbol}.NS
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Current: <span className="font-semibold">{formatPrice(stock.price)}</span>
                    </p>
                  </div>
                </div>

                {prediction && (
                  <div className="mt-8">
                    <Badge className={`${getRecommendationColor(prediction.recommendation)} font-pixel text-base px-4 py-2 tracking-wider`}>
                      {prediction.recommendation}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Prediction Metrics - Right Side */}
            {prediction && (
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2 font-pixel tracking-widest">PREDICTED PRICE</p>
                    <p className="text-3xl font-bold text-primary font-pixel">
                      {formatPrice(prediction.predicted_price || stock.price)}
                    </p>
                  </div>
                  
                  <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2 font-pixel tracking-widest">EXPECTED CHANGE</p>
                    <div className="flex items-center space-x-2">
                      {prediction.target_price_change >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-primary" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                      <span className={`text-2xl font-bold font-pixel ${
                        prediction.target_price_change >= 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {prediction.target_price_change >= 0 ? '+' : ''}{prediction.target_price_change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2 font-pixel tracking-widest">CONFIDENCE</p>
                    <p className="text-3xl font-bold text-primary font-pixel">{prediction.confidence}%</p>
                  </div>
                  
                  <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2 font-pixel tracking-widest">NEWS IMPACT</p>
                    <p className={`text-2xl font-bold font-pixel ${
                      prediction.news_impact && prediction.news_impact >= 0 ? 'text-primary' : 'text-destructive'
                    }`}>
                      {prediction.news_impact && prediction.news_impact >= 0 ? '+' : ''}{prediction.news_impact?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Factors */}
          {prediction && (
            <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-6 font-pixel tracking-wider flex items-center">
                <Target className="w-5 h-5 mr-2" />
                ANALYSIS FACTORS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {prediction.technical_factors?.map((factor, index) => (
                  <div key={index} className="bg-muted/20 rounded-lg p-4 border border-primary/10">
                    <p className="text-sm font-semibold text-primary mb-1 font-pixel">
                      {factor.includes(':') ? factor.split(':')[0] : 'Technical'}:
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {factor.includes(':') ? factor.split(':')[1]?.trim() : factor}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center py-4">
            {!prediction ? (
              <Button
                onClick={analyzStock}
                disabled={loading}
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-pixel text-base px-8 py-6 h-auto tracking-wider"
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    GENERATE AI PREDICTION
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setPrediction(null)}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 font-pixel tracking-wider"
              >
                ANALYZE AGAIN
              </Button>
            )}
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-accent font-pixel mb-2 tracking-wider">EDUCATIONAL DISCLAIMER</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These predictions are for educational purposes only and should not be considered as financial advice. 
                  Stock market investments are subject to market risks. Always consult with a qualified financial advisor 
                  before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}