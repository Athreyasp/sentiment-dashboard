
import { useEffect, useState } from 'react'
import { ModernSentinelLogo } from './ModernSentinelLogo'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')
  const [showSkip, setShowSkip] = useState(false)

  const loadingMessages = [
    'Initializing...',
    'Loading AI systems...',
    'Connecting to markets...',
    'Analyzing data streams...',
    'Preparing dashboard...',
    'Welcome to Sentinel'
  ]

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 + 4
        
        // Update loading text based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * loadingMessages.length),
          loadingMessages.length - 1
        )
        setLoadingText(loadingMessages[messageIndex])
        
        if (newProgress >= 100) {
          clearInterval(timer)
          setLoadingText('Welcome to Sentinel')
          return 100
        }
        return newProgress
      })
    }, 120)

    return () => {
      clearInterval(timer)
      clearTimeout(skipTimer)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-500/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-emerald-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '8s' }}></div>
        </div>

        {/* Skip button */}
        {showSkip && (
          <button 
            className="absolute top-8 right-8 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-all duration-300 hover:scale-105 z-10 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => window.location.reload()}
          >
            Skip →
          </button>
        )}

        {/* Main content */}
        <div className="text-center relative z-10 max-w-md mx-auto px-6">
          {/* Logo section */}
          <div className="mb-12 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-full p-[2px] animate-spin" style={{ animationDuration: '3s' }}>
                <div className="w-full h-full bg-slate-950 rounded-full"></div>
              </div>
            </div>
            
            {/* Inner pulsing ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border border-cyan-400/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            </div>
            
            {/* Logo with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative transform hover:scale-110 transition-transform duration-1000">
                <ModernSentinelLogo 
                  size="xl" 
                  variant="hero" 
                  showText={false}
                  className="drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Progress section */}
          <div className="space-y-8">
            {/* Loading spinner */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-spin"
                  style={{ 
                    maskImage: 'conic-gradient(transparent 0deg, black 90deg)',
                    WebkitMaskImage: 'conic-gradient(transparent 0deg, black 90deg)'
                  }}
                ></div>
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse blur-sm"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-6 bg-white rounded-full shadow-lg shadow-cyan-500/30"></div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-slate-700/30">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-all duration-300 ease-out relative overflow-hidden rounded-full"
                  style={{ 
                    width: `${Math.min(progress, 100)}%`,
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Progress percentage */}
            <div className="text-cyan-400 text-xl font-semibold mb-4" style={{ 
              textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' 
            }}>
              {Math.round(Math.min(progress, 100))}%
            </div>

            {/* Loading text */}
            <div className="text-slate-300 mb-8 min-h-[24px]">
              <span className="font-medium text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {loadingText}
              </span>
            </div>

            {/* Status indicators */}
            <div className="flex items-center justify-center space-x-8 flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="font-medium">AI Systems</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="relative">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.3s' }}></div>
                  <div className="absolute inset-0 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="font-medium">Data Streams</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="relative">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50" style={{ animationDelay: '0.6s' }}></div>
                  <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.6s' }}></div>
                </div>
                <span className="font-medium">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes modernPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          
          .animate-modern-pulse {
            animation: modernPulse 2s ease-in-out infinite;
          }
        `
      }} />
    </>
  )
}
