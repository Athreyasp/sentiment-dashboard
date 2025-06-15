
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SentinelLogo } from './SentinelLogo'
import { 
  BarChart3, 
  Briefcase, 
  Search, 
  Bell, 
  Brain,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Market overview & insights'
  },
  {
    name: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: Briefcase,
    description: 'Track your investments'
  },
  {
    name: 'Ticker Insights',
    href: '/dashboard/ticker-insights',
    icon: Search,
    description: 'Deep stock analysis'
  },
  {
    name: 'Alerts',
    href: '/dashboard/alerts',
    icon: Bell,
    description: 'Smart notifications'
  },
  {
    name: 'AI Explainer',
    href: '/dashboard/explainer',
    icon: Brain,
    description: 'Understand AI decisions'
  }
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out relative overflow-hidden",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-32 h-32 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 relative z-10">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex items-center space-x-3 transition-all duration-300",
            collapsed && "justify-center"
          )}>
            <SentinelLogo size="sm" showText={!collapsed} variant="default" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 animate-fade-in",
                "relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:border hover:border-slate-600/50",
                collapsed && "justify-center px-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full animate-scale-in"></div>
              )}
              
              <div className={cn(
                "flex items-center transition-all duration-300",
                collapsed ? "justify-center" : "space-x-3"
              )}>
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" 
                    : "bg-slate-700/50 group-hover:bg-slate-600/50"
                )}>
                  <Icon className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isActive ? "text-white animate-pulse" : "text-slate-300 group-hover:text-white group-hover:scale-110"
                  )} />
                </div>
                
                {!collapsed && (
                  <div className="flex-1">
                    <div className="font-semibold text-base">{item.name}</div>
                    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                      {item.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover effect for collapsed sidebar */}
              {collapsed && hoveredItem === item.name && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 animate-scale-in">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-slate-300">{item.description}</div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <div className={cn(
          "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-4 border border-emerald-500/20",
          collapsed && "px-2"
        )}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg">
              <Activity className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-semibold text-white">AI Status</div>
                <div className="text-xs text-emerald-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Live & Learning</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
