
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { Layout } from '@/components/Layout'
import { AuthLayout } from '@/components/AuthLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { usePreloader } from '@/hooks/usePreloader'
import { Preloader } from '@/components/Preloader'

// Pages
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Portfolio from '@/pages/Portfolio'
import TickerInsights from '@/pages/TickerInsights'
import Alerts from '@/pages/Alerts'
import Explainer from '@/pages/Explainer'
import NotFound from '@/pages/NotFound'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// If no key is provided, show a development message
if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication features will be limited.")
}

const queryClient = new QueryClient()

function App() {
  const { isLoading } = usePreloader()

  if (isLoading) {
    return <Preloader />
  }

  // If no Clerk key, show app without authentication
  if (!PUBLISHABLE_KEY) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h1 className="text-4xl font-bold mb-4">Sentinel Dashboard</h1>
              <p className="text-xl mb-6">Please configure your Clerk publishable key to enable authentication.</p>
              <p className="text-slate-300">Add VITE_CLERK_PUBLISHABLE_KEY to your environment variables.</p>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    )
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<AuthLayout><Index /></AuthLayout>} />
              
              {/* Protected dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="ticker-insights" element={<TickerInsights />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="explainer" element={<Explainer />} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default App
