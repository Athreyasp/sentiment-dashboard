
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, Eye, Info } from 'lucide-react'

const analysisData = {
  headline: "Federal Reserve hints at potential rate cuts amid inflation concerns",
  sentiment: "neutral",
  confidence: 0.87,
  keywords: [
    { word: "Federal Reserve", impact: 0.92, type: "institution" },
    { word: "rate cuts", impact: 0.89, type: "policy" },
    { word: "inflation", impact: 0.84, type: "economic" },
    { word: "concerns", impact: -0.76, type: "sentiment" },
    { word: "potential", impact: 0.23, type: "uncertainty" }
  ],
  reasoning: "The model identified mixed signals in this headline. While 'rate cuts' typically signals positive market sentiment, the presence of 'concerns' and 'inflation' creates uncertainty. The institutional authority of 'Federal Reserve' increases impact weight."
}

export default function Explainer() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">AI Explainability</h1>
        <p className="text-muted-foreground">
          Understand how our AI models analyze sentiment and make predictions
        </p>
      </div>

      {/* Analysis Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Sentiment Analysis Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Headline */}
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Analyzed Headline
              </Label>
              <div className="p-4 bg-accent rounded-lg">
                <p className="text-lg">{analysisData.headline}</p>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card border rounded-lg">
                <div className="text-2xl font-bold text-neutral">Neutral</div>
                <div className="text-sm text-muted-foreground">Sentiment</div>
              </div>
              <div className="text-center p-4 bg-card border rounded-lg">
                <div className="text-2xl font-bold">{(analysisData.confidence * 100).toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
              <div className="text-center p-4 bg-card border rounded-lg">
                <div className="text-2xl font-bold">High</div>
                <div className="text-sm text-muted-foreground">Market Impact</div>
              </div>
            </div>

            {/* Keyword Analysis */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Attention Map - Key Words & Phrases</span>
              </h3>
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {analysisData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${
                        keyword.impact > 0.8
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : keyword.impact > 0.5
                          ? 'bg-neutral/10 text-neutral border-neutral/20'
                          : keyword.impact > 0
                          ? 'bg-muted text-muted-foreground border-muted'
                          : 'bg-negative/10 text-negative border-negative/20'
                      }`}
                      style={{
                        opacity: 0.6 + (Math.abs(keyword.impact) * 0.4)
                      }}
                    >
                      {keyword.word}
                      <span className="ml-2 text-xs">
                        {(Math.abs(keyword.impact) * 100).toFixed(0)}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="p-4 bg-card border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>Why This Classification?</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysisData.reasoning}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Model</span>
                <span className="font-medium">FinBERT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Training Data</span>
                <span className="font-medium">Financial News Corpus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">Dec 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { feature: 'Keyword Sentiment', weight: 0.35 },
                { feature: 'Context Understanding', weight: 0.28 },
                { feature: 'Market Impact Words', weight: 0.22 },
                { feature: 'Temporal Patterns', weight: 0.15 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.feature}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: `${item.weight * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {(item.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Label({ children, className, ...props }: { children: React.ReactNode, className?: string }) {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props}>
      {children}
    </label>
  )
}
