
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  BarChart3, 
  TrendingUp, 
  Briefcase, 
  Bell, 
  Brain,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'
import { SentinelLogo } from './SentinelLogo'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3, isActive: true },
  { name: 'Ticker Insights', href: '/ticker', icon: TrendingUp },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'AI Explainer', href: '/explainer', icon: Brain },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>

      {/* Header with Logo and Toggle */}
      <div className="h-20 flex items-center justify-center px-4 border-b border-slate-700/50 relative z-10">
        {!collapsed ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <SentinelLogo size="md" showText={true} variant="minimal" />
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-xl hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white group"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <SentinelLogo size="sm" showText={false} variant="icon-only" />
            <button
              onClick={onToggle}
              className="p-2 rounded-xl hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white group"
            >
              <Menu className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 relative z-10">
        <div className="space-y-2">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-2xl transition-all duration-300 hover:bg-slate-700/30 hover:backdrop-blur-sm border border-transparent hover:border-slate-600/30 relative overflow-hidden",
                  collapsed ? "px-2 py-3 justify-center" : "px-4 py-4",
                  isActive 
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500/30 shadow-lg backdrop-blur-sm" 
                    : "text-slate-300 hover:text-white"
                )
              }
            >
              {/* Active indicator */}
              <div className={cn(
                "absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-300",
                window.location.pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              )}></div>

              {/* Icon container */}
              <div className={cn(
                "flex items-center justify-center rounded-xl transition-all duration-300",
                collapsed ? "w-8 h-8" : "w-10 h-10 mr-3",
                window.location.pathname === item.href 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" 
                  : "bg-slate-700/50 group-hover:bg-slate-600/50"
              )}>
                <item.icon className={cn(
                  "transition-all duration-300",
                  collapsed ? "w-4 h-4" : "w-5 h-5",
                  window.location.pathname === item.href 
                    ? "text-white" 
                    : "text-slate-400 group-hover:text-white"
                )} />
              </div>

              {/* Text and arrow - only show when not collapsed */}
              {!collapsed && (
                <>
                  <span className="font-medium flex-1">{item.name}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
                    window.location.pathname === item.href && "opacity-100 translate-x-0"
                  )} />
                </>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-600 shadow-lg z-50">
                  {item.name}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600 rotate-45"></div>
                </div>
              )}

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Status Footer */}
      {!collapsed ? (
        <div className="p-4 border-t border-slate-700/50 relative z-10">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-white font-medium text-sm">Live Data Active</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Market Status:</span>
                <span className="text-green-400 font-medium">Open</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Update:</span>
                <span className="text-blue-400 font-medium">12:34 PM</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-slate-700/50 flex justify-center relative z-10">
          <div className="relative group">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-600 shadow-lg z-50">
              Live Data Active
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600 rotate-45"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
