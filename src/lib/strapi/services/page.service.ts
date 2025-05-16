import { getCollection } from '../client';
import { StrapiPage } from '@/types/strapi';
import pagesConfig from '@/config/pages.yaml';

export class PageService {
  private static instance: PageService;

  private constructor() {}

  public static getInstance(): PageService {
    if (!PageService.instance) {
      PageService.instance = new PageService();
    }
    return PageService.instance;
  }

  private getPageFromConfig(slug: string, countryCode: string) {
    // Get global pages
    const globalPages = pagesConfig.global.pages || [];
    
    // Get country specific pages
    const countryConfig = pagesConfig[countryCode.toLowerCase()] || { pages: [] };
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
          const childPage = parentPage.children.find(c => {
            const childSlug = c.path.replace(/^\//, '');
            return childSlug === slug;
          });
          if (childPage) return childPage;
        }
      }
    }

    return page;
  }

  async getPage(slug: string, countryCode: string): Promise<any> {
    const page = this.getPageFromConfig(slug, countryCode);
    if (!page) {
      throw new Error(`Page not found: ${slug}`);
    }
    
    // Return in a format similar to Strapi response for compatibility
    return {
      id: slug,
      attributes: {
        title: page.title,
        slug: slug,
        path: page.path,
        navbar: page.navbar,
        children: page.children
      }
    };
  }

  async getPageSEO(slug: string, countryCode: string) {
    const page = this.getPageFromConfig(slug, countryCode);
    if (!page) {
      throw new Error(`Page SEO not found: ${slug}`);
    }

    // Return basic SEO attributes
    return {
      title: page.title,
      seo_title: page.title,
      seo_description: `${page.title} - CleanCraft Professional Laundry Services`
    };
  }
} 