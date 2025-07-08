
import React from 'react'
import { UserButton } from '@clerk/clerk-react'
import { DockMenu } from './DockMenu'
import { ModernSentinelLogo } from './ModernSentinelLogo'
import { Search, Bell, Heart, Bookmark, Home, TrendingUp, BarChart3, Settings } from 'lucide-react'

export function AttractiveHeader() {
  const dockItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Dashboard',
      onClick: () => window.location.href = '/dashboard',
      isActive: window.location.pathname === '/dashboard'
    },
    {
      id: 'portfolio',
      icon: BarChart3,
      label: 'Portfolio',
      onClick: () => window.location.href = '/portfolio',
      isActive: window.location.pathname === '/portfolio'
    },
    {
      id: 'insights',
      icon: TrendingUp,
      label: 'Insights',
      onClick: () => window.location.href = '/ticker-insights',
      isActive: window.location.pathname === '/ticker-insights'
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      onClick: () => console.log('Search clicked')
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Alerts',
      onClick: () => window.location.href = '/alerts',
      isActive: window.location.pathname === '/alerts'
    },
    {
      id: 'favorites',
      icon: Heart,
      label: 'Watchlist',
      onClick: () => console.log('Watchlist clicked')
    },
    {
      id: 'news',
      icon: Bookmark,
      label: 'News',
      onClick: () => window.location.href = '/news',
      isActive: window.location.pathname === '/news'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      onClick: () => window.location.href = '/settings',
      isActive: window.location.pathname === '/settings'
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-50/95 via-white/95 to-slate-50/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <ModernSentinelLogo size="sm" showText={true} variant="default" />
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Live Market Data</span>
            </div>
          </div>

          {/* Dock Menu */}
          <div className="flex-1 flex justify-center">
            <DockMenu 
              items={dockItems}
              panelHeight={60}
              baseItemSize={40}
              magnification={1.4}
              className="hidden md:flex"
            />
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
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

        {/* Mobile Dock Menu */}
        <div className="md:hidden pb-4">
          <DockMenu 
            items={dockItems}
            panelHeight={50}
            baseItemSize={36}
            magnification={1.3}
          />
        </div>
      </div>

      {/* Gradient border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  )
}
