
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CountryProvider } from "./contexts/CountryContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CountryProvider>
          <Routes>
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
            
            {/* Root route redirects to country-specific route */}
            <Route path="/" element={<CountryRedirect />} />
            
            {/* Legacy routes - redirect to country-specific routes */}
            <Route path="/learning/courses" element={<CountryRedirect path="/learning/courses" />} />
            <Route path="/learning/book" element={<CountryRedirect path="/learning/book" />} />
            <Route path="/policies" element={<CountryRedirect path="/policies" />} />
            <Route path="/policies/warranty" element={<CountryRedirect path="/policies/warranty" />} />
            <Route path="/policies/refund" element={<CountryRedirect path="/policies/refund" />} />
            <Route path="/policies/cancellation" element={<CountryRedirect path="/policies/cancellation" />} />
            <Route path="/policies/shipping" element={<CountryRedirect path="/policies/shipping" />} />
            <Route path="/policies/coaching-registration" element={<CountryRedirect path="/policies/coaching-registration" />} />
            <Route path="/policies/ebook" element={<CountryRedirect path="/policies/ebook" />} />
            <Route path="/policies/privacy" element={<CountryRedirect path="/policies/privacy" />} />
            <Route path="/policies/terms-conditions" element={<CountryRedirect path="/policies/terms-conditions" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CountryProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
