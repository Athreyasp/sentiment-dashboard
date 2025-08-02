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
    sm: 'h-8', 
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/lovable-uploads/c866df8a-d9d3-42b1-9711-eac0d6acb1ca.png"
        alt="Sentinel - AI Powered Financial Insights"
        className={`${sizeClasses[size]} w-auto object-contain max-w-none`}
        onError={(e) => {
          console.error('Logo failed to load:', e);
          // Fallback to showing text if image fails
          e.currentTarget.style.display = 'none';
        }}
        onLoad={() => {
          console.log('Logo loaded successfully');
        }}
      />
      {showText && (
        <span className="font-bold text-lg text-slate-900 dark:text-white">
          SENTINEL
        </span>
      )}
    </div>
  )
}