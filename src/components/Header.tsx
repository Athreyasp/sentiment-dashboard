
import { Bell, Search, Settings, Sun, Moon, Monitor, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/clerk-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/useTheme'
import { SentinelLogo } from './SentinelLogo'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-indigo-950/20 border-b border-blue-100/50 dark:border-slate-700/50 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm animate-slide-in">
      {/* Logo Section */}
      <div className="flex items-center space-x-4 animate-fade-in">
        <SentinelLogo size="sm" showText={true} variant="minimal" />
        <div className="hidden md:block h-6 w-px bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-700 animate-scale-in"></div>
        <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground animate-fade-in animate-stagger-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live Market Data</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-md mx-6 animate-slide-up">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
          <Input
            placeholder="Search tickers, news, sectors..."
            className="pl-10 bg-white/70 dark:bg-slate-800/70 border-blue-200/50 dark:border-slate-600/50 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 hover-glow"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 transition-opacity duration-200 group-focus-within:opacity-50">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-2 animate-fade-in animate-stagger-2">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group hover-lift"
        >
          <Bell className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 animate-icon-bounce" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
        </Button>
        
        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group hover-lift"
            >
              {theme === 'light' && <Sun className="w-4 h-4 group-hover:text-amber-500 transition-all duration-300 animate-rotate-icon" />}
              {theme === 'dark' && <Moon className="w-4 h-4 group-hover:text-indigo-400 transition-all duration-300 animate-rotate-icon" />}
              {theme === 'system' && <Monitor className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-blue-200/50 dark:border-slate-600/50 animate-scale-in z-50">
            <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-all duration-200">
              <Sun className="w-4 h-4 mr-2 text-amber-500" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-all duration-200">
              <Moon className="w-4 h-4 mr-2 text-indigo-500" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')} className="hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200">
              <Monitor className="w-4 h-4 mr-2 text-blue-500" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group hover-lift"
        >
          <Settings className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:rotate-90 transition-all duration-300" />
        </Button>

        {/* Divider */}
        <div className="h-6 w-px bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-700 animate-scale-in"></div>

        {/* User Profile */}
        <div className="animate-scale-in">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-2 ring-blue-200 dark:ring-blue-700 hover:ring-blue-300 dark:hover:ring-blue-600 transition-all duration-300 hover:scale-110",
                userButtonPopoverCard: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-blue-200/50 dark:border-slate-600/50 animate-scale-in z-50"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}
