import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Sparkles, Activity, Globe, Eye, BarChart3, PieChart, Users, Zap, RefreshCw, Bell } from 'lucide-react'
import { IndianFinancialNewsPanel } from '@/components/IndianFinancialNewsPanel'
import { NewsTickerSummary } from '@/components/NewsTickerSummary'
import { LiveMarketIndicator } from '@/components/LiveMarketIndicator'
import { EssentialIndianStocks } from '@/components/EssentialIndianStocks'
import { ComprehensiveIndianStocks } from '@/components/ComprehensiveIndianStocks'
import { EnhancedNewsPanel } from '@/components/EnhancedNewsPanel'
import { MarketIndicesPanel } from '@/components/MarketIndicesPanel'
import { useIndianFinancialNews } from '@/hooks/useIndianFinancialNews'

export default function Dashboard() {
  const { news, loading: newsLoading, fetchIndianFinancialNews } = useIndianFinancialNews()

  const liveStats = [
    { label: 'Live News Updates', value: `${news.length}`, icon: Globe, trend: '+23%', isNews: true },
    { label: 'Market Predictions', value: '24', icon: Eye, trend: '+45%' },
    { label: 'Active Alerts', value: '7', icon: Bell, trend: '+12%' },
    { label: 'Inoreader Feed', value: 'Active', icon: RefreshCw, trend: 'Live', isLive: true }
  ]

  const handleRefreshNews = async () => {
    await fetchIndianFinancialNews()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Clean Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Market Dashboard
            </h1>
            <p className="text-muted-foreground">
              Live insights from Indian stock markets with AI-powered analytics
            </p>
          </div>
          <Button variant="outline" className="font-medium">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Market Indices */}
        <MarketIndicesPanel />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveStats.map((stat, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">News Feed</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Latest updates from Inoreader
              </p>
              <Button 
                onClick={handleRefreshNews}
                variant="outline"
                className="w-full"
                disabled={newsLoading}
              >
                {newsLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Feed Status</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time integration active
              </p>
              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Connected
              </Badge>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Alerts</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure notifications
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Live Market Indicator */}
        <LiveMarketIndicator />

        {/* Comprehensive Indian Stocks - Main Feature */}
        <ComprehensiveIndianStocks />

        {/* Essential Indian Stocks - Featured Picks */}
        <EssentialIndianStocks />

        {/* Enhanced News Panel */}
        <EnhancedNewsPanel />
      </div>
    </div>
  )
}