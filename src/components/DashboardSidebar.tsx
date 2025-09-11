
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
import { OfficialSentinelLogo } from './OfficialSentinelLogo'
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
    <div className="fixed left-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-sm border-r border-border/20 flex flex-col z-40">
      
      {/* Logo Section */}
      <div className="p-6 border-b border-border/10">
        <div className="flex items-center space-x-3">
          <OfficialSentinelLogo size="sm" showText={false} variant="icon-only" />
          <div>
            <h1 className="text-xl font-semibold text-foreground font-inter">
              SENTINEL
            </h1>
            <p className="text-xs text-muted-foreground">
              Finance Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "text-foreground bg-muted font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                  )}
                  
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border/10 space-y-2">
        {/* Theme Toggle */}
        <Button
          onClick={cycleTheme}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg"
        >
          <ThemeIcon className="mr-3 h-4 w-4" />
          <span className="text-sm">
            {theme === 'light' ? 'Light Mode' : theme === 'dark' ? 'Dark Mode' : 'System Mode'}
          </span>
        </Button>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  )
}
