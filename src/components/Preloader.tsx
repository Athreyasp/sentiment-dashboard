
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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 left-20 md:top-40 md:left-40 w-30 h-30 md:w-60 md:h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              i % 4 === 0 ? 'w-2 h-2 md:w-3 md:h-3 bg-cyan-400' : 
              i % 4 === 1 ? 'w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400' : 
              i % 4 === 2 ? 'w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-400' :
              'w-1 h-1 bg-emerald-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Main content container with proper spacing */}
      <div className="text-center relative z-10 max-w-sm md:max-w-md mx-auto px-4 md:px-6">
        {/* Logo section */}
        <div className="mb-8 md:mb-12 animate-fade-in">
          <ModernSentinelLogo 
            size="md" 
            variant="hero" 
            showText={true}
            className="transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Loading animation section */}
        <div className="space-y-6 md:space-y-8">
          {/* Main loading spinner */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 border-3 md:border-4 border-slate-700/30 rounded-full"></div>
              {/* Animated progress ring */}
              <div className="absolute inset-0 border-3 md:border-4 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full animate-spin shadow-lg shadow-cyan-500/50"></div>
              {/* Inner pulse */}
              <div className="absolute inset-1.5 md:inset-2 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full animate-pulse"></div>
              {/* Center dot */}
              <div className="absolute inset-4 md:inset-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs md:max-w-sm mx-auto">
            <div className="bg-slate-800/50 rounded-full h-1.5 md:h-2 overflow-hidden backdrop-blur-sm border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-cyan-400 text-lg md:text-xl font-bold mb-3 md:mb-4">
            {Math.round(Math.min(progress, 100))}%
          </div>

          {/* Loading text */}
          <div className="text-slate-300 animate-pulse mb-6 md:mb-8 min-h-[24px] md:min-h-[28px]">
            <span className="font-medium text-base md:text-lg">{loadingText}</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-center space-x-4 md:space-x-8 flex-wrap gap-2 md:gap-0">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-medium">AI Engine</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span className="font-medium">Data Streams</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className="font-medium">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
