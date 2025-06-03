
import { getCollection } from '../client';
import { StrapiService, StrapiTestimonial, StrapiFAQ, StrapiPolicy } from '@/types/strapi';

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
        try {
            const params: any = {
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

            console.log(`🔍 Fetching services for country: ${countryCode}`);
            const response = await getCollection<StrapiService>('services', params);
            console.log(`📋 Services response:`, response);
            return response;
        } catch (error) {
            console.error('❌ ContentService.getServices error:', error);
            // Return empty response instead of throwing
            return {
                data: [],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 0,
                        pageCount: 0,
                        total: 0,
                    },
                },
            };
        }
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
        try {
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

            const params: any = {
                populate: '*',
                filters,
                sort: [`${sortBy}:${sortOrder}`],
            };

            if (locale) {
                params.locale = locale;
            }

            console.log(`🔍 Fetching testimonials for country: ${countryCode}, category: ${category}`);
            const response = await getCollection<StrapiTestimonial>('testimonials', params);
            console.log(`💬 Testimonials response:`, response);
            return response;
        } catch (error) {
            console.error('❌ ContentService.getTestimonials error:', error);
            // Return empty response instead of throwing
            return {
                data: [],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 0,
                        pageCount: 0,
                        total: 0,
                    },
                },
            };
        }
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
        try {
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

            const params: any = {
                populate: '*',
                filters,
                sort: [`${sortBy}:${sortOrder}`],
            };

            if (locale) {
                params.locale = locale;
            }

            console.log(`🔍 Fetching FAQs for country: ${countryCode}, category: ${category}`);
            const response = await getCollection<StrapiFAQ>('faqs', params);
            console.log(`❓ FAQs response:`, response);
            return response;
        } catch (error) {
            console.error('❌ ContentService.getFAQs error:', error);
            // Return empty response instead of throwing
            return {
                data: [],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 0,
                        pageCount: 0,
                        total: 0,
                    },
                },
            };
        }
    }

    async getPolicies(countryCode: string, locale?: string): Promise<StrapiResponse<StrapiPolicy>> {
        try {
            const params: any = {
                populate: '*',
                filters: {
                    country: {
                        code: {
                            $eq: countryCode
                        }
                    }
                },
            };

            if (locale) {
                params.locale = locale;
            }

            console.log(`🔍 Fetching policies for country: ${countryCode}`);
            const response = await getCollection<StrapiPolicy>('policies', params);
            console.log(`📄 Policies response:`, response);
            return response;
        } catch (error) {
            console.error('❌ ContentService.getPolicies error:', error);
            // Return empty response instead of throwing
            return {
                data: [],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 0,
                        pageCount: 0,
                        total: 0,
                    },
                },
            };
        }
    }
}

// Export singleton instance
export const contentService = ContentService.getInstance();
