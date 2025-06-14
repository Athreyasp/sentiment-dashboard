
import { Shield, Zap } from 'lucide-react'

interface SentinelLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'icon-only'
}

export function SentinelLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default'
}: SentinelLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-14 h-14'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  const LogoIcon = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl border border-white/20`}>
        <div className="relative">
          <Shield className="w-1/2 h-1/2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <Zap className="w-1/4 h-1/4 text-yellow-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
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
          <span className={`font-bold text-slate-800 dark:text-white ${textSizeClasses[size]}`}>
            Sentinel
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
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
