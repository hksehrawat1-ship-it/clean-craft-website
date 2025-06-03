import { getCollection } from '../client';
import { StrapiService, StrapiTestimonial, StrapiFAQ, StrapiPolicy } from '@/types/strapi';
import { API } from '@strapi/client';

// Define valid categories
export type ContentCategory = 'home' | 'courses' | 'book' | 'franchise' | 'policies';

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

export class ContentService {
    private static instance: ContentService;

    private constructor() { }

    public static getInstance(): ContentService {
        if (!ContentService.instance) {
            ContentService.instance = new ContentService();
        }
        return ContentService.instance;
    }

    async getServices(countryCode: string, locale?: string): Promise<StrapiResponse<StrapiService>> {
        const params: API.BaseQueryParams = {
            populate: '*',
            filters: {
                country: {
                    code: {
                        $eq: countryCode
                    }
                }
            },
            sort: ['name:asc']
        };

        if (locale) {
            params.locale = locale;
        }

        const response = await getCollection<StrapiService>('services', params);
        console.log('Services API response:', response);
        return response;
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

        if (category) {
            filters.category = { $eq: category };
        }

        if (platform) {
            filters.platform = { $eq: platform };
        }

        const params: API.BaseQueryParams = {
            populate: '*',
            filters,
            sort: [`${sortBy}:${sortOrder}`],
            locale
        };

        return getCollection<StrapiTestimonial>('testimonials', params);
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

        if (category) {
            filters.category = { $eq: category };
        }

        const params: API.BaseQueryParams = {
            populate: '*',
            filters,
            sort: [`${sortBy}:${sortOrder}`],
            locale
        };

        return getCollection<StrapiFAQ>('faqs', params);
    }

    async getPolicies(countryCode: string, locale?: string): Promise<StrapiResponse<StrapiPolicy>> {
        const params: API.BaseQueryParams = {
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

        return getCollection<StrapiPolicy>('policies', params);
    }
}

// Export singleton instance
export const contentService = ContentService.getInstance(); 