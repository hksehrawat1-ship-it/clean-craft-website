import { loadYamlFile } from '@/lib/yaml-loader';
import { PageConfig, PageData } from '@/types/config';

export class PageService {
  private static instance: PageService;
  private pagesConfig: PageConfig | null = null;

  private constructor() {}

  public static getInstance(): PageService {
    if (!PageService.instance) {
      PageService.instance = new PageService();
    }
    return PageService.instance;
  }

  private async ensureConfig(): Promise<PageConfig> {
    if (!this.pagesConfig) {
      try {
        this.pagesConfig = await loadYamlFile<PageConfig>('/config/pages.yaml');
      } catch (error) {
        console.error('❌ Failed to load pages config:', error);
        // Return a minimal valid config
        return {
          countries: {},
          seo: { global: { defaults: { title_suffix: '', keywords_base: [], image: '' } }, pages: {} },
          global: { pages: [] }
        };
      }
    }
    return this.pagesConfig;
  }

  private async getPageFromConfig(slug: string, countryCode: string): Promise<PageData | null> {
    const config = await this.ensureConfig();
    
    // Get global pages
    const globalPages = config.global?.pages || [];
    
    // Get country specific pages
    const countryConfig = config[countryCode.toLowerCase()] || { pages: [] };
    const countryPages = countryConfig.pages || [];
    
    // Combine global and country pages
    const allPages = [...globalPages, ...countryPages];
    
    // Find the requested page
    const page = allPages.find(p => {
      // Remove leading slash for comparison
      const pageSlug = p.path.replace(/^\//, '');
      return pageSlug === slug || pageSlug === '';  // empty string for home page
    });

    if (!page) {
      // Also check children pages
      for (const parentPage of allPages) {
        if (parentPage.children) {
          const childPage = parentPage.children.find((c: PageData) => {
            const childSlug = c.path.replace(/^\//, '');
            return childSlug === slug;
          });
          if (childPage) return childPage;
        }
      }
    }

    return page || null;
  }

  private async getPageSEOFromConfig(slug: string, countryCode: string) {
    const config = await this.ensureConfig();
    
    // Get SEO configuration
    const seoConfig = config.seo?.pages || {};
    const pagePath = `/${slug}`.replace('//', '/'); // Normalize path
    
    // Get country-specific SEO data
    const pageSEO = seoConfig[pagePath]?.[countryCode.toLowerCase()];
    
    if (!pageSEO) {
      console.log(`No SEO data found for slug: ${slug}, country: ${countryCode}`);
      // Get the page from navigation config as fallback
      const page = await this.getPageFromConfig(slug, countryCode);
      if (page) {
        return {
          title: page.title,
          seo_title: `${page.title} | CleanCraft`,
          seo_description: `${page.title} - CleanCraft Professional Dry Cleaning and Laundry Services`
        };
      }
      return null;
    }

    return {
      title: pageSEO.title,
      seo_title: pageSEO.title,
      seo_description: pageSEO.description,
      keywords: pageSEO.keywords?.join(', ')
    };
  }

  async getPage(slug: string, countryCode: string): Promise<any> {
    const page = await this.getPageFromConfig(slug, countryCode);
    if (!page) {
      console.warn(`Page not found: ${slug} for country: ${countryCode}`);
      return null;
    }
    
    // Return in a format similar to Strapi response for compatibility
    return {
      id: slug,
      attributes: {
        title: page.title,
        slug: slug,
        path: page.path,
        navbar: page.navbar,
        children: page.children,
        sections: page.sections
      }
    };
  }

  async getPageSEO(slug: string, countryCode: string) {
    const seoData = await this.getPageSEOFromConfig(slug, countryCode);
    if (!seoData) {
      console.warn(`Page SEO not found: ${slug} for country: ${countryCode}`);
      return null;
    }
    return seoData;
  }
} 