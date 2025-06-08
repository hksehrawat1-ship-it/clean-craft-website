
import { useState, useEffect } from 'react';
import { useCountry } from '@/contexts/CountryContext';
import yaml from 'js-yaml';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

interface PagesSEOData {
  seo: {
    global: {
      defaults: {
        title_suffix: string;
        keywords_base: string[];
        image: string;
      };
    };
    pages: {
      [path: string]: {
        [country: string]: SEOConfig;
      };
    };
  };
}

let pagesData: PagesSEOData | null = null;

async function loadPagesYaml(): Promise<PagesSEOData> {
  if (pagesData) return pagesData;
  
  try {
    const response = await fetch('/src/config/pages.yaml');
    const yamlText = await response.text();
    pagesData = yaml.load(yamlText) as PagesSEOData;
    return pagesData;
  } catch (error) {
    console.error('Error loading pages.yaml:', error);
    return {
      seo: {
        global: {
          defaults: {
            title_suffix: ' | CleanCraft',
            keywords_base: ['professional cleaning', 'garment care'],
            image: 'https://cleancraft.com/lovable-uploads/cleancraft-full-logo.png'
          }
        },
        pages: {}
      }
    };
  }
}

export function usePageConfigSEO(slug: string) {
  const { currentCountry } = useCountry();
  const [seoData, setSeoData] = useState<{
    seo_title: string;
    seo_description: string | undefined;
    seo_keywords: string;
    seo_image: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadSEOData() {
      setIsLoading(true);
      try {
        const data = await loadPagesYaml();
        const countryCode = currentCountry?.toLowerCase() || 'in';
        
        // Get page-specific SEO data
        const pageSEO = data.seo?.pages?.[slug]?.[countryCode];
        const globalDefaults = data.seo?.global?.defaults;
        
        if (!pageSEO) {
          setSeoData(null);
          setIsLoading(false);
          return;
        }
        
        // Combine keywords
        const keywords = [
          ...(pageSEO.keywords || []),
          ...(globalDefaults?.keywords_base || [])
        ];
        
        setSeoData({
          seo_title: pageSEO.title + (globalDefaults?.title_suffix || ''),
          seo_description: pageSEO.description,
          seo_keywords: keywords.join(', '),
          seo_image: pageSEO.image || globalDefaults?.image || 'https://cleancraft.com/lovable-uploads/cleancraft-full-logo.png'
        });
      } catch (error) {
        console.error('Error processing SEO data:', error);
        setSeoData(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadSEOData();
  }, [slug, currentCountry]);
  
  return {
    data: seoData,
    isLoading
  };
}
