
import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'

export function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Logo with pulse animation */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center animate-pulse">
            <BarChart3 className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sentinel 2.0
          </div>
        </div>

        {/* Loading animation */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-64 bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          {/* Loading text */}
          <div className="text-sm text-muted-foreground animate-pulse">
            Initializing AI sentiment analysis...
          </div>
        </div>
      </div>
    </div>
  )
}
