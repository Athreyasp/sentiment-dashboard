
import { Button } from '@/components/ui/button'
import { Upload, Plus, TrendingUp } from 'lucide-react'

interface PortfolioHeaderProps {
  onUploadCSV: () => void
  onAddTicker: () => void
}

export function PortfolioHeader({ onUploadCSV, onAddTicker }: PortfolioHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00C49F]/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">
                My Portfolio Sentiment
              </h1>
              <p className="text-xl text-white/90">
                Track how the market feels about your stocks in real time
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#00C49F] rounded-full animate-pulse"></div>
                  <span className="text-sm">Live AI Analysis</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <span className="text-sm">Real-time Updates</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="secondary" 
              className="h-12 px-6 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              onClick={onUploadCSV}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload CSV
            </Button>
            <Button 
              className="h-12 px-6 bg-white text-indigo-600 hover:bg-white/90 font-semibold"
              onClick={onAddTicker}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Ticker
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
