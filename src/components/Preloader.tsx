
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              i % 4 === 0 ? 'w-3 h-3 bg-cyan-400' : 
              i % 4 === 1 ? 'w-2 h-2 bg-purple-400' : 
              i % 4 === 2 ? 'w-1.5 h-1.5 bg-blue-400' :
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

      <div className="text-center space-y-8 relative z-10">
        {/* Modern logo with enhanced animation */}
        <div className="flex items-center justify-center mb-12 animate-fade-in">
          <ModernSentinelLogo 
            size="xl" 
            variant="hero" 
            showText={true}
            className="transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Enhanced loading animation */}
        <div className="space-y-6">
          {/* Main loading spinner with glow effect */}
          <div className="flex justify-center">
            <div className="w-20 h-20 relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 border-4 border-slate-700/30 rounded-full"></div>
              {/* Animated progress ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full animate-spin shadow-lg shadow-cyan-500/50"></div>
              {/* Inner pulse */}
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full animate-pulse"></div>
              {/* Center dot */}
              <div className="absolute inset-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced progress bar */}
          <div className="w-80 bg-slate-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-cyan-400 text-lg font-semibold">
            {Math.round(Math.min(progress, 100))}%
          </div>

          {/* Dynamic loading text with typewriter effect */}
          <div className="text-slate-300 animate-pulse min-h-[24px]">
            <span className="font-medium text-lg">{loadingText}</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>AI Engine</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span>Data Streams</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span>Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
