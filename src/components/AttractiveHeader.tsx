
import React from 'react'
import { UserButton } from '@clerk/clerk-react'
import { OfficialSentinelLogo } from './OfficialSentinelLogo'

export function AttractiveHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <OfficialSentinelLogo size="sm" showText={true} variant="default" />
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground font-medium">Live Market Data</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Real-time Updates</span>
            </div>
            
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 z-10 animate-pulse">
                <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-purple-500/30 hover:ring-purple-500/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20",
                    userButtonPopoverCard: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 animate-scale-in z-50"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  )
}
