
import { Shield, Eye, Zap, TrendingUp, Activity, Target, Brain } from 'lucide-react'

interface ModernSentinelLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'icon-only' | 'hero'
}

export function ModernSentinelLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default'
}: ModernSentinelLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  }

  const LogoIcon = () => (
    <div className="relative group cursor-pointer">
      {/* Outer energy ring */}
      <div className={`${sizeClasses[size]} absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/30 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse`}></div>
      
      {/* Main logo container with glassmorphism */}
      <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-slate-800/90 via-blue-900/95 to-purple-900/90 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden group-hover:shadow-cyan-500/30 transition-all duration-500 group-hover:scale-105`}>
        
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3),transparent_50%)] group-hover:animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_50%)] group-hover:animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Central design - Modern eye/shield hybrid */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Main shield structure */}
          <div className="relative">
            {/* Outer shield with modern cut */}
            <div className={`${size === 'sm' ? 'w-6 h-7' : size === 'md' ? 'w-8 h-9' : size === 'lg' ? 'w-12 h-14' : 'w-16 h-18'} relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-t-full transform rotate-180 opacity-90"></div>
              <div className="absolute inset-x-1 top-1 bottom-2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full"></div>
            </div>
            
            {/* Central eye/lens */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} relative`}>
                {/* Iris */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-600 rounded-full animate-pulse"></div>
                {/* Pupil with data flow effect */}
                <div className="absolute inset-1 bg-gradient-to-br from-slate-900 to-blue-900 rounded-full flex items-center justify-center">
                  <Brain className={`${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'} text-cyan-400 animate-pulse`} />
                </div>
                {/* Scanning line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent h-px top-1/2 animate-pulse" style={{ animationDuration: '2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Corner accent elements */}
          <div className="absolute -top-1 -right-1">
            <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-bounce border border-white/40`}></div>
          </div>
          
          <div className="absolute -bottom-1 -left-1">
            <Activity className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} text-amber-400 animate-pulse`} />
          </div>
        </div>
        
        {/* Data flow lines */}
        <div className="absolute inset-2 rounded-2xl border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-500"></div>
        <div className="absolute inset-3 rounded-xl border border-purple-400/20 group-hover:border-purple-400/40 transition-colors duration-500 animate-pulse"></div>
        
        {/* Performance indicators */}
        <div className="absolute -top-3 -right-3 flex flex-col space-y-1">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse border border-white/60"></div>
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-bounce border border-white/60" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse border border-white/60" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
      
      {/* Status indicator for AI activity */}
      {(variant === 'hero' || size === 'xl' || size === 'lg') && (
        <div className="absolute -bottom-3 -left-3 p-2 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-xl shadow-lg border border-white/30 backdrop-blur-sm">
          <TrendingUp className="w-4 h-4 text-white animate-bounce" />
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
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-purple-800 dark:from-white dark:via-cyan-200 dark:to-blue-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight hover:scale-105 transition-transform duration-300`}>
            SENTINEL
          </span>
        )}
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center space-y-8 ${className}`}>
        <LogoIcon />
        {showText && (
          <div className="text-center">
            <h1 className={`font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-purple-800 dark:from-white dark:via-cyan-200 dark:to-blue-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight mb-3 hover:scale-105 transition-transform duration-300`}>
              SENTINEL
            </h1>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-semibold mt-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Market Intelligence
            </p>
            <div className="flex items-center justify-center space-x-8 mt-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2 group hover:text-emerald-500 transition-colors">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Real-time Analytics</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2 group hover:text-cyan-500 transition-colors">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Enterprise Security</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2 group hover:text-purple-500 transition-colors">
                <Brain className="w-5 h-5" />
                <span className="font-semibold">Neural Insights</span>
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
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-purple-800 dark:from-white dark:via-cyan-200 dark:to-blue-200 bg-clip-text text-transparent ${textSizeClasses[size]} tracking-tight hover:scale-105 transition-transform duration-300`}>
            SENTINEL
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Market Intelligence
          </span>
        </div>
      )}
    </div>
  )
}
