
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '9:00', sentiment: 65, volume: 1200 },
  { time: '10:00', sentiment: 72, volume: 1400 },
  { time: '11:00', sentiment: 68, volume: 1100 },
  { time: '12:00', sentiment: 75, volume: 1600 },
  { time: '13:00', sentiment: 71, volume: 1300 },
  { time: '14:00', sentiment: 78, volume: 1800 },
  { time: '15:00', sentiment: 73, volume: 1500 },
  { time: '16:00', sentiment: 69, volume: 1200 },
]

export function SentimentChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Market Sentiment Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
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
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
