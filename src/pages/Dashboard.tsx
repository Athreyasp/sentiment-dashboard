import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { NSEStockTable } from '@/components/NSEStockTable'
import { NSEStockSearch } from '@/components/NSEStockSearch'
import { useNSEData } from '@/hooks/useNSEData'
import { IndianFinancialNewsPanel } from '@/components/IndianFinancialNewsPanel'

export default function Dashboard() {
  const { nifty50Stocks, loading, error, searchStock, refreshData } = useNSEData()

  // NSE Market indices data (mock)
  const marketData = [
    {
      name: 'NIFTY 50',
      value: '24,823.65',
      change: '-177.50',
      changePercent: '-0.71%',
      trend: 'down' as const
    },
    {
      name: 'SENSEX',
      value: '81,467.10',
      change: '+245.32',
      changePercent: '+0.30%',
      trend: 'up' as const
    },
    {
      name: 'NIFTY BANK',
      value: '52,314.85',
      change: '+412.75',
      changePercent: '+0.80%',
      trend: 'up' as const
    },
    {
      name: 'INDIA VIX',
      value: '14.25',
      change: '-0.85',
      changePercent: '-5.63%',
      trend: 'down' as const
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            NSE Market Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Live NIFTY 50 stocks with real-time prices and trading volumes
          </p>
        </div>

        <div className="space-y-8">
          {/* Market Indices */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((market, index) => (
              <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    {market.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {market.value}
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      market.trend === 'up' ? 'text-[#00C49F]' : 'text-[#FF4C4C]'
                    }`}>
                      {market.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold">{market.change}</span>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          market.trend === 'up' 
                            ? 'bg-[#00C49F]/15 text-[#00C49F] border-[#00C49F]/30' 
                            : 'bg-[#FF4C4C]/15 text-[#FF4C4C] border-[#FF4C4C]/30'
                        }`}
                      >
                        {market.changePercent}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <NSEStockSearch onSearch={searchStock} />
            <NSEStockTable 
              stocks={nifty50Stocks} 
              loading={loading} 
              error={error} 
              onRefresh={refreshData} 
            />
            <IndianFinancialNewsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}