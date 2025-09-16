
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TickerAnalysisModal } from './TickerAnalysisModal'

interface SearchResult {
  ticker: string
  company: string
  sentiment: {
    score: number
    label: 'positive' | 'negative' | 'neutral'
  }
  news: Array<{
    headline: string
    sentiment: 'positive' | 'negative' | 'neutral'
    source: string
    time: string
    url?: string
  }>
}

interface SearchResultsProps {
  searchTerm: string
  isVisible: boolean
  onClose: () => void
}

export function SearchResults({ searchTerm, isVisible, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchTerm.length >= 2) {
      fetchSearchResults(searchTerm)
    } else {
      setResults([])
    }
  }, [searchTerm])

  const fetchSearchResults = async (query: string) => {
    setLoading(true)
    try {
      // Search for Indian stocks based on query
      const indianStocks = getIndianStocksList()
      const filteredResults = indianStocks
        .filter(stock => 
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map(stock => ({
          ticker: stock.symbol,
          company: stock.name,
          sentiment: {
            score: 0,
            label: 'neutral' as const
          },
          news: [{
            headline: `${stock.name} - Latest market updates`,
            sentiment: 'neutral' as const,
            source: 'Live Data',
            time: 'Live'
          }]
        }))
      
      setResults(filteredResults)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getIndianStocksList = () => {
    return [
      { symbol: 'RELIANCE', name: 'Reliance Industries Limited' },
      { symbol: 'TCS', name: 'Tata Consultancy Services' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Limited' },
      { symbol: 'INFY', name: 'Infosys Limited' },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Limited' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Limited' },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited' },
      { symbol: 'LT', name: 'Larsen & Toubro Limited' },
      { symbol: 'SBIN', name: 'State Bank of India' },
      { symbol: 'WIPRO', name: 'Wipro Limited' },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Limited' },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Limited' },
      { symbol: 'ASIANPAINT', name: 'Asian Paints Limited' },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited' },
      { symbol: 'ADANIPORTS', name: 'Adani Ports and SEZ Limited' },
      { symbol: 'NIFTY50', name: 'NIFTY 50 Index' },
      { symbol: 'SENSEX', name: 'BSE SENSEX Index' },
      { symbol: 'BANKNIFTY', name: 'NIFTY BANK Index' }
    ]
  }

  const getSentimentBadge = (sentiment: 'positive' | 'negative' | 'neutral') => {
    const colors = {
      positive: 'bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30',
      negative: 'bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30',
      neutral: 'bg-[#FFCB05]/15 text-[#FFCB05] border-[#FFCB05]/30'
    }
    
    return (
      <Badge className={`${colors[sentiment]} hover:opacity-80 transition-all duration-200 font-medium px-2 py-1 text-xs`}>
        <div className={`w-2 h-2 rounded-full mr-1.5 ${
          sentiment === 'positive' ? 'bg-[#00C49F]' : 
          sentiment === 'negative' ? 'bg-[#FF4C4C]' : 'bg-[#FFCB05]'
        }`}></div>
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </Badge>
    )
  }

  const handleResultClick = (ticker: string) => {
    navigate(`/dashboard/ticker`)
    onClose()
    // Here you could also set the selected ticker for the ticker page
  }

  const handleViewAnalysis = (ticker: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTicker(ticker)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedTicker(null)
  }

  if (!isVisible || searchTerm.length < 2) return null

  return (
    <>
      <div className="absolute top-full left-0 right-0 z-50 mt-2">
        <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 shadow-xl max-h-[500px] overflow-y-auto">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-all duration-200"
                    onClick={() => handleResultClick(result.ticker)}
                  >
                    {/* Header with ticker and sentiment */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                            {result.ticker}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {result.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSentimentBadge(result.sentiment.label)}
                        <div className={`flex items-center text-sm ${
                          result.sentiment.score >= 0 ? 'text-[#00C49F]' : 'text-[#FF4C4C]'
                        }`}>
                          {result.sentiment.score >= 0 ? 
                            <TrendingUp className="w-4 h-4 mr-1" /> : 
                            <TrendingDown className="w-4 h-4 mr-1" />
                          }
                          {result.sentiment.score >= 0 ? '+' : ''}{result.sentiment.score.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Top 3 News Headlines */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Latest News
                      </h4>
                      {result.news.slice(0, 3).map((news, newsIndex) => (
                        <div key={newsIndex} className="flex items-start justify-between group">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                              {news.headline}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-slate-500 dark:text-slate-400">{news.source}</span>
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">{news.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                            {getSentimentBadge(news.sentiment)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* View More Button */}
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        onClick={(e) => handleViewAnalysis(result.ticker, e)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Analysis
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  No results found for "{searchTerm}"
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Try searching for tickers like AAPL, TSLA, or company names
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analysis Modal */}
      {selectedTicker && (
        <TickerAnalysisModal
          isOpen={showModal}
          onClose={handleCloseModal}
          ticker={selectedTicker}
        />
      )}
    </>
  )
}
