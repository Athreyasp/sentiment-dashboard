
import { BarChart3, Shield } from 'lucide-react'

interface SentinelLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function SentinelLogo({ size = 'md', showText = true, className = '' }: SentinelLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg`}>
          <BarChart3 className="w-1/2 h-1/2 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
          <Shield className="w-2 h-2 text-white" />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
            Sentinel
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1">2.0</span>
        </div>
      )}
    </div>
  )
}
