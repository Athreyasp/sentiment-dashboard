
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { usePreloader } from "@/hooks/usePreloader";
import { Preloader } from "@/components/Preloader";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import TickerInsights from "./pages/TickerInsights";
import Portfolio from "./pages/Portfolio";
import Alerts from "./pages/Alerts";
import Explainer from "./pages/Explainer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const isLoading = usePreloader(2500);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="sentinel-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
