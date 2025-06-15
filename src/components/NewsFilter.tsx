
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Filter, ChevronDown, X } from 'lucide-react'

interface NewsFilterProps {
  sentimentFilter: string
  tickerFilter: string
  onSentimentChange: (sentiment: string) => void
  onTickerChange: (ticker: string) => void
  availableTickers: string[]
  totalArticles: number
  filteredArticles: number
}

export function NewsFilter({
  sentimentFilter,
  tickerFilter,
  onSentimentChange,
  onTickerChange,
  availableTickers,
  totalArticles,
  filteredArticles
}: NewsFilterProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-[#00C49F]/10 text-[#00C49F] border-[#00C49F]/30'
      case 'negative': return 'bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/30'
      case 'neutral': return 'bg-[#FFCB05]/10 text-[#FFCB05] border-[#FFCB05]/30'
      default: return 'bg-slate-100 text-slate-700 border-slate-300'
    }
  }

  const clearFilters = () => {
    onSentimentChange('All')
    onTickerChange('All')
  }

  const hasActiveFilters = sentimentFilter !== 'All' || tickerFilter !== 'All'

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">Filters</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {filteredArticles} of {totalArticles} articles
          </span>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {/* Sentiment Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <span className="mr-2">💭</span>
              {sentimentFilter}
              <ChevronDown className="w-3 h-3 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
            <DropdownMenuItem onClick={() => onSentimentChange('All')}>
              All Sentiments
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSentimentChange('Positive')}>
              <div className="w-2 h-2 bg-[#00C49F] rounded-full mr-2"></div>
              Positive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSentimentChange('Neutral')}>
              <div className="w-2 h-2 bg-[#FFCB05] rounded-full mr-2"></div>
              Neutral
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSentimentChange('Negative')}>
              <div className="w-2 h-2 bg-[#FF4C4C] rounded-full mr-2"></div>
              Negative
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Ticker Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <span className="mr-2">📈</span>
              {tickerFilter === 'All' ? 'All Stocks' : tickerFilter}
              <ChevronDown className="w-3 h-3 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl max-h-48 overflow-y-auto">
            <DropdownMenuItem onClick={() => onTickerChange('All')}>
              All Stocks
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {availableTickers.slice(0, 15).map(ticker => (
              <DropdownMenuItem key={ticker} onClick={() => onTickerChange(ticker)}>
                <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-2">
                  {ticker}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Active Filter Tags */}
        <div className="flex items-center space-x-2">
          {sentimentFilter !== 'All' && (
            <Badge 
              className={`text-xs px-2 py-1 ${getSentimentColor(sentimentFilter)} cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => onSentimentChange('All')}
            >
              {sentimentFilter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          
          {tickerFilter !== 'All' && (
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onTickerChange('All')}
            >
              {tickerFilter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
