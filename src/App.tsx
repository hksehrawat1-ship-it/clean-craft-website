import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learning/courses" element={<Courses />} />
          <Route path="/learning/book" element={<Book />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/warranty" element={<WarrantyPolicy />} />
          <Route path="/policies/refund" element={<RefundPolicy />} />
          <Route path="/policies/cancellation" element={<CancellationPolicy />} />
          <Route path="/policies/shipping" element={<ShippingPolicy />} />
          <Route path="/policies/coaching-registration" element={<CoachingRegistration />} />
          <Route path="/policies/ebook" element={<EbookPolicy />} />
          <Route path="/policies/privacy" element={<PrivacyPolicy />} />
          <Route path="/policies/terms-conditions" element={<TermsConditionPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
