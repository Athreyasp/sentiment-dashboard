
import { NavLink, useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'
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
  Monitor
} from 'lucide-react'
import { SentinelLogo } from './SentinelLogo'
import { Button } from './ui/button'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Ticker Insights', href: '/dashboard/ticker', icon: TrendingUp },
  { name: 'News Feed', href: '/dashboard/news', icon: Newspaper },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Briefcase },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Explainability', href: '/dashboard/explainer', icon: Brain },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const { theme, setTheme } = useTheme()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      default:
        return Monitor
    }
  }

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-lg z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3 mb-2">
          <SentinelLogo size="sm" showText={false} variant="icon-only" />
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-inter tracking-tight">
              SENTINEL
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Insight Beyond Headlines
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative",
                  isActive
                    ? "text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00C49F] rounded-r-full" />
                  )}
                  
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="font-inter">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        {/* Theme Toggle */}
        <Button
          onClick={cycleTheme}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ThemeIcon className="mr-3 h-4 w-4" />
          <span className="font-inter text-sm">
            {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
          </span>
        </Button>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-inter text-sm">Logout</span>
        </Button>

        {/* Version */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-inter">
            vBeta
          </span>
        </div>
      </div>
    </div>
  )
}
