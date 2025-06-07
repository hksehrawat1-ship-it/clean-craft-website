
import { lazy } from 'react';

// Image optimization utilities
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function generateImageSrcSet(src: string, widths: number[] = [320, 640, 1024, 1280]): string {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ');
}

export function getOptimizedImageSizes(
  breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }
): string {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries.slice(0, -1).map(([query, size]) => `${query} ${size}`);
  const defaultSize = breakpoints.default || '100vw';
  
  return [...mediaQueries, defaultSize].join(', ');
}

// Performance monitoring utilities
export interface CoreWebVitals {
  CLS: number;
  FID: number;
  LCP: number;
  FCP: number;
  TTFB: number;
}

export function trackCoreWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.startTime}`);
      // Here you would send to your analytics service
    });
  });

  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
}

// Resource preloading utilities
export function preloadCriticalResources(): void {
  if (typeof document === 'undefined') return;

  const criticalResources = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/lovable-uploads/cleancraft-full-logo.png', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });
}

// Lazy loading components for code splitting
export const LazyBookPage = lazy(() => import('@/pages/learning/Book'));
export const LazyCoursesPage = lazy(() => import('@/pages/learning/Courses'));
export const LazyFranchisePage = lazy(() => import('@/pages/Franchise'));
export const LazyPoliciesPage = lazy(() => import('@/pages/Policies'));

// Critical CSS extraction (to be used in build process)
export const criticalCSS = `
  /* Critical above-the-fold styles */
  body { font-family: Inter, sans-serif; margin: 0; }
  .hero-section { min-height: 60vh; }
  .navbar { position: sticky; top: 0; z-index: 50; }
  .loading-spinner { display: flex; justify-content: center; align-items: center; }
`;

// Performance budget checker
export interface PerformanceBudget {
  maxBundleSize: number; // KB
  maxImageSize: number; // KB
  maxFontSize: number; // KB
  maxJSExecutionTime: number; // ms
}

export const performanceBudget: PerformanceBudget = {
  maxBundleSize: 250, // 250KB
  maxImageSize: 100, // 100KB per image
  maxFontSize: 50, // 50KB per font
  maxJSExecutionTime: 50 // 50ms
};

export function checkPerformanceBudget(): void {
  if (typeof window === 'undefined') return;

  // Check bundle size
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        const transferSize = navEntry.transferSize;
        if (transferSize > performanceBudget.maxBundleSize * 1024) {
          console.warn(`Bundle size exceeded: ${transferSize / 1024}KB > ${performanceBudget.maxBundleSize}KB`);
        }
      }
    });
  });

  observer.observe({ entryTypes: ['navigation'] });
}
