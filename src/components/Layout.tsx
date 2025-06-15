
import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './DashboardSidebar'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex w-full">
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
        
        {/* Footer */}
        <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2 group hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">🔒 Bank-level Security</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-2 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="font-medium">🤖 AI-Powered Analytics</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-2 group hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <span className="font-medium">⚡ Real-time Data Feed</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
