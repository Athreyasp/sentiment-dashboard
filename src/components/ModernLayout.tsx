
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ModernSidebar } from './ModernSidebar'
import { MobileSidebar } from './MobileSidebar'
import { Header } from './Header'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModernLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <ModernSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header with Sidebar Trigger */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <MobileSidebar>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </MobileSidebar>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00C49F] to-[#0088CC] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">SENTINEL</span>
          </div>
          
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto">
          <div className={cn(
            "mx-auto p-6 space-y-6 transition-all duration-300",
            sidebarCollapsed ? "max-w-7xl" : "max-w-6xl"
          )}>
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-4 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2 group hover:text-[#00C49F] transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">🔒 Bank-level Security</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-2 group hover:text-[#00C49F] transition-colors">
                <span className="font-medium">🤖 AI-Powered Analytics</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-2 group hover:text-[#00C49F] transition-colors">
                <span className="font-medium">⚡ Real-time Data Feed</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
