import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, TrendingUp, TrendingDown, Search, Filter, Building2, MapPin } from 'lucide-react'
import { useExtendedStockData, ExtendedStock } from '@/hooks/useExtendedStockData'

interface AdvancedStockTableProps {
  onStockSelect?: (stock: ExtendedStock) => void
}

export function AdvancedStockTable({ onStockSelect }: AdvancedStockTableProps) {
  const { allStocks, loading, error, refreshData, filterByExchange, filterBySector } = useExtendedStockData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExchange, setSelectedExchange] = useState<'All' | 'NSE' | 'BSE'>('All')
  const [selectedSector, setSelectedSector] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Get unique sectors
  const availableSectors = ['All', ...new Set(allStocks.map(stock => stock.sector).filter(Boolean))]

  // Filter and search stocks
  const filteredStocks = allStocks.filter(stock => {
    const matchesSearch = searchQuery === '' || 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesExchange = selectedExchange === 'All' || stock.exchange === selectedExchange
    const matchesSector = selectedSector === 'All' || stock.sector === selectedSector
    
    return matchesSearch && matchesExchange && matchesSector
  })

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let aValue: any = a[sortBy]
    let bValue: any = b[sortBy]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const handleSort = (column: 'name' | 'price' | 'change' | 'volume') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`
  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${changePercent.toFixed(2)}% (${sign}₹${change.toFixed(2)})`
  }
  
  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toString()
  }

  if (error) {
    return (
      <Card className="pixel-card border-red-400/30 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-400/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2 font-pixel">ERROR LOADING STOCK DATA</h3>
              <p className="text-red-300 font-space mb-3">{error}</p>
              <Button onClick={refreshData} className="pixel-button" variant="default">
                <RefreshCw className="w-4 h-4 mr-2" />
                RETRY
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="pixel-card shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <CardTitle className="flex items-center space-x-3 text-2xl font-pixel">
            <div className="p-2 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg">
              <Building2 className="w-6 h-6 text-pixel-green" />
            </div>
            <span className="gradient-text">INDIAN STOCK MARKET</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="font-pixel text-xs">
              {filteredStocks.length} / {allStocks.length} stocks
            </Badge>
            <Button
              onClick={refreshData}
              disabled={loading}
              variant="outline"
              size="sm"
              className="pixel-button"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              REFRESH
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedExchange} onValueChange={(value: 'All' | 'NSE' | 'BSE') => setSelectedExchange(value)}>
            <SelectTrigger>
              <MapPin className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Exchanges</SelectItem>
              <SelectItem value="NSE">NSE</SelectItem>
              <SelectItem value="BSE">BSE</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              {availableSectors.map(sector => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={() => {
              setSearchQuery('')
              setSelectedExchange('All')
              setSelectedSector('All')
            }}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>

        {/* Stock Table */}
        {loading ? (
          <div className="p-12 text-center space-y-4">
            <div className="p-4 bg-pixel-green/10 rounded-lg w-16 h-16 mx-auto flex items-center justify-center animate-pixel-glow">
              <RefreshCw className="w-8 h-8 animate-spin text-pixel-green" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground font-pixel">LOADING STOCK DATA</h3>
              <p className="text-muted-foreground font-space">Fetching live prices from NSE & BSE...</p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-pixel-green/20">
                  <TableHead 
                    className="cursor-pointer hover:text-pixel-green transition-colors font-pixel"
                    onClick={() => handleSort('name')}
                  >
                    STOCK {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>EXCHANGE</TableHead>
                  <TableHead>SECTOR</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-pixel-green transition-colors font-pixel text-right"
                    onClick={() => handleSort('price')}
                  >
                    PRICE {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-pixel-green transition-colors font-pixel text-right"
                    onClick={() => handleSort('change')}
                  >
                    CHANGE {sortBy === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-pixel-green transition-colors font-pixel text-right"
                    onClick={() => handleSort('volume')}
                  >
                    VOLUME {sortBy === 'volume' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center p-8">
                      <div className="space-y-2">
                        <p className="text-lg font-pixel text-muted-foreground">NO STOCKS FOUND</p>
                        <p className="text-sm text-muted-foreground font-space">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedStocks.map((stock) => (
                    <TableRow 
                      key={`${stock.symbol}-${stock.exchange}`}
                      className="hover:bg-pixel-green/5 border-b border-pixel-green/10 cursor-pointer transition-all duration-200"
                      onClick={() => onStockSelect?.(stock)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-semibold font-pixel text-sm">{stock.symbol}</div>
                          <div className="text-xs text-muted-foreground font-space truncate max-w-[200px]">
                            {stock.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`font-pixel text-xs ${
                            stock.exchange === 'NSE' 
                              ? 'bg-blue-50 text-blue-700 border-blue-200' 
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {stock.exchange}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {stock.sector && (
                          <Badge variant="secondary" className="font-pixel text-xs">
                            {stock.sector}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-space font-semibold">
                        {formatPrice(stock.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`flex items-center justify-end space-x-1 ${
                          stock.change >= 0 ? 'text-pixel-green' : 'text-red-400'
                        }`}>
                          {stock.change >= 0 ? 
                            <TrendingUp className="w-3 h-3" /> : 
                            <TrendingDown className="w-3 h-3" />
                          }
                          <span className="font-space text-xs">
                            {formatChange(stock.change, stock.changePercent)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-space text-xs">
                        {formatVolume(stock.volume)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="pixel-button text-xs h-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            onStockSelect?.(stock)
                          }}
                        >
                          ANALYZE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}