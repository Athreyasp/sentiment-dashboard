
import { useEffect, useState } from 'react'
import { ModernSentinelLogo } from './ModernSentinelLogo'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing AI systems...')
  const [showSkip, setShowSkip] = useState(false)

  const loadingMessages = [
    'Initializing AI systems...',
    'Loading market data...',
    'Analyzing sentiment patterns...',
    'Connecting to neural networks...',
    'Preparing dashboard...',
    'Welcome to Sentinel!'
  ]

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12 + 8
        
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
    }, 150)

    return () => {
      clearInterval(timer)
      clearTimeout(skipTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-purple-950/60 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated particle field background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/10 via-blue-500/15 to-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 via-cyan-500/15 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-pink-500/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(139,69,219,0.08),transparent_60%)]"></div>
      </div>

      {/* Skip button */}
      {showSkip && (
        <button 
          className="absolute top-8 right-8 text-slate-400 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 z-10"
          onClick={() => window.location.reload()}
        >
          Skip →
        </button>
      )}

      {/* Main content container */}
      <div className="text-center relative z-10 max-w-lg mx-auto px-6">
        {/* Logo section with enhanced 3D animation */}
        <div className="mb-16 relative">
          {/* Outer glow rings for 3D depth */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-cyan-400/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute w-32 h-32 rounded-full border border-blue-400/30 animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
            <div className="absolute w-24 h-24 rounded-full border border-purple-400/20 animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>
          </div>
          
          {/* Main logo with 3D rotation and glow */}
          <div className="relative animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/40 to-purple-600/30 rounded-full blur-xl animate-pulse"></div>
            <div 
              className="relative transform transition-all duration-1000 hover:scale-110"
              style={{
                animation: 'logoRotate 6s ease-in-out infinite, logoGlow 4s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
              }}
            >
              <ModernSentinelLogo 
                size="xl" 
                variant="hero" 
                showText={false}
                className="relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Enhanced loading animation section */}
        <div className="space-y-10">
          {/* Main loading spinner with 3D depth */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 relative">
              {/* Multiple depth rings */}
              <div className="absolute inset-0 border-2 border-slate-700/30 rounded-full"></div>
              <div className="absolute inset-1 border-2 border-slate-600/20 rounded-full"></div>
              
              {/* Animated gradient ring */}
              <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-spin" style={{ 
                mask: 'conic-gradient(transparent 0deg, black 90deg)',
                WebkitMask: 'conic-gradient(transparent 0deg, black 90deg)'
              }}></div>
              
              {/* Inner pulsing core */}
              <div className="absolute inset-3 bg-gradient-to-br from-cyan-400/30 via-blue-500/40 to-purple-600/30 rounded-full animate-pulse blur-sm"></div>
              <div className="absolute inset-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              
              {/* Center dot with glow */}
              <div className="absolute inset-8 bg-white rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
            </div>
          </div>

          {/* Enhanced progress bar with glow */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-slate-600/30 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-emerald-500 transition-all duration-500 ease-out relative overflow-hidden rounded-full"
                style={{ 
                  width: `${Math.min(progress, 100)}%`,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Shimmer effect with enhanced glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent animate-ping" style={{ animationDuration: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Progress percentage with glow effect */}
          <div className="text-cyan-400 text-2xl font-bold mb-6" style={{ 
            textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)' 
          }}>
            {Math.round(Math.min(progress, 100))}%
          </div>

          {/* Loading text with typewriter effect */}
          <div className="text-slate-300 animate-pulse mb-10 min-h-[32px]">
            <span className="font-medium text-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {loadingText}
            </span>
          </div>

          {/* Enhanced status indicators with 3D feel */}
          <div className="flex items-center justify-center space-x-12 flex-wrap gap-3">
            <div className="flex items-center space-x-3 text-sm text-slate-400 group hover:text-cyan-400 transition-all duration-300">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/60"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
              </div>
              <span className="font-semibold group-hover:scale-105 transition-transform">AI Engine</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-slate-400 group hover:text-blue-400 transition-all duration-300">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/60" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <span className="font-semibold group-hover:scale-105 transition-transform">Data Streams</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-slate-400 group hover:text-purple-400 transition-all duration-300">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/60" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.6s' }}></div>
              </div>
              <span className="font-semibold group-hover:scale-105 transition-transform">Neural Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframes styles */}
      <style jsx>{`
        @keyframes logoRotate {
          0%, 100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1); }
          25% { transform: perspective(1000px) rotateY(15deg) rotateX(5deg) scale(1.05); }
          50% { transform: perspective(1000px) rotateY(0deg) rotateX(10deg) scale(1.1); }
          75% { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) scale(1.05); }
        }
        
        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.5)) brightness(1); }
          100% { filter: drop-shadow(0 0 40px rgba(6, 182, 212, 0.8)) brightness(1.2); }
        }
      `}</style>
    </div>
  )
}
