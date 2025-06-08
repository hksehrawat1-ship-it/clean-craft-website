
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
    // Fetch from public directory instead of src/config
    const response = await fetch('/src/config/pages.yaml');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages.yaml: ${response.status} ${response.statusText}`);
    }
    
    const yamlText = await response.text();
    
    // Check if the response is actually YAML content
    if (!yamlText || yamlText.trim().length === 0) {
      throw new Error('Empty YAML response');
    }
    
    // Log the first few lines to debug
    console.log('YAML content preview:', yamlText.substring(0, 200));
    
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
