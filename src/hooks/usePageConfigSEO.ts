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
    // Try fetching from both possible locations
    let response;
    let yamlText;
    
    // First try the config directory
    response = await fetch('/config/pages.yaml');
    if (response.ok) {
      yamlText = await response.text();
    } else {
      // If not found, try the root directory
      response = await fetch('/pages.yaml');
      if (!response.ok) {
        throw new Error(`Failed to fetch pages.yaml: ${response.status} ${response.statusText}`);
      }
      yamlText = await response.text();
    }
    
    // Check if the response is actually YAML content
    if (!yamlText || yamlText.trim().length === 0) {
      throw new Error('Empty YAML response');
    }
    
    try {
      pagesData = yaml.load(yamlText) as PagesSEOData;
    } catch (yamlError) {
      console.error('YAML parsing error:', yamlError);
      throw new Error(`YAML parsing failed: ${yamlError}`);
    }
    
    // Validate the structure
    if (!pagesData?.seo) {
      throw new Error('Invalid YAML structure: missing seo section');
    }
    
    return pagesData;
  } catch (error) {
    console.error('Error loading pages.yaml:', error);
    // Return fallback data
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
        console.log('SEO Data from YAML:', data);
        const countryCode = currentCountry?.toLowerCase() || 'in';
        
        // Get page-specific SEO data
        const pageSEO = data.seo?.pages?.[slug]?.[countryCode];
        const globalDefaults = data.seo?.global?.defaults;
        
        if (!pageSEO) {
          console.log(`No SEO data found for slug: ${slug}, country: ${countryCode}`);
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
