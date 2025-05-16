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
  
  const getConfig = (): PageConfig[] => {
    // Start with global pages
    const globalPages = (pagesConfig.global as CountryPages).pages || [];
    
    if (!currentCountry) {
      return globalPages;
    }

    const countryCode = currentCountry.code.toLowerCase();
    const countryConfig = pagesConfig[countryCode] as CountryPages;

    if (!countryConfig) {
      return globalPages;
    }

    // Merge country-specific pages with global pages
    // Country-specific pages override global ones if they have the same path
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
  };

  const isPageEnabled = (path: string): boolean => {
    const pages = getConfig();
    const findInPages = (pagesArray: PageConfig[], searchPath: string): boolean => {
      for (const page of pagesArray) {
        if (page.path === searchPath) return true;
        if (page.children?.some(child => child.path === searchPath)) return true;
      }
      return false;
    };
    
    return findInPages(pages, path);
  };

  const getNavbarItems = () => {
    const pages = getConfig();
    const navbarItems = pages
      .filter(page => page.navbar)
      .map(page => ({
        path: page.path,
        title: page.title,
        order: page.order || 999,
        children: page.children
          ?.filter(child => child.navbar)
          .map(child => ({
            path: child.path,
            title: child.title,
            order: child.order || 999
          }))
          .sort((a, b) => (a.order || 999) - (b.order || 999))
      }))
      .sort((a, b) => (a.order || 999) - (b.order || 999));

    return navbarItems;
  };

  return {
    isPageEnabled,
    getNavbarItems,
    config: getConfig()
  };
} 