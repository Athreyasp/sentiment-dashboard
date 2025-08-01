import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, Clock } from 'lucide-react'
import { NSEStock } from '@/hooks/useNSEData'

interface NSEStockSearchProps {
  onSearch: (query: string) => Promise<NSEStock | null>
}

export function NSEStockSearch({ onSearch }: NSEStockSearchProps) {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<NSEStock | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const result = await onSearch(query.trim())
      setSearchResult(result)
      
      if (!result) {
        setError('Stock not found. Please check the symbol or company name.')
      }
    } catch (err) {
      setError('Failed to search for stock. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) {
      return `${(volume / 10000000).toFixed(1)} Crore`
    } else if (volume >= 100000) {
      return `${(volume / 100000).toFixed(1)} Lakh`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)} Thousand`
    }
    return volume.toLocaleString('en-IN')
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Search className="w-6 h-6 mr-2" />
          Search NSE Stocks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter stock symbol (e.g., RELIANCE) or company name (e.g., Reliance Industries)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {searchResult && (
          <Card className="bg-slate-50 dark:bg-slate-700/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {searchResult.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="font-mono">
                        {searchResult.symbol}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3 mr-1" />
                        Updated: {new Date(searchResult.lastUpdated).toLocaleTimeString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-50" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Live Price
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {formatPrice(searchResult.price)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Trading Volume
                    </p>
                    <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
                      {formatVolume(searchResult.volume)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">💡 <strong>Search Tips:</strong></p>
          <ul className="space-y-1 ml-4">
            <li>• Use stock symbols like RELIANCE, TCS, INFY</li>
            <li>• Search by company name like "Tata Consultancy Services"</li>
            <li>• All NSE-listed stocks are searchable</li>
            <li>• Data refreshes every 30 seconds during market hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}