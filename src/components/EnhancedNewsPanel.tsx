import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  AlertCircle,
  RefreshCw,
  BarChart3,
  ExternalLink,
  Zap
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

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
}

interface NewsItem {
  id: string
  headline: string
  content: string
  source: string
  url: string
  published_at: string
  sentiment: string
  prediction: string
  confidence_score: number
  stock_symbols: string[]
  key_factors: string[]
  stock_predictions?: StockPrediction[]
}

interface MarketSummary {
  overall_sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  market_outlook: string
  key_themes: string[]
  sector_impact: Record<string, string>
  nifty_prediction: 'UP' | 'DOWN' | 'STABLE'
  confidence: number
}

export function EnhancedNewsPanel() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  const fetchNewsWithPredictions = async () => {
    setLoading(true)
    try {
      const { data } = await supabase.functions.invoke('get-news-with-predictions', {
        body: { predictions: true, limit: 15 }
      })
      
      if (data?.success) {
        setNews(data.data.news || [])
        setMarketSummary(data.data.market_summary)
      }
    } catch (error) {
      console.error('Error fetching enhanced news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewsWithPredictions()
  }, [])

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'UP': return 'text-green-600 bg-green-50 border-green-200'
      case 'DOWN': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50'
      case 'negative': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-600 bg-green-50'
      case 'HIGH': return 'text-red-600 bg-red-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Market Summary */}
      {marketSummary && (
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Market Summary</CardTitle>
              <Badge className={getPredictionColor(marketSummary.nifty_prediction)}>
                {marketSummary.nifty_prediction} • {marketSummary.confidence}% confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Market Outlook</h4>
                <p className="text-sm">{marketSummary.market_outlook}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Themes</h4>
                <div className="flex flex-wrap gap-1">
                  {marketSummary.key_themes.map((theme, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Sector Impact</h4>
                <div className="space-y-1">
                  {Object.entries(marketSummary.sector_impact).map(([sector, impact]) => (
                    <div key={sector} className="flex justify-between text-sm">
                      <span>{sector}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          impact === 'POSITIVE' ? 'text-green-600' : 
                          impact === 'NEGATIVE' ? 'text-red-600' : 
                          'text-gray-600'
                        }`}
                      >
                        {impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Live Market News</h2>
          <p className="text-muted-foreground">Real-time Indian market news with AI predictions</p>
        </div>
        <Button 
          onClick={fetchNewsWithPredictions}
          disabled={loading}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {news.map((item) => (
          <Card 
            key={item.id} 
            className="border border-border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedNews(item)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold line-clamp-2">
                    {item.headline}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getSentimentColor(item.sentiment)}>
                      {item.sentiment}
                    </Badge>
                    <Badge className={getPredictionColor(item.prediction)}>
                      {item.prediction}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.confidence_score}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.published_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {item.content && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.content}
                </p>
              )}
              
              {/* Stock Symbols */}
              {item.stock_symbols && item.stock_symbols.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-medium text-muted-foreground mb-1">Related Stocks</h5>
                  <div className="flex flex-wrap gap-1">
                    {item.stock_symbols.slice(0, 3).map((symbol) => (
                      <Badge key={symbol} variant="outline" className="text-xs">
                        {symbol}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Predictions Preview */}
              {item.stock_predictions && item.stock_predictions.length > 0 && (
                <div className="border-t pt-3">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">
                    <Zap className="w-3 h-3 inline mr-1" />
                    AI Predictions
                  </h5>
                  <div className="space-y-2">
                    {item.stock_predictions.slice(0, 2).map((pred) => (
                      <div key={pred.symbol} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {pred.symbol}
                          </Badge>
                          <Badge className={getPredictionColor(pred.prediction)}>
                            {pred.prediction}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-muted-foreground" />
                          <span className={`text-xs font-medium ${
                            pred.target_price_change > 0 ? 'text-green-600' : 
                            pred.target_price_change < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {pred.target_price_change > 0 ? '+' : ''}{pred.target_price_change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold mb-3">
                    {selectedNews.headline}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getSentimentColor(selectedNews.sentiment)}>
                      {selectedNews.sentiment}
                    </Badge>
                    <Badge className={getPredictionColor(selectedNews.prediction)}>
                      {selectedNews.prediction}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedNews.confidence_score}% confidence
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedNews(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedNews.content && (
                <div>
                  <h4 className="font-medium mb-2">Content</h4>
                  <p className="text-muted-foreground">{selectedNews.content}</p>
                </div>
              )}

              {/* Detailed Stock Predictions */}
              {selectedNews.stock_predictions && selectedNews.stock_predictions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Stock Predictions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedNews.stock_predictions.map((pred) => (
                      <Card key={pred.symbol} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">{pred.symbol}</Badge>
                            <Badge className={getPredictionColor(pred.prediction)}>
                              {pred.prediction}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Target Change:</span>
                              <span className={`font-medium ${
                                pred.target_price_change > 0 ? 'text-green-600' : 
                                pred.target_price_change < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {pred.target_price_change > 0 ? '+' : ''}{pred.target_price_change.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Timeframe:</span>
                              <span>{pred.timeframe}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Confidence:</span>
                              <span>{pred.confidence}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Level:</span>
                              <Badge className={getRiskColor(pred.risk_level)}>
                                {pred.risk_level}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Recommendation:</span>
                              <Badge variant="outline">{pred.recommendation}</Badge>
                            </div>
                          </div>

                          {pred.reasoning && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-xs text-muted-foreground">
                                {pred.reasoning}
                              </p>
                            </div>
                          )}

                          {pred.key_factors && pred.key_factors.length > 0 && (
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {pred.key_factors.map((factor, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Published: {new Date(selectedNews.published_at).toLocaleString()}
                </div>
                {selectedNews.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedNews.url, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Read Full Article
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground mt-2">Loading enhanced news with predictions...</p>
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No News Available</h3>
          <p className="text-muted-foreground">Check back later for the latest market updates.</p>
        </div>
      )}
    </div>
  )
}