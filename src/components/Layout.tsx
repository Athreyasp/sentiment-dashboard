
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Left Sidebar with Z-layout structure */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        {/* Center-aligned main dashboard */}
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-accent/5">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Trust footer */}
        <footer className="border-t bg-card/50 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-positive rounded-full animate-pulse"></div>
              <span>🔒 Secure & Encrypted</span>
            </div>
            <span>•</span>
            <span>🤖 AI-backed insights</span>
            <span>•</span>
            <span>Real-time market data</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
