import { useMemo, useCallback } from 'react';
import { useCountry } from '@/contexts/CountryContext';
import pagesConfig from '../config/pages.yaml';

interface PageConfig {
  path: string;
  navbar?: boolean;
  title?: string;
  order?: number;
  children?: PageConfig[];
}

interface CountryPages {
  pages: PageConfig[];
}

export function usePagesConfig() {
  const { currentCountry } = useCountry();

  const getConfig = useCallback((): PageConfig[] => {
    const globalPages = (pagesConfig.global as CountryPages).pages || [];

    if (!currentCountry) {
      return globalPages;
    }

    const countryCode = currentCountry.toLowerCase();
    const countryConfig = pagesConfig[countryCode] as CountryPages;

    if (!countryConfig) {
      return globalPages;
    }

    const countryPages = countryConfig.pages || [];
    const mergedPages = [...globalPages];

    countryPages.forEach(countryPage => {
      const existingIndex = mergedPages.findIndex(p => p.path === countryPage.path);
      if (existingIndex >= 0) {
        mergedPages[existingIndex] = countryPage;
      } else {
        mergedPages.push(countryPage);
      }
    });

    return mergedPages;
  }, [currentCountry]);

  const isPageEnabled = useCallback((path: string): boolean => {
    const pages = getConfig();
    const findInPages = (pagesArray: PageConfig[], searchPath: string): boolean => {
      for (const page of pagesArray) {
        if (page.path === searchPath) return true;
        if (page.children?.some(child => child.path === searchPath)) return true;
      }
      return false;
    };

    return findInPages(pages, path);
  }, [getConfig]);

  const getNavbarItems = useCallback(() => {
    return getConfig().filter(page => page.navbar);
  }, [getConfig]);

  return useMemo(() => ({
    getConfig,
    isPageEnabled,
    getNavbarItems,
  }), [getConfig, isPageEnabled, getNavbarItems]);
}
