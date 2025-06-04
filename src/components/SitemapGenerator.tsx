
import React, { useEffect } from 'react';
import { generateSitemapXML, generateRobotsTxt } from '@/utils/sitemap';

export function SitemapGenerator() {
  useEffect(() => {
    // Generate and serve sitemap.xml
    const generateSitemap = () => {
      const sitemapXML = generateSitemapXML();
      const blob = new Blob([sitemapXML], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // In a real implementation, this would be served by the server
      console.log('Generated sitemap.xml:', sitemapXML);
    };

    // Generate and serve robots.txt
    const generateRobots = () => {
      const isDevelopment = import.meta.env.DEV;
      const robotsTxt = generateRobotsTxt(isDevelopment);
      
      console.log('Generated robots.txt:', robotsTxt);
    };

    generateSitemap();
    generateRobots();
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
