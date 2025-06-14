
import { SentimentCard } from '@/components/SentimentCard'
import { SentimentChart } from '@/components/SentimentChart'
import { NewsHighlights } from '@/components/NewsHighlights'

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Market Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time sentiment analysis and market insights
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SentimentCard
          title="Overall Market Sentiment"
          value="73.2"
          change="+2.4%"
          sentiment="positive"
          subtitle="vs yesterday"
        />
        <SentimentCard
          title="Active Alerts"
          value="12"
          change="+3"
          sentiment="neutral"
          subtitle="new today"
        />
        <SentimentCard
          title="Portfolio Health"
          value="8.7/10"
          change="+0.3"
          sentiment="positive"
          subtitle="trending up"
        />
        <SentimentCard
          title="Risk Level"
          value="Moderate"
          change="-5%"
          sentiment="positive"
          subtitle="improving"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SentimentChart />
        <NewsHighlights />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Top Performers Today</h3>
          <div className="space-y-3">
            {['AAPL', 'MSFT', 'GOOGL', 'TSLA'].map((ticker, index) => (
              <div key={ticker} className="flex items-center justify-between">
                <span className="font-medium">{ticker}</span>
                <div className="text-right">
                  <div className="text-positive font-semibold">+{(2.5 + index * 0.5).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Sentiment: {85 + index * 2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Sentiment Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Positive News</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-positive rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Neutral News</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neutral rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Negative News</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-negative rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
