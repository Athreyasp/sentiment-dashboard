
import { Shield, Zap, TrendingUp, Eye } from 'lucide-react'

interface SentinelLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'icon-only' | 'hero'
}

export function SentinelLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default'
}: SentinelLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  const LogoIcon = () => (
    <div className="relative group">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 relative overflow-hidden group-hover:shadow-2xl transition-all duration-300`}>
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main shield icon */}
        <div className="relative z-10">
          <Shield className="w-1/2 h-1/2 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
          
          {/* Eye in the center representing sentinel/watching */}
          <Eye className="w-1/5 h-1/5 text-cyan-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          
          {/* Lightning bolt for power/speed */}
          <Zap className="w-1/4 h-1/4 text-yellow-300 absolute bottom-1 right-1 drop-shadow-sm" />
        </div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
      </div>
      
      {/* Status indicators */}
      <div className="absolute -top-1 -right-1 flex space-x-1">
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full border border-white shadow-md"></div>
      </div>
      
      {/* Trending indicator for financial context */}
      {(variant === 'hero' || size === 'xl') && (
        <div className="absolute -bottom-2 -left-2 p-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md">
          <TrendingUp className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  )

  if (variant === 'icon-only') {
    return (
      <div className={className}>
        <LogoIcon />
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <LogoIcon />
        {showText && (
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight`}>
            Sentinel
          </span>
        )}
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <LogoIcon />
        {showText && (
          <div className="text-center">
            <h1 className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight`}>
              Sentinel
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mt-1">
              AI-Powered Financial Intelligence
            </p>
            <div className="flex items-center justify-center space-x-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight`}>
            Sentinel
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 font-medium">
            Financial Intelligence
          </span>
        </div>
      )}
    </div>
  )
}
