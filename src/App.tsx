import { useState, useEffect } from "react";
import { AppProviders } from "./components/AppProviders";
import { AppRoutes } from "./components/AppRoutes";
import { createQueryClient } from "./config/query-client";
import { initializePerformanceOptimizations } from "./utils/performance-setup";
import ScrollToTop from "./components/ScrollToTop";
import OfferPopup from "./components/OfferPopup";

function App() {
  const [queryClient] = useState(() => createQueryClient());

  // Initialize performance optimizations
  useEffect(() => {
    initializePerformanceOptimizations();
    console.log("🔥 Ye log sirf development me dikhna chahiye");
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <ScrollToTop />
      <AppRoutes />
      <OfferPopup />
    </AppProviders>
  );
}

export default App;
