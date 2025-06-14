
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const tickerData = [
  { date: '2024-01-01', sentiment: 45, price: 150.20 },
  { date: '2024-01-02', sentiment: 52, price: 152.15 },
  { date: '2024-01-03', sentiment: 48, price: 149.80 },
  { date: '2024-01-04', sentiment: 67, price: 156.30 },
  { date: '2024-01-05', sentiment: 73, price: 159.45 },
  { date: '2024-01-06', sentiment: 69, price: 157.90 },
  { date: '2024-01-07', sentiment: 75, price: 161.20 },
]

const relatedNews = [
  {
    headline: "Company announces breakthrough in AI technology",
    sentiment: "positive",
    impact: 0.85,
    time: "2 hours ago"
  },
  {
    headline: "Quarterly earnings exceed analyst expectations",
    sentiment: "positive", 
    impact: 0.92,
    time: "1 day ago"
  },
  {
    headline: "Regulatory concerns emerge in European markets",
    sentiment: "negative",
    impact: 0.73,
    time: "2 days ago"
  }
]

export default function TickerInsights() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ticker Insights</h1>
          <p className="text-muted-foreground">
            Deep dive into individual stock sentiment analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search ticker..."
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value.toUpperCase())}
              className="pl-10 w-48"
            />
          </div>
          <Button>Analyze</Button>
        </div>
      </div>

      {/* Ticker Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{selectedTicker}</CardTitle>
              <p className="text-muted-foreground">Apple Inc.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$161.20</div>
              <div className="flex items-center text-positive">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.8% (+$4.40)
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-positive">75</div>
              <div className="text-sm text-muted-foreground">Sentiment Score</div>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold">High</div>
              <div className="text-sm text-muted-foreground">Market Impact</div>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm text-muted-foreground">News Articles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Timeline (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tickerData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Related News */}
      <Card>
        <CardHeader>
          <CardTitle>Related News Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatedNews.map((news, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    className={news.sentiment === 'positive' 
                      ? "bg-positive/10 text-positive border-positive/20" 
                      : "bg-negative/10 text-negative border-negative/20"
                    }
                  >
                    {news.sentiment === 'positive' ? 'Positive' : 'Negative'}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium">Impact: {(news.impact * 100).toFixed(0)}%</div>
                    <div className="text-xs text-muted-foreground">{news.time}</div>
                  </div>
                </div>
                <h4 className="font-medium">{news.headline}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
