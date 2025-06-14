
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
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react'
import { SentinelLogo } from './SentinelLogo'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3, isActive: true, gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Ticker Insights', href: '/ticker', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase, gradient: 'from-purple-500 to-pink-500' },
  { name: 'Alerts', href: '/alerts', icon: Bell, gradient: 'from-orange-500 to-red-500' },
  { name: 'AI Explainer', href: '/explainer', icon: Brain, gradient: 'from-indigo-500 to-purple-500' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-r border-slate-700/30 transition-all duration-500 ease-in-out flex flex-col relative overflow-hidden",
      collapsed ? "w-20" : "w-80"
    )}>
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-purple-600/3 to-cyan-600/3"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/8 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Enhanced mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.05),transparent_50%)]"></div>

      {/* Header with Logo and Toggle */}
      <div className={cn(
        "flex items-center justify-center border-b border-slate-700/30 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm relative z-10",
        collapsed ? "h-20 px-2" : "h-24 px-6"
      )}>
        {!collapsed ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <SentinelLogo size="md" showText={true} variant="minimal" />
            </div>
            <button
              onClick={onToggle}
              className="p-3 rounded-2xl hover:bg-slate-700/40 transition-all duration-300 text-slate-400 hover:text-white group border border-slate-600/20 hover:border-slate-500/40 bg-slate-800/30 backdrop-blur-sm"
            >
              <X className="w-5 h-5 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <SentinelLogo size="sm" showText={false} variant="icon-only" />
            <button
              onClick={onToggle}
              className="p-2.5 rounded-xl hover:bg-slate-700/40 transition-all duration-300 text-slate-400 hover:text-white group border border-slate-600/20 hover:border-slate-500/40 bg-slate-800/30 backdrop-blur-sm"
            >
              <Menu className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-4 relative z-10">
        <div className="space-y-3">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-2xl transition-all duration-300 hover:bg-slate-800/40 hover:backdrop-blur-sm border border-transparent hover:border-slate-600/30 relative overflow-hidden",
                  collapsed ? "px-3 py-4 justify-center" : "px-5 py-4",
                  isActive 
                    ? "bg-gradient-to-r from-slate-800/60 to-slate-700/40 text-white border-slate-600/40 shadow-xl backdrop-blur-sm" 
                    : "text-slate-300 hover:text-white"
                )
              }
            >
              {/* Enhanced active indicator */}
              <div className={cn(
                "absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b transition-all duration-300 rounded-r-full",
                item.gradient.includes('blue') ? `bg-gradient-to-b ${item.gradient}` : 
                item.gradient.includes('green') ? `bg-gradient-to-b ${item.gradient}` :
                item.gradient.includes('purple') ? `bg-gradient-to-b ${item.gradient}` :
                item.gradient.includes('orange') ? `bg-gradient-to-b ${item.gradient}` :
                `bg-gradient-to-b ${item.gradient}`,
                window.location.pathname === item.href ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50 group-hover:opacity-60 group-hover:scale-y-75"
              )}></div>

              {/* Enhanced icon container with gradient backgrounds */}
              <div className={cn(
                "flex items-center justify-center rounded-xl transition-all duration-300 relative overflow-hidden",
                collapsed ? "w-10 h-10" : "w-12 h-12 mr-4",
                window.location.pathname === item.href 
                  ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                  : "bg-slate-700/40 group-hover:bg-slate-600/50 border border-slate-600/20 group-hover:border-slate-500/30"
              )}>
                {/* Shimmer effect for active items */}
                {window.location.pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                )}
                
                <item.icon className={cn(
                  "transition-all duration-300 relative z-10",
                  collapsed ? "w-5 h-5" : "w-6 h-6",
                  window.location.pathname === item.href 
                    ? "text-white scale-110" 
                    : "text-slate-400 group-hover:text-white group-hover:scale-105"
                )} />
                
                {/* Sparkle effect for active icon */}
                {window.location.pathname === item.href && !collapsed && (
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-bounce" />
                )}
              </div>

              {/* Text and arrow - only show when not collapsed */}
              {!collapsed && (
                <>
                  <div className="flex-1">
                    <span className="font-semibold text-lg">{item.name}</span>
                    {window.location.pathname === item.href && (
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
                    window.location.pathname === item.href && "opacity-100 translate-x-0 text-white"
                  )} />
                </>
              )}

              {/* Enhanced tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-4 px-4 py-3 bg-slate-800/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-600/50 shadow-2xl backdrop-blur-sm z-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{item.name}</span>
                    {window.location.pathname === item.href && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600/50 rotate-45"></div>
                </div>
              )}

              {/* Enhanced hover glow effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-xl",
                `${item.gradient} opacity-10`
              )}></div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Enhanced Status Footer */}
      {!collapsed ? (
        <div className="p-4 border-t border-slate-700/30 relative z-10">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-600/30 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-white font-semibold text-base flex items-center space-x-2">
                <span>🚀 Live Data Active</span>
              </span>
            </div>
            <div className="text-sm text-slate-300 space-y-2">
              <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>📈 Market Status:</span>
                </span>
                <span className="text-green-400 font-semibold flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Open</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>⏱️ Last Update:</span>
                </span>
                <span className="text-blue-400 font-semibold">12:34 PM</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>⚡ Response:</span>
                </span>
                <span className="text-yellow-400 font-semibold">12ms</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-slate-700/30 flex justify-center relative z-10">
          <div className="relative group">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute left-full ml-4 px-4 py-3 bg-slate-800/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-600/50 shadow-2xl backdrop-blur-sm z-50">
              <div className="space-y-1">
                <div className="font-semibold">🚀 Live Data Active</div>
                <div className="text-xs text-slate-300">Market: Open • 12ms</div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600/50 rotate-45"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
