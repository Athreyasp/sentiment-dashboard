
import { useState } from 'react'
import { TrendingUp, LineChart, Brain, Activity, Plus } from 'lucide-react'
import { SentimentTable } from '@/components/SentimentTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Portfolio() {
  const [tickers, setTickers] = useState<string[]>([])
  const [newTicker, setNewTicker] = useState('')

  const handleAddTicker = () => {
    if (newTicker.trim()) {
      const ticker = newTicker.trim().toUpperCase()
      if (!tickers.includes(ticker)) {
        setTickers(prev => [...prev, ticker])
      }
      setNewTicker('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTicker()
    }
  }

  const handleToggleAlert = (ticker: string) => {
    console.log(`Toggle alert for ${ticker}`)
    // This would typically update the backend
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

      {/* Add Ticker Section */}
      <div className="pixel-card rounded-lg p-6 border">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter stock ticker (e.g., RELIANCE, TCS, INFY)"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleAddTicker} className="pixel-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Ticker
          </Button>
        </div>
      </div>

      <div className="pixel-card rounded-lg border">
        <SentimentTable 
          tickers={tickers}
          onToggleAlert={handleToggleAlert}
        />
      </div>
    </div>
  )
}
