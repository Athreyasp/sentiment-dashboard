
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
  Zap,
  Home,
  Settings,
  User,
  LogOut
} from 'lucide-react'
import { OfficialSentinelLogo } from './OfficialSentinelLogo'
import { Button } from './ui/button'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
  { name: 'Ticker Insights', href: '/dashboard/ticker', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500', color: 'green' },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Briefcase, gradient: 'from-purple-500 to-pink-500', color: 'purple' },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell, gradient: 'from-orange-500 to-red-500', color: 'orange' },
  { name: 'AI Explainer', href: '/dashboard/explainer', icon: Brain, gradient: 'from-indigo-500 to-purple-500', color: 'indigo' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "relative flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shadow-xl",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Modern background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"></div>
      
      {/* Header */}
      <div className={cn(
        "relative z-10 flex items-center border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
        collapsed ? "h-20 justify-center" : "h-20 justify-between px-6"
      )}>
        {!collapsed ? (
          <>
            <div className="flex items-center space-x-3 animate-fade-in">
              <OfficialSentinelLogo size="md" showText={true} variant="minimal" />
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <OfficialSentinelLogo size="sm" showText={false} variant="icon-only" />
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 relative z-10 py-6",
        collapsed ? "px-3" : "px-6"
      )}>
        <div className="space-y-2">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                  collapsed ? "p-3 justify-center" : "px-4 py-3",
                  isActive 
                    ? "bg-gradient-to-r text-white shadow-lg transform scale-[1.02]" + ` ${item.gradient}`
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50",
                  // Stagger animation
                  index === 0 ? "animate-fade-in" : 
                  index === 1 ? "animate-fade-in animate-stagger-1" :
                  index === 2 ? "animate-fade-in animate-stagger-2" :
                  index === 3 ? "animate-fade-in animate-stagger-3" :
                  "animate-fade-in animate-stagger-4"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon container */}
                  <div className={cn(
                    "flex items-center justify-center rounded-xl transition-all duration-300",
                    collapsed ? "w-10 h-10" : "w-10 h-10 mr-4",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : `bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400 group-hover:bg-${item.color}-200 dark:group-hover:bg-${item.color}-800/50`
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>

                  {/* Text and badge */}
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-semibold text-sm">{item.name}</span>
                      {isActive && (
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 animate-pulse" />
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.name}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45"></div>
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className={cn(
        "relative z-10 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
        collapsed ? "p-3" : "p-6"
      )}>
        {!collapsed ? (
          <div className="space-y-4">
            {/* Status card */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">Live Data Active</span>
              </div>
              <div className="space-y-2 text-xs text-emerald-600 dark:text-emerald-400">
                <div className="flex justify-between">
                  <span>Market Status:</span>
                  <span className="font-semibold">Open</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Update:</span>
                  <span className="font-semibold">12:34 PM</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1 h-10 text-xs">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-10 text-xs">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Collapsed status indicator */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-50">
                  Live Data Active
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Collapsed action buttons */}
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" className="w-full h-10 p-2">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-full h-10 p-2">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
