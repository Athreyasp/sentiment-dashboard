
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  BarChart3, 
  TrendingUp, 
  Newspaper, 
  Briefcase, 
  Bell, 
  Brain,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ModernSidebarProps {
  collapsed: boolean
  onToggle: () => void
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Ticker Insights', href: '/ticker', icon: TrendingUp },
  { name: 'News Feed', href: '/news', icon: Newspaper },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Explainability', href: '/explainer', icon: Brain },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function ModernSidebar({ collapsed, onToggle, className }: ModernSidebarProps) {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked')
  }

  return (
    <div className={cn(
      "bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col h-full",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Top Branding Section */}
      <div className={cn(
        "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 transition-all duration-300",
        collapsed ? "px-4 py-6 flex-col gap-4" : "px-6 py-6"
      )}>
        {!collapsed ? (
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00C49F] to-[#0088CC] rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                SENTINEL
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Insight Beyond Headlines
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-scale-in">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00C49F] to-[#0088CC] rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-slate-950 animate-pulse"></div>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200",
            collapsed ? "w-8 h-8" : "w-9 h-9"
          )}
        >
          {collapsed ? (
            <Menu className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          ) : (
            <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 relative overflow-hidden",
                collapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
                isActive 
                  ? "bg-[#00C49F]/10 text-[#00C49F] font-semibold border-l-4 border-[#00C49F]" 
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent",
                // Stagger animation
                `animate-slide-up`,
                index > 0 && `animate-stagger-${Math.min(index, 4)}`
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "flex items-center justify-center transition-all duration-200",
                  collapsed ? "w-5 h-5" : "w-5 h-5 mr-3",
                  isActive && "scale-110"
                )}>
                  <item.icon className="w-full h-full" />
                </div>
                
                {!collapsed && (
                  <span className="font-medium text-sm tracking-tight underline-on-hover">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg animate-scale-in">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-3">
        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "w-full justify-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200",
                collapsed && "justify-center px-0"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  {theme === 'light' && <Sun className="w-4 h-4 text-amber-500 animate-rotate-icon" />}
                  {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400 animate-rotate-icon" />}
                  {theme === 'system' && <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                </div>
                {!collapsed && (
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
                  </span>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align={collapsed ? "center" : "start"} 
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 animate-scale-in"
          >
            <DropdownMenuItem 
              onClick={() => setTheme('light')}
              className="hover:bg-amber-50 dark:hover:bg-amber-900/20"
            >
              <Sun className="w-4 h-4 mr-2 text-amber-500" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setTheme('dark')}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Moon className="w-4 h-4 mr-2 text-blue-400" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setTheme('system')}
              className="hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Monitor className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout Button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex items-center space-x-3">
            <LogOut className="w-4 h-4" />
            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </div>
        </Button>

        {/* Version Info */}
        {!collapsed && (
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              vBeta
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
