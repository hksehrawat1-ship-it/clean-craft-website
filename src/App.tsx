
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "./contexts/CountryContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import CookieConsentBanner from "./components/CookieConsentBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/learning/Courses";
import Book from "./pages/learning/Book";
import Policies from "./pages/policies/index";
import WarrantyPolicy from "./pages/policies/WarrantyPolicy";
import RefundPolicy from "./pages/policies/RefundPolicy";
import CancellationPolicy from "./pages/policies/CancellationPolicy";
import ShippingPolicy from "./pages/policies/ShippingPolicy";
import CoachingRegistration from "./pages/policies/CoachingRegistration";
import EbookPolicy from "./pages/policies/EbookPolicy";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsConditionPolicy from "./pages/policies/TermsConditionPolicy";
import CountryRedirect from "./components/CountryRedirect";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  // This ensures it's properly initialized within the React component lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CountryProvider>
            <CookieConsentProvider>
              <Routes>
                {/* Root route shows country selection */}
                <Route path="/" element={<CountryRedirect />} />
                
                {/* Country-specific routes */}
                <Route path="/:countryCode" element={<Index />} />
                <Route path="/:countryCode/learning/courses" element={<Courses />} />
                <Route path="/:countryCode/learning/book" element={<Book />} />
                <Route path="/:countryCode/policies" element={<Policies />} />
                <Route path="/:countryCode/policies/warranty" element={<WarrantyPolicy />} />
                <Route path="/:countryCode/policies/refund" element={<RefundPolicy />} />
                <Route path="/:countryCode/policies/cancellation" element={<CancellationPolicy />} />
                <Route path="/:countryCode/policies/shipping" element={<ShippingPolicy />} />
                <Route path="/:countryCode/policies/coaching-registration" element={<CoachingRegistration />} />
                <Route path="/:countryCode/policies/ebook" element={<EbookPolicy />} />
                <Route path="/:countryCode/policies/privacy" element={<PrivacyPolicy />} />
                <Route path="/:countryCode/policies/terms-conditions" element={<TermsConditionPolicy />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Cookie Banner */}
              <CookieConsentBanner />
            </CookieConsentProvider>
          </CountryProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
