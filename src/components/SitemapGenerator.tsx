
import React, { useEffect } from 'react';
import { generateSitemapXML, generateRobotsTxt } from '@/utils/sitemap';

export function SitemapGenerator() {
  useEffect(() => {
    // Generate and log sitemap for development debugging
    const generateDevSitemap = () => {
      const sitemapXML = generateSitemapXML();
      console.log('Generated sitemap.xml for development:', sitemapXML);
    };

    // Generate and log robots.txt for development debugging
    const generateDevRobots = () => {
      const isDevelopment = import.meta.env.DEV;
      const robotsTxt = generateRobotsTxt(isDevelopment);
      console.log('Generated robots.txt for development:', robotsTxt);
    };

    // Only run in development for debugging
    if (import.meta.env.DEV) {
      generateDevSitemap();
      generateDevRobots();
    }
  }, []);

  return null; // This component doesn't render anything
}

// Hook for programmatic sitemap access
export function useSitemap() {
  const getSitemapXML = () => generateSitemapXML();
  const getRobotsTxt = () => {
    const isDevelopment = import.meta.env.DEV;
    return generateRobotsTxt(isDevelopment);
  };

  return { getSitemapXML, getRobotsTxt };
}
