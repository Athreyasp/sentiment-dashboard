
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, Eye, Info, Zap, Target, Settings, Lightbulb } from 'lucide-react'

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
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-violet-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-violet-100 dark:border-slate-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-purple-800 dark:from-white dark:via-violet-200 dark:to-purple-200 bg-clip-text text-transparent">
                AI Explainability
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Understand how our AI models analyze sentiment and make predictions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Analysis Example */}
      <Card className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/20 border-2 border-indigo-100 dark:border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span>Live Sentiment Analysis Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Headline */}
            <div>
              <Label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>Analyzed Headline</span>
              </Label>
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600">
                <p className="text-xl leading-relaxed font-medium">{analysisData.headline}</p>
              </div>
            </div>

            {/* Enhanced Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800 shadow-lg">
                <div className="flex justify-center mb-3">
                  <Target className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-neutral mb-1">Neutral</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Sentiment Classification</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
                <div className="flex justify-center mb-3">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold mb-1">{(analysisData.confidence * 100).toFixed(0)}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Model Confidence</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                <div className="flex justify-center mb-3">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold mb-1">High</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Market Impact Score</div>
              </div>
            </div>

            {/* Enhanced Keyword Analysis */}
            <div>
              <h3 className="font-bold text-xl mb-6 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span>Neural Attention Map - Key Words & Phrases</span>
              </h3>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="flex flex-wrap gap-3">
                  {analysisData.keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className={`inline-flex items-center px-4 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                        keyword.impact > 0.8
                          ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700'
                          : keyword.impact > 0.5
                          ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700'
                          : keyword.impact > 0
                          ? 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700'
                          : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700'
                      }`}
                      style={{
                        opacity: 0.7 + (Math.abs(keyword.impact) * 0.3)
                      }}
                    >
                      <span>{keyword.word}</span>
                      <Badge className="ml-2 text-xs">
                        {(Math.abs(keyword.impact) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Reasoning */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 shadow-lg">
              <h4 className="font-bold text-lg mb-4 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <span>AI Reasoning Process</span>
              </h4>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {analysisData.reasoning}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Model Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 border-2 border-blue-100 dark:border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span>Model Architecture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: 'Base Model', value: 'FinBERT', icon: '🤖' },
                { label: 'Training Data', value: 'Financial News Corpus', icon: '📊' },
                { label: 'Accuracy', value: '94.2%', icon: '🎯' },
                { label: 'Last Updated', value: 'Dec 2024', icon: '📅' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-blue-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl border border-white/50 dark:border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
                  </div>
                  <span className="font-bold text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/20 border-2 border-purple-100 dark:border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span>Feature Importance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { feature: 'Keyword Sentiment', weight: 0.35, color: 'from-purple-500 to-purple-600' },
                { feature: 'Context Understanding', weight: 0.28, color: 'from-blue-500 to-blue-600' },
                { feature: 'Market Impact Words', weight: 0.22, color: 'from-green-500 to-green-600' },
                { feature: 'Temporal Patterns', weight: 0.15, color: 'from-orange-500 to-orange-600' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{item.feature}</span>
                    <span className="text-sm font-bold">
                      {(item.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.weight * 100}%` }}
                    ></div>
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
