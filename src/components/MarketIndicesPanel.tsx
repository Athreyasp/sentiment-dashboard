import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react'
import { useMarketIndices } from '@/hooks/useMarketIndices'
import { formatDistanceToNow } from 'date-fns'

export function MarketIndicesPanel() {
  const { indices, loading, error, refreshData } = useMarketIndices()

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return price.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }
    return price.toFixed(2)
  }

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  const formatChangePercent = (changePercent: number): string => {
    const sign = changePercent >= 0 ? '+' : ''
    return `${sign}${changePercent.toFixed(2)}%`
  }

  const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-600 bg-green-50 border-green-200'
    if (change < 0) return 'text-red-600 bg-red-50 border-red-200'
    return 'text-muted-foreground bg-muted border-border'
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  if (loading && indices.length === 0) {
    return (
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Market Indices
            <div className="animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading market data: {error}</p>
            <Button 
              onClick={refreshData} 
              variant="outline" 
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Market Indices</CardTitle>
          <div className="flex items-center gap-2">
            {indices.length > 0 && indices[0].lastUpdated && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>
                  {formatDistanceToNow(new Date(indices[0].lastUpdated), { addSuffix: true })}
                </span>
              </div>
            )}
            <Button 
              onClick={refreshData} 
              variant="ghost" 
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {indices.map((index) => (
            <div
              key={index.symbol}
              className="p-4 rounded-lg border border-border hover:shadow-sm transition-all bg-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {index.icon && (
                    <span className="text-lg">{index.icon}</span>
                  )}
                  <h3 className="font-semibold text-sm">{index.name}</h3>
                </div>
                {getTrendIcon(index.change)}
              </div>
              
              <div className="mb-3">
                <p className="text-2xl font-bold">
                  {formatPrice(index.price)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {index.currency}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-medium ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatChange(index.change)}
                  </span>
                </div>
                <Badge className={getChangeColor(index.change)}>
                  {formatChangePercent(index.changePercent)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}