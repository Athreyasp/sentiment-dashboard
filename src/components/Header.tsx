
import { Bell, Search, Settings, Sun, Moon, Monitor } from 'lucide-react'
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

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tickers, news..."
            className="pl-10 w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="w-4 h-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === 'light' && <Sun className="w-4 h-4" />}
              {theme === 'dark' && <Moon className="w-4 h-4" />}
              {theme === 'system' && <Monitor className="w-4 h-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor className="w-4 h-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>

        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </div>
    </header>
  )
}
