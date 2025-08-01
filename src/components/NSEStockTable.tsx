import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, TrendingUp, ArrowUpDown } from 'lucide-react'
import { NSEStock } from '@/hooks/useNSEData'

interface NSEStockTableProps {
  stocks: NSEStock[]
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export function NSEStockTable({ stocks, loading, error, onRefresh }: NSEStockTableProps) {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'volume'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: 'name' | 'price' | 'volume') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1
    
    switch (sortBy) {
      case 'name':
        return factor * a.name.localeCompare(b.name)
      case 'price':
        return factor * (a.price - b.price)
      case 'volume':
        return factor * (a.volume - b.volume)
      default:
        return 0
    }
  })

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
      return `${(volume / 10000000).toFixed(1)}Cr`
    } else if (volume >= 100000) {
      return `${(volume / 100000).toFixed(1)}L`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  if (error) {
    return (
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="text-red-500 mb-4">
            <TrendingUp className="w-16 h-16 mx-auto opacity-30" />
          </div>
          <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Error Loading Stock Data
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {error}
          </p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">NIFTY 50 Live Data</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-sm">
              {stocks.length} Stocks
            </Badge>
            <Button 
              onClick={onRefresh} 
              variant="outline" 
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading && stocks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Loading NIFTY 50 data...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-700">
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('name')} className="font-semibold">
                    Stock Name <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('price')} className="font-semibold">
                    Live Price <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('volume')} className="font-semibold">
                    Volume <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStocks.map((stock) => (
                <TableRow 
                  key={stock.symbol} 
                  className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {stock.name}
                  </TableCell>
                  <TableCell className="font-mono font-bold text-slate-600 dark:text-slate-300">
                    {stock.symbol}
                  </TableCell>
                  <TableCell className="font-semibold text-lg">
                    {formatPrice(stock.price)}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {formatVolume(stock.volume)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}