import { useState, useEffect } from "react";
import { AppProviders } from "./components/AppProviders";
import { AppRoutes } from "./components/AppRoutes";
import { createQueryClient } from "./config/query-client";
import { initializePerformanceOptimizations } from "./utils/performance-setup";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [queryClient] = useState(() => createQueryClient());

  // Initialize performance optimizations
  useEffect(() => {
    initializePerformanceOptimizations();
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <ScrollToTop />
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
