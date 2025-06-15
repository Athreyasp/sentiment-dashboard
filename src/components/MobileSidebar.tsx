
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
  X,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MobileSidebarProps {
  children: React.ReactNode
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

export function MobileSidebar({ children }: MobileSidebarProps) {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    console.log('Logout clicked')
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 p-0 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="border-b border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00C49F] to-[#0088CC] rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></div>
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold text-slate-900 dark:text-white tracking-tight text-left">
                    SENTINEL
                  </SheetTitle>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-left">
                    Insight Beyond Headlines
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                    isActive 
                      ? "bg-[#00C49F]/10 text-[#00C49F] font-semibold border-l-4 border-[#00C49F]" 
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent",
                    `animate-slide-up animate-stagger-${Math.min(index + 1, 4)}`
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      "w-5 h-5 mr-3 transition-all duration-200",
                      isActive && "scale-110"
                    )}>
                      <item.icon className="w-full h-full" />
                    </div>
                    <span className="font-medium text-sm tracking-tight">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
                      {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
                      {theme === 'system' && <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Theme: {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
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
              className="w-full justify-start hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </Button>

            {/* Version Info */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                vBeta
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
