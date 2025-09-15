import React from 'react'

interface OfficialSentinelLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'default' | 'minimal' | 'icon-only'
  className?: string
}

export function OfficialSentinelLogo({ 
  size = 'md',
  showText = true,
  variant = 'default',
  className = ""
}: OfficialSentinelLogoProps) {
  
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-10', 
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  }

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-lg', 
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <img 
          src="/lovable-uploads/c866df8a-d9d3-42b1-9711-eac0d6acb1ca.png"
          alt="Sentinel - AI Powered Financial Insights"
          className={`${sizeClasses[size]} w-auto object-contain max-w-none filter drop-shadow-lg`}
          onError={(e) => {
            console.error('Logo failed to load:', e);
            // Fallback to showing text if image fails
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Logo loaded successfully');
          }}
        />
        {/* Glow effect for logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent font-pixel tracking-wider`}>
            SENTINEL
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider opacity-80">
            AI INSIGHTS
          </span>
        </div>
      )}
    </div>
  )
}