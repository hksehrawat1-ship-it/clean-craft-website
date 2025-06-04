
import { 
  preloadCriticalResources, 
  trackCoreWebVitals, 
  checkPerformanceBudget 
} from "./seo-performance";

export function initializePerformanceOptimizations() {
  // Preload critical resources
  preloadCriticalResources();
  
  // Track Core Web Vitals
  trackCoreWebVitals();
  
  // Check performance budget
  checkPerformanceBudget();
  
  // Add critical CSS to document head
  const criticalStyle = document.createElement('style');
  criticalStyle.textContent = `
    /* Critical CSS for above-the-fold content */
    body { font-family: Inter, sans-serif; margin: 0; line-height: 1.6; }
    .hero-section { min-height: 60vh; }
    .navbar { position: sticky; top: 0; z-index: 50; }
    .loading-spinner { display: flex; justify-content: center; align-items: center; }
  `;
  document.head.appendChild(criticalStyle);
}
