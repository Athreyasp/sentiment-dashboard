import { LiveMarketIndicator } from '@/components/LiveMarketIndicator'
import { EnhancedNewsPanel } from '@/components/EnhancedNewsPanel'

export default function News() {
  return (
    <div className="space-y-6">
      <LiveMarketIndicator />
      <EnhancedNewsPanel />
    </div>
  )
}
