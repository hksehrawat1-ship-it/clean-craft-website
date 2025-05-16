import { getCollection } from '../client';
import { StrapiService, StrapiTestimonial, StrapiFAQ, StrapiPolicy } from '@/types/strapi';

export class ContentService {
  private static instance: ContentService;

  private constructor() {}

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  async getServices(countryCode: string, locale?: string): Promise<StrapiService[]> {
    const params = {
      country: countryCode,
      locale
    };

    return getCollection<StrapiService>('services', params);
  }

  async getTestimonials(countryCode: string, platform?: string, locale?: string): Promise<StrapiTestimonial[]> {
    const params = {
      country: countryCode,
      platform,
      sort: 'rating:desc',
      populate: 'country',
      locale
    };

    return getCollection<StrapiTestimonial>('testimonials', params);
  }

  async getFAQs(countryCode: string, category?: string, locale?: string): Promise<StrapiFAQ[]> {
    const params = {
      country: countryCode,
      category,
      sort: 'order:asc',
      populate: 'country',
      locale
    };

    return getCollection<StrapiFAQ>('faqs', params);
  }

  async getPolicies(countryCode: string, locale?: string): Promise<StrapiPolicy[]> {
    const params = {
      country: countryCode,
      populate: ['policy_type', 'country'],
      locale
    };

    return getCollection<StrapiPolicy>('policies', params);
  }
} 