
import { useEffect, useState } from 'react'
import { ModernSentinelLogo } from './ModernSentinelLogo'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing AI systems...')

  const loadingMessages = [
    'Initializing AI systems...',
    'Loading market data...',
    'Analyzing sentiment patterns...',
    'Connecting to neural networks...',
    'Preparing dashboard...',
    'Almost ready...'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5
        
        // Update loading text based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * loadingMessages.length),
          loadingMessages.length - 1
        )
        setLoadingText(loadingMessages[messageIndex])
        
        if (newProgress >= 100) {
          clearInterval(timer)
          setLoadingText('Welcome to Sentinel!')
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements - matching homepage */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content container */}
      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {/* Logo section */}
        <div className="mb-12 animate-fade-in">
          <ModernSentinelLogo 
            size="lg" 
            variant="hero" 
            showText={true}
            className="transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Loading animation section */}
        <div className="space-y-8">
          {/* Main loading spinner */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 border-4 border-slate-200/30 dark:border-slate-700/30 rounded-full"></div>
              {/* Animated progress ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 border-r-blue-500 rounded-full animate-spin shadow-lg shadow-emerald-500/30"></div>
              {/* Inner pulse */}
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full animate-pulse"></div>
              {/* Center dot */}
              <div className="absolute inset-5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-sm mx-auto">
            <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-slate-300/20 dark:border-slate-600/20">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-emerald-600 dark:text-emerald-400 text-xl font-bold mb-4">
            {Math.round(Math.min(progress, 100))}%
          </div>

          {/* Loading text */}
          <div className="text-slate-600 dark:text-slate-300 animate-pulse mb-8 min-h-[28px]">
            <span className="font-medium text-lg">{loadingText}</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-center space-x-8 flex-wrap gap-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="font-medium">AI Engine</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.3s' }}></div>
              <span className="font-medium">Data Streams</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.6s' }}></div>
              <span className="font-medium">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
