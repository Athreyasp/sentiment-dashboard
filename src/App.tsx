
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { usePreloader } from './hooks/usePreloader'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TickerInsights from './pages/TickerInsights'
import Portfolio from './pages/Portfolio'
import Alerts from './pages/Alerts'
import Explainer from './pages/Explainer'
import NotFound from './pages/NotFound'
import { Preloader } from './components/Preloader'
import { ModernLayout } from './components/ModernLayout'
import { ThemeProvider } from './hooks/useTheme'

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error("REACT_APP_CLERK_PUBLISHABLE_KEY is not defined")
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient()

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY!;

function App() {
  const isLoading = usePreloader()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <ThemeProvider defaultTheme="system" storageKey="sentinel-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <ModernLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="ticker" element={<TickerInsights />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="alerts" element={<Alerts />} />
                  <Route path="explainer" element={<Explainer />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default App
