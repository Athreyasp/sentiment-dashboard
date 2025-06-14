
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from "@/hooks/useTheme";
import { usePreloader } from "@/hooks/usePreloader";
import { Preloader } from "@/components/Preloader";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthLayout } from "@/components/AuthLayout";
import Dashboard from "./pages/Dashboard";
import TickerInsights from "./pages/TickerInsights";
import Portfolio from "./pages/Portfolio";
import Alerts from "./pages/Alerts";
import Explainer from "./pages/Explainer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// You need to add your Clerk publishable key here
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Component to show when Clerk key is missing
const MissingKeyMessage = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-card border rounded-lg p-6 text-center">
      <div className="text-destructive text-4xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold mb-4">Setup Required</h1>
      <p className="text-muted-foreground mb-6">
        To use authentication features, please add your Clerk publishable key to the environment variables.
      </p>
      <div className="bg-muted p-4 rounded-md text-left mb-4">
        <p className="text-sm font-mono">VITE_CLERK_PUBLISHABLE_KEY</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Get your key from{' '}
        <a 
          href="https://go.clerk.com/lovable" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          go.clerk.com/lovable
        </a>
      </p>
    </div>
  </div>
);

const AppContent = () => {
  const isLoading = usePreloader(2500);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />
        <Route path="/signup" element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        } />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ticker" element={<TickerInsights />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="explainer" element={<Explainer />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  // Show setup message if Clerk key is missing
  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="sentinel-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <MissingKeyMessage />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="sentinel-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
