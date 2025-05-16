import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CountryProvider } from "./contexts/CountryContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import CookieConsentBanner from "./components/CookieConsentBanner";
import CountryRouteGuard from "./components/CountryRouteGuard";
import CountryRedirect from "./components/CountryRedirect";
import { useState } from "react";
import { HelmetProvider } from 'react-helmet-async';

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/learning/Courses";
import Book from "./pages/learning/Book";
import Policies from "./pages/Policies";
import PolicyDetails from "./pages/PolicyDetails";

// Here's what's happening in this App component:

// 1. Setup and Configuration:
// - Creates a QueryClient instance for handling API requests/caching
// - Sets up various UI providers (Toaster, Tooltip) for notifications and tooltips
function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieConsentProvider>
              <CountryProvider>
                <Routes>
                  {/* Root route - handles initial country detection */}
                  <Route path="/" element={<CountryRedirect />} />
                  
                  {/* Country-specific routes */}
                  <Route path="/:countryCode">
                    {/* Main landing page for each country */}
                    <Route index element={
                      <CountryRouteGuard pagePath="/" element={<Index />} />
                    } />

                    {/* Learning Routes - only available for India */}
                    <Route path="learning">
                      <Route path="courses" element={
                        <CountryRouteGuard pagePath="/learning/courses" element={<Courses />} />
                      } />
                      <Route path="book" element={
                        <CountryRouteGuard pagePath="/learning/book" element={<Book />} />
                      } />
                    </Route>
                    
                    {/* Policy Routes - available for both India and Australia */}
                    <Route path="policies">
                      <Route index element={
                        <CountryRouteGuard pagePath="/policies" element={<Policies />} />
                      } />
                      <Route path=":slug" element={
                        <CountryRouteGuard pagePath="/policies" element={<PolicyDetails />} />
                      } />
                    </Route>
                  </Route>
                  
                  {/* Catch-all route for 404 errors */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                
                {/* Global Components */}
                <CookieConsentBanner />
              </CountryProvider>
            </CookieConsentProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
