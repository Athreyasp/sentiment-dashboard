
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, TrendingUp, TrendingDown } from 'lucide-react'

const portfolioData = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    avgPrice: 150.20,
    currentPrice: 161.20,
    sentiment: 75,
    change: 7.32,
    alerts: true
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    shares: 50,
    avgPrice: 330.45,
    currentPrice: 342.10,
    sentiment: 68,
    change: 3.53,
    alerts: false
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 25,
    avgPrice: 2650.30,
    currentPrice: 2680.75,
    sentiment: 72,
    change: 1.15,
    alerts: true
  }
]

export default function Portfolio() {
  const [holdings, setHoldings] = useState(portfolioData)

  const toggleAlert = (ticker: string) => {
    setHoldings(prev => 
      prev.map(holding => 
        holding.ticker === ticker 
          ? { ...holding, alerts: !holding.alerts }
          : holding
      )
    )
  }

  const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0)
  const totalGainLoss = holdings.reduce((sum, holding) => 
    sum + (holding.shares * (holding.currentPrice - holding.avgPrice)), 0
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Manager</h1>
          <p className="text-muted-foreground">
            Track sentiment impact on your holdings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className={`text-sm flex items-center ${totalGainLoss >= 0 ? 'text-positive' : 'text-negative'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              ${Math.abs(totalGainLoss).toLocaleString()} ({((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71.7</div>
            <div className="text-sm text-positive">Positive outlook</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holdings.filter(h => h.alerts).length}</div>
            <div className="text-sm text-muted-foreground">of {holdings.length} holdings</div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.ticker} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-semibold">{holding.ticker}</div>
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </div>
                    <Badge 
                      className={holding.sentiment >= 70 
                        ? "bg-positive/10 text-positive border-positive/20" 
                        : holding.sentiment >= 50
                          ? "bg-neutral/10 text-neutral border-neutral/20"
                          : "bg-negative/10 text-negative border-negative/20"
                      }
                    >
                      Sentiment: {holding.sentiment}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-semibold">${holding.currentPrice.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${holding.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {holding.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{holding.shares} shares</div>
                      <div className="font-medium">
                        ${(holding.shares * holding.currentPrice).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Alerts</span>
                      <Switch
                        checked={holding.alerts}
                        onCheckedChange={() => toggleAlert(holding.ticker)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
