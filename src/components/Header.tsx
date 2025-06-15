
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
    <header className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-700/50 backdrop-blur-sm flex items-center justify-between px-6 shadow-lg animate-fade-in">
      {/* Enhanced Search Bar */}
      <div className="flex-1 max-w-2xl animate-slide-up">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[#00C49F] transition-all duration-300 group-focus-within:scale-110" />
          <Input
            placeholder="Search tickers, news, sectors..."
            className="pl-12 pr-16 h-12 bg-slate-800/70 dark:bg-slate-900/70 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/20 transition-all duration-300 backdrop-blur-sm hover:bg-slate-800/80 dark:hover:bg-slate-900/80 rounded-lg font-medium"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-slate-600 bg-slate-700/80 px-2 font-mono text-xs font-medium text-slate-300 opacity-100 transition-opacity duration-200 group-focus-within:opacity-60">
              ⌘K
            </kbd>
          </div>
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00C49F]/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
        </div>
      </div>

      {/* Enhanced User Profile Section */}
      <div className="flex items-center space-x-4 animate-fade-in animate-stagger-2">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-slate-700/50 transition-all duration-300 group hover:scale-105"
        >
          <Bell className="w-5 h-5 text-slate-300 group-hover:text-[#00C49F] transition-all duration-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
        </Button>
        
        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-slate-700/50 transition-all duration-300 group hover:scale-105"
            >
              {theme === 'light' && <Sun className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-all duration-300" />}
              {theme === 'dark' && <Moon className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-all duration-300" />}
              {theme === 'system' && <Monitor className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-all duration-300" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-600/50 animate-scale-in z-50">
            <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-amber-900/20 transition-all duration-200 text-slate-200">
              <Sun className="w-4 h-4 mr-2 text-amber-400" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-indigo-900/20 transition-all duration-200 text-slate-200">
              <Moon className="w-4 h-4 mr-2 text-indigo-400" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')} className="hover:bg-blue-900/20 transition-all duration-200 text-slate-200">
              <Monitor className="w-4 h-4 mr-2 text-blue-400" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-slate-700/50 transition-all duration-300 group hover:scale-105"
        >
          <Settings className="w-5 h-5 text-slate-300 group-hover:text-[#00C49F] group-hover:rotate-90 transition-all duration-300" />
        </Button>

        {/* Divider */}
        <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent"></div>

        {/* Enhanced User Profile */}
        <div className="relative animate-scale-in">
          {/* Online status indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C49F] rounded-full border-2 border-slate-900 z-10 animate-pulse">
            <div className="w-full h-full bg-[#00C49F] rounded-full animate-ping opacity-75"></div>
          </div>
          
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 ring-2 ring-[#00C49F]/30 hover:ring-[#00C49F]/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#00C49F]/20",
                userButtonPopoverCard: "bg-slate-800/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-600/50 animate-scale-in z-50"
              }
            }}
          />
          
          {/* Glowing ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00C49F]/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-md animate-pulse"></div>
        </div>
      </div>
    </header>
  )
}
