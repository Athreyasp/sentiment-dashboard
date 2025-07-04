
import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './DashboardSidebar'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Fixed Sidebar */}
      <DashboardSidebar />
      
      {/* Main content area with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={() => {}} />
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <Outlet />
          </div>
        </main>
        
        {/* Pixel-themed Footer */}
        <footer className="border-t border-pixel-green/20 bg-card/50 backdrop-blur-sm px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2 group hover:text-pixel-green transition-colors font-pixel">
                <div className="w-2 h-2 bg-pixel-green rounded-full animate-pixel-pulse"></div>
                <span className="font-medium">🔒 SECURE TRADING</span>
              </div>
              <div className="w-px h-4 bg-pixel-green/30"></div>
              <div className="flex items-center space-x-2 group hover:text-pixel-cyan transition-colors font-pixel">
                <span className="font-medium">🤖 AI-POWERED INSIGHTS</span>
              </div>
              <div className="w-px h-4 bg-pixel-green/30"></div>
              <div className="flex items-center space-x-2 group hover:text-pixel-orange transition-colors font-pixel">
                <span className="font-medium">⚡ REAL-TIME NSE/BSE DATA</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
