
import { useState } from 'react'
import { TrendingUp, LineChart, Brain, Activity, Plus } from 'lucide-react'
import { PortfolioHeader } from '@/components/PortfolioHeader'
import { TickerUpload } from '@/components/TickerUpload'
import { SentimentTable } from '@/components/SentimentTable'

export default function Portfolio() {
  const [tickers, setTickers] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState(false)

  const handleTickersAdded = (newTickers: string[]) => {
    setTickers(prev => {
      const uniqueTickers = [...new Set([...prev, ...newTickers])]
      return uniqueTickers
    })
  }

  const handleToggleAlert = (ticker: string) => {
    console.log(`Toggle alert for ${ticker}`)
    // This would typically update the backend
  }

  const handleUploadCSV = () => {
    setShowUpload(true)
  }

  const handleAddTicker = () => {
    setShowUpload(true)
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
                PORTFOLIO TRACKER
              </h1>
              <p className="text-muted-foreground font-space">
                AI-Powered Sentiment Analysis for Your Stock Holdings
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pixel-green rounded-full animate-pixel-pulse"></div>
            <span className="text-sm text-pixel-green font-pixel">ANALYZING</span>
          </div>
        </div>
      </div>

      <PortfolioHeader 
        onUploadCSV={handleUploadCSV}
        onAddTicker={handleAddTicker}
      />

      {(showUpload || tickers.length === 0) && (
        <div className="pixel-card rounded-lg p-6 border">
          <TickerUpload onTickersAdded={handleTickersAdded} />
        </div>
      )}

      <div className="pixel-card rounded-lg border">
        <SentimentTable 
          tickers={tickers}
          onToggleAlert={handleToggleAlert}
        />
      </div>
    </div>
  )
}
