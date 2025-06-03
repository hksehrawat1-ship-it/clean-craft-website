import { useQuery } from '@tanstack/react-query';
import { PageService } from '@/lib/strapi/services/page.service';
import { contentService, ContentCategory } from '@/lib/strapi/services/content.service';
import { useCountry } from '@/contexts/CountryContext';
import { StrapiFAQ, StrapiService, StrapiTestimonial, StrapiPolicy } from '@/types/strapi';

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

export function useStrapiPage(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['page', slug, countryCode],
    queryFn: async () => {
      const pageService = PageService.getInstance();
      return pageService.getPage(slug, countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
}

export function useStrapiPageSEO(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['pageSEO', slug, countryCode],
    queryFn: async () => {
      const pageService = PageService.getInstance();
      return pageService.getPageSEO(slug, countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
}

export function useStrapiServices() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['services', countryCode],
    queryFn: async () => {
      return contentService.getServices(countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
}

export function useStrapiTestimonials(options?: {
  category?: ContentCategory;
  platform?: string;
  sortBy?: 'rating' | 'order';
  sortOrder?: 'asc' | 'desc';
}) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<any>>({
    queryKey: ['testimonials', countryCode, options],
    queryFn: async () => {
      return contentService.getTestimonials(countryCode, options);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
}

export function useStrapiFAQs(options?: {
  category?: ContentCategory;
  sortBy?: 'order';
  sortOrder?: 'asc' | 'desc';
}) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<any>>({
    queryKey: ['faqs', countryCode, options],
    queryFn: async () => {
      return contentService.getFAQs(countryCode, options);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
}

export function useStrapiPolicies() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['policies', countryCode],
    queryFn: async () => {
      if (!countryCode) {
        return [];
      }
      const response = await contentService.getPolicies(countryCode);
      // Transform the Strapi response to flatten the data structure
      return response.data.map(policy => ({
        ...policy,
        country: policy.country
      }));
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry // Only run query if we have a country
  });
} 