
import { useEffect, useState } from 'react'

interface SimplePreloaderProps {
  onComplete: () => void
}

export function SimplePreloader({ onComplete }: SimplePreloaderProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Start exit animation after 3 seconds
    const timer = setTimeout(() => {
      setIsExiting(true)
      
      // Complete loading after exit animation
      setTimeout(() => {
        onComplete()
      }, 500) // Allow time for fade-out and scale animation
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out bg-gray-50 dark:bg-slate-900 ${
        isExiting ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
    >
      <div className="text-center space-y-6">
        {/* Animated Spinner */}
        <div className="flex justify-center">
          <div className="relative w-8 h-8">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-slate-200 dark:border-slate-700 rounded-full"></div>
            {/* Animated ring */}
            <div 
              className="absolute inset-0 border-2 border-transparent border-t-[#00C49F] rounded-full animate-spin"
              style={{ 
                animationDuration: '1s',
                animationTimingFunction: 'linear'
              }}
            ></div>
          </div>
        </div>

        {/* Status Message */}
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-inter">
          Loading AI-powered financial dashboard...
        </p>
      </div>
    </div>
  )
}
