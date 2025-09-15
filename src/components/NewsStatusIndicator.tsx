import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsStatusIndicatorProps {
  isLoading: boolean
  lastUpdated: string | null
  totalNews: number
}

export function NewsStatusIndicator({ isLoading, lastUpdated, totalNews }: NewsStatusIndicatorProps) {
  const [isLive, setIsLive] = useState(true)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (isLoading) return 'animate-pulse bg-yellow-500'
    if (totalNews > 0) return isLive ? 'bg-green-500 animate-pulse' : 'bg-green-400'
    return 'bg-gray-400'
  }

  const getStatusIcon = () => {
    if (isLoading) return <RefreshCw className="w-3 h-3 animate-spin" />
    if (totalNews > 0) return <CheckCircle className="w-3 h-3" />
    return <AlertCircle className="w-3 h-3" />
  }

  const getStatusText = () => {
    if (isLoading) return 'Processing live news...'
    if (totalNews > 0) return `${totalNews} articles with predictions`
    return 'Waiting for news updates'
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        <span className="text-sm font-medium">Live Indian Market News</span>
      </div>
      
      <Badge variant="outline" className="flex items-center gap-1 text-xs">
        {getStatusIcon()}
        {getStatusText()}
      </Badge>
      
      {lastUpdated && (
        <span className="text-xs text-muted-foreground">
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}