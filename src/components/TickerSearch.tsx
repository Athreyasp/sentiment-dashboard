
import { useState, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useIsMobile } from '@/hooks/use-mobile'

interface TickerSearchProps {
  onTickerSelect: (ticker: string) => void
  currentTicker: string
  isLoading?: boolean
}

const popularTickers = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.' },
  { symbol: 'SPOT', name: 'Spotify Technology SA' },
]

export function TickerSearch({ onTickerSelect, currentTicker, isLoading }: TickerSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const isMobile = useIsMobile()

  const filteredTickers = popularTickers.filter(ticker =>
    ticker.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
    ticker.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleTickerSelect = (ticker: string) => {
    onTickerSelect(ticker)
    setOpen(false)
    setSearchValue('')
  }

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 hover:border-[#00C49F] focus:border-[#00C49F] transition-all duration-200 text-left"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
              <span className="truncate">
                {currentTicker ? (
                  <span className="font-mono font-semibold text-sm sm:text-base">{currentTicker}</span>
                ) : (
                  <span className="text-slate-500 text-xs sm:text-sm">
                    {isMobile ? 'Search ticker...' : 'Search ticker (e.g., AAPL, TSLA)...'}
                  </span>
                )}
              </span>
            </div>
            <ChevronDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 shadow-xl" align="start">
          <Command>
            <CommandInput 
              placeholder={isMobile ? "Search tickers..." : "Search tickers..."} 
              value={searchValue}
              onValueChange={setSearchValue}
              className="border-none focus:ring-0 text-sm"
            />
            <CommandList className="max-h-[300px] sm:max-h-[400px]">
              <CommandEmpty>
                <div className="p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2">
                    No ticker found for "{searchValue}"
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Try searching for popular stocks like AAPL, TSLA, or MSFT
                  </p>
                </div>
              </CommandEmpty>
              <CommandGroup heading="Popular Tickers">
                {filteredTickers.map((ticker) => (
                  <CommandItem
                    key={ticker.symbol}
                    value={ticker.symbol}
                    onSelect={() => handleTickerSelect(ticker.symbol)}
                    className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 py-2 sm:py-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <span className="font-mono font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded flex-shrink-0">
                          {ticker.symbol}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 truncate">
                          {isMobile ? ticker.name.split(' ')[0] + (ticker.name.split(' ').length > 1 ? '...' : '') : ticker.name}
                        </span>
                      </div>
                      {currentTicker === ticker.symbol && (
                        <div className="w-2 h-2 bg-[#00C49F] rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
