
import { Shield, Zap, TrendingUp, Eye, Activity, Target } from 'lucide-react'

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
    sm: 'w-10 h-10',
    md: 'w-14 h-14', 
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  }

  const LogoIcon = () => (
    <div className="relative group cursor-pointer">
      {/* Outer glow ring */}
      <div className={`${sizeClasses[size]} absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse`}></div>
      
      {/* Main logo container */}
      <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm overflow-hidden group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-105`}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] group-hover:scale-110 transition-transform duration-700"></div>
        
        {/* Central shield design */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Main shield with modern design */}
          <div className="relative">
            <Shield className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-14 h-14'} text-white drop-shadow-lg group-hover:scale-110 transition-all duration-300`} />
            
            {/* Central targeting element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-6 h-6'} text-cyan-400 animate-pulse`} />
            </div>
          </div>
          
          {/* Side accent elements */}
          <div className="absolute -top-1 -right-1">
            <Activity className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} text-green-400 animate-bounce`} />
          </div>
          
          <div className="absolute -bottom-1 -left-1">
            <Zap className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400 drop-shadow-sm`} />
          </div>
        </div>
        
        {/* Animated border rings */}
        <div className="absolute inset-1 rounded-xl border border-white/20 group-hover:border-blue-400/40 transition-colors duration-300"></div>
        <div className="absolute inset-2 rounded-lg border border-white/10 group-hover:border-purple-400/30 transition-colors duration-300 animate-pulse"></div>
      </div>
      
      {/* Status indicators */}
      <div className="absolute -top-2 -right-2 flex space-x-1">
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border border-white shadow-lg animate-pulse"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full border border-white shadow-md animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Performance indicator for financial context */}
      {(variant === 'hero' || size === 'xl' || size === 'lg') && (
        <div className="absolute -bottom-2 -left-2 p-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg border border-white/20">
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
      <div className={`flex items-center space-x-4 ${className}`}>
        <LogoIcon />
        {showText && (
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight hover:scale-105 transition-transform duration-300`}>
            SENTINEL
          </span>
        )}
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center space-y-6 ${className}`}>
        <LogoIcon />
        {showText && (
          <div className="text-center">
            <h1 className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight mb-2 hover:scale-105 transition-transform duration-300`}>
              SENTINEL
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-semibold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Financial Intelligence
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2 group hover:text-green-500 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Real-time Analytics</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2 group hover:text-blue-500 transition-colors">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Bank-Grade Security</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2 group hover:text-purple-500 transition-colors">
                <Zap className="w-4 h-4" />
                <span className="font-medium">AI-Powered Insights</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <LogoIcon />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight hover:scale-105 transition-transform duration-300`}>
            SENTINEL
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Intelligence
          </span>
        </div>
      )}
    </div>
  )
}
