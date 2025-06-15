
import { useState } from 'react'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <PortfolioHeader 
          onUploadCSV={handleUploadCSV}
          onAddTicker={handleAddTicker}
        />

        {(showUpload || tickers.length === 0) && (
          <TickerUpload onTickersAdded={handleTickersAdded} />
        )}

        <SentimentTable 
          tickers={tickers}
          onToggleAlert={handleToggleAlert}
        />
      </div>
    </div>
  )
}
