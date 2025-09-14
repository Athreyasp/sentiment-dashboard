import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Sparkles, Activity, Globe, Eye, BarChart3, PieChart, Users, Zap, RefreshCw, Bell } from 'lucide-react'
import { IndianFinancialNewsPanel } from '@/components/IndianFinancialNewsPanel'
import { NewsTickerSummary } from '@/components/NewsTickerSummary'
import { EssentialIndianStocks } from '@/components/EssentialIndianStocks'
import { useIndianFinancialNews } from '@/hooks/useIndianFinancialNews'

export default function Dashboard() {
  const { news, loading: newsLoading, fetchIndianFinancialNews } = useIndianFinancialNews()

  // NSE Market indices data (mock)
  const marketData = [
    {
      name: 'NIFTY 50',
      value: '24,823.65',
      change: '-177.50',
      changePercent: '-0.71%',
      trend: 'down' as const,
      icon: BarChart3
    },
    {
      name: 'SENSEX',
      value: '81,467.10',
      change: '+245.32',
      changePercent: '+0.30%',
      trend: 'up' as const,
      icon: TrendingUp
    },
    {
      name: 'NIFTY BANK',
      value: '52,314.85',
      change: '+412.75',
      changePercent: '+0.80%',
      trend: 'up' as const,
      icon: PieChart
    },
    {
      name: 'INDIA VIX',
      value: '14.25',
      change: '-0.85',
      changePercent: '-5.63%',
      trend: 'down' as const,
      icon: Activity
    }
  ]

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Header with Animation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pixel-green/10 via-pixel-cyan/10 to-pixel-blue/10 p-8 border border-pixel-green/20">
          <div className="absolute inset-0 bg-gradient-to-r from-pixel-green/5 to-transparent animate-pulse"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-pixel-green/20 border border-pixel-green/30">
                  <Sparkles className="w-6 h-6 text-pixel-green animate-pulse" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pixel-green to-pixel-cyan bg-clip-text text-transparent">
                  Market Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Live insights from Indian stock markets with AI-powered analytics
              </p>
            </div>
            <Button className="bg-gradient-to-r from-pixel-green to-pixel-cyan hover:from-pixel-green/80 hover:to-pixel-cyan/80 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-pixel-green/25 transition-all duration-300">
              <Activity className="w-4 h-4 mr-2" />
              Live Analysis
            </Button>
          </div>
        </div>

        {/* Market Indices with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketData.map((market, index) => (
            <Card key={index} className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${market.trend === 'up' ? 'from-pixel-green/5 to-pixel-cyan/5' : 'from-pixel-orange/5 to-pixel-pink/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {market.name}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${market.trend === 'up' ? 'bg-pixel-green/10 border border-pixel-green/20' : 'bg-pixel-orange/10 border border-pixel-orange/20'}`}>
                    <market.icon className={`w-4 h-4 ${market.trend === 'up' ? 'text-pixel-green' : 'text-pixel-orange'}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-foreground">
                    {market.value}
                  </div>
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center space-x-2 ${market.trend === 'up' ? 'text-pixel-green' : 'text-pixel-orange'}`}>
                      {market.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold text-sm">{market.change}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        market.trend === 'up' 
                          ? 'bg-pixel-green/10 text-pixel-green border-pixel-green/20' 
                          : 'bg-pixel-orange/10 text-pixel-orange border-pixel-orange/20'
                      } font-semibold`}
                    >
                      {market.changePercent}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveStats.map((stat, index) => (
            <Card key={index} className={`bg-card/60 backdrop-blur-sm border-border/50 hover:border-pixel-green/30 transition-colors duration-300 ${stat.isNews ? 'border-pixel-cyan/30 hover:border-pixel-cyan/50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold text-foreground ${stat.isLive ? 'animate-pulse' : ''}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`p-2 rounded-lg ${stat.isNews ? 'bg-pixel-cyan/10 border border-pixel-cyan/20' : 'bg-pixel-green/10 border border-pixel-green/20'}`}>
                      <stat.icon className={`w-4 h-4 ${stat.isNews ? 'text-pixel-cyan' : 'text-pixel-green'} ${stat.isLive ? 'animate-spin' : ''}`} />
                    </div>
                    <span className={`text-xs font-medium ${stat.isNews ? 'text-pixel-cyan' : 'text-pixel-green'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* News Control Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-pixel-green/5 to-pixel-cyan/5 border-pixel-green/20">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-8 h-8 text-pixel-green mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Refresh News Feed</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Fetch latest updates from Inoreader
              </p>
              <Button 
                onClick={handleRefreshNews}
                className="bg-gradient-to-r from-pixel-green to-pixel-cyan text-white hover:from-pixel-green/80 hover:to-pixel-cyan/80"
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
                    Refresh Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pixel-blue/5 to-pixel-cyan/5 border-pixel-blue/20">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-pixel-blue mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Live Feed Status</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Inoreader integration active
              </p>
              <Badge variant="outline" className="border-pixel-blue/30 text-pixel-blue">
                <div className="w-2 h-2 bg-pixel-blue rounded-full animate-pulse mr-2"></div>
                Connected
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pixel-orange/5 to-pixel-pink/5 border-pixel-orange/20">
            <CardContent className="p-6 text-center">
              <Bell className="w-8 h-8 text-pixel-orange mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Smart Alerts</h3>
              <p className="text-xs text-muted-foreground mb-4">
                AI-powered market notifications
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-pixel-orange/30 text-pixel-orange hover:bg-pixel-orange/10"
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Essential Indian Stocks - Main Focus */}
        <EssentialIndianStocks />

        {/* Latest News Summary with Enhanced Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pixel-cyan/5 to-pixel-blue/5 rounded-2xl"></div>
          <div className="relative z-10">
            <NewsTickerSummary news={news} loading={newsLoading} />
          </div>
        </div>

        {/* Main Content with Better Spacing */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pixel-green/5 via-transparent to-pixel-cyan/5 rounded-2xl"></div>
          <div className="relative z-10">
            <IndianFinancialNewsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}