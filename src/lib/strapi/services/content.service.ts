import { getCollection } from '../client';
import {
  StrapiService,
  StrapiTestimonial,
  StrapiFAQ,
  StrapiPolicy,
  StrapiBlog,
  StrapiBlogCategory
} from '@/types/strapi';

export type ContentCategory = 'home' | 'courses' | 'book' | 'franchise' | 'policies' | 'blog';

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BaseQueryParams {
  populate?: string;
  filters?: any;
  sort?: string[];
  locale?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

// 🧹 Helper to remove undefined/null values
function cleanParams(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanParams);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, cleanParams(v)])
    );
  }
  return obj;
}

export class ContentService {
  private static instance: ContentService;

  private constructor() {}

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  async getBlogs(
    countryCode: string,
    options?: {
      category?: string;
      featured?: boolean;
      page?: number;
      pageSize?: number;
      locale?: string;
      sortBy?: 'publishedDate' | 'createdAt';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<StrapiResponse<StrapiBlog>> {
    const {
      category,
      featured,
      page = 1,
      pageSize = 12,
      locale,
      sortBy = 'publishedDate',
      sortOrder = 'desc'
    } = options || {};

    const filters: any = {
      country: {
        code: {
          $eq: countryCode
        }
      }
    };

    if (category !== undefined) {
      filters.blog_category = {
        slug: { $eq: category }
      };
    }

    if (featured !== undefined) {
      filters.is_featured = { $eq: featured };
    }

    const params: BaseQueryParams = {
      populate: '*',
      filters,
      sort: [`${sortBy}:${sortOrder}`],
      pagination: {
        page,
        pageSize
      },
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiBlog>('blogs', cleanedParams);
  }

  async getBlogBySlug(
    slug: string,
    countryCode: string,
    locale?: string
  ): Promise<StrapiBlog | null> {
    const params: BaseQueryParams = {
      populate: '*',
      filters: {
        slug: { $eq: slug },
        country: {
          code: { $eq: countryCode }
        }
      },
      locale
    };

    const cleanedParams = cleanParams(params);
    const response = await getCollection<StrapiBlog>('blogs', cleanedParams);
    return response.data.length > 0 ? response.data[0] : null;
  }

  async getBlogCategories(
    countryCode?: string,
    locale?: string
  ): Promise<StrapiResponse<StrapiBlogCategory>> {
    const filters: any = {};

    if (countryCode) {
      filters.country = {
        code: { $eq: countryCode }
      };
    }

    const params: BaseQueryParams = {
      populate: '*',
      filters,
      sort: ['name:asc'],
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiBlogCategory>('blog-categories', cleanedParams);
  }

  async getServices(countryCode: string, locale?: string): Promise<StrapiResponse<StrapiService>> {
    const params: BaseQueryParams = {
      populate: '*',
      filters: {
        country: {
          code: {
            $eq: countryCode
          }
        }
      },
      sort: ['name:asc'],
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiService>('services', cleanedParams);
  }

  async getTestimonials(
    countryCode: string,
    options?: {
      category?: ContentCategory;
      platform?: string;
      locale?: string;
      sortBy?: 'rating' | 'order';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<StrapiResponse<StrapiTestimonial>> {
    const { category, platform, locale, sortBy = 'rating', sortOrder = 'desc' } = options || {};

    const filters: any = {
      country: {
        code: {
          $eq: countryCode
        }
      }
    };

    if (category !== undefined) {
      filters.category = { $eq: category };
    }

    if (platform !== undefined) {
      filters.platform = { $eq: platform };
    }

    const params: BaseQueryParams = {
      populate: '*',
      filters,
      sort: [`${sortBy}:${sortOrder}`],
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiTestimonial>('testimonials', cleanedParams);
  }

  async getFAQs(
    countryCode: string,
    options?: {
      category?: ContentCategory;
      locale?: string;
      sortBy?: 'order';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<StrapiResponse<StrapiFAQ>> {
    const { category, locale, sortBy = 'order', sortOrder = 'asc' } = options || {};

    const filters: any = {
      country: {
        code: {
          $eq: countryCode
        }
      }
    };

    if (category !== undefined) {
      filters.category = { $eq: category };
    }

    const params: BaseQueryParams = {
      populate: '*',
      filters,
      sort: [`${sortBy}:${sortOrder}`],
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiFAQ>('faqs', cleanedParams);
  }

  async getPolicies(countryCode: string, locale?: string): Promise<StrapiResponse<StrapiPolicy>> {
    const params: BaseQueryParams = {
      populate: '*',
      filters: {
        country: {
          code: {
            $eq: countryCode
          }
        }
      },
      locale
    };

    const cleanedParams = cleanParams(params);
    return getCollection<StrapiPolicy>('policies', cleanedParams);
  }
}

export const contentService = ContentService.getInstance();
