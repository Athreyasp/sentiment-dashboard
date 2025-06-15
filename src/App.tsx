
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

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient()

function App() {
  const { isLoading } = usePreloader()

  if (isLoading) {
    return <Preloader />
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
