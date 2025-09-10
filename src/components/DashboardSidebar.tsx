
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
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-card via-card/95 to-card/90 backdrop-blur-xl border-r border-border/50 flex flex-col shadow-2xl z-40 overflow-hidden">
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Logo Section */}
      <div className="relative p-6 border-b border-border/30 bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <OfficialSentinelLogo size="sm" showText={false} variant="icon-only" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm -z-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent font-inter tracking-tight">
              SENTINEL
            </h1>
            <p className="text-xs text-muted-foreground font-medium animate-pulse">
              Insight Beyond Headlines
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02] hover:shadow-lg",
                  isActive
                    ? "text-primary-foreground bg-gradient-to-r from-primary via-primary/90 to-accent font-semibold shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:via-accent/5 hover:to-primary/10 hover:shadow-md"
                )
              }
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.5s ease-out forwards'
              }}
            >
              {({ isActive }) => (
                <>
                  {/* Active glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl -z-10 animate-pulse" />
                  )}
                  
                  {/* Modern active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-foreground via-white to-primary-foreground rounded-r-full shadow-sm" />
                  )}
                  
                  <div className="relative flex items-center">
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-all duration-300",
                      isActive ? "text-primary-foreground drop-shadow-sm" : "group-hover:scale-110 group-hover:text-primary"
                    )} />
                    <span className="font-inter font-medium">{item.name}</span>
                  </div>

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none" 
                       style={{ transition: 'transform 0.8s ease-out' }} />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="relative p-4 border-t border-border/30 space-y-3 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
        {/* Theme Toggle */}
        <Button
          onClick={cycleTheme}
          variant="ghost"
          size="sm"
          className="w-full justify-start group text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          <ThemeIcon className="mr-3 h-4 w-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
          <span className="font-inter text-sm font-medium">
            {theme === 'light' ? 'Light Mode' : theme === 'dark' ? 'Dark Mode' : 'System Mode'}
          </span>
        </Button>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start group text-muted-foreground hover:text-destructive hover:bg-gradient-to-r hover:from-destructive/10 hover:to-destructive/5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-all duration-300" />
          <span className="font-inter text-sm font-medium">Logout</span>
        </Button>

        {/* Version with glow */}
        <div className="text-center pt-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border border-primary/20">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mr-2 animate-pulse" />
            <span className="text-xs text-muted-foreground font-inter font-medium">
              vBeta
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
