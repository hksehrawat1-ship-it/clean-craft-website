
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

const defaultQueryConfig = {
  staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  retry: (failureCount: number, error: any) => {
    // Don't retry if it's a configuration error
    if (error?.message?.includes('not defined')) {
      return false;
    }
    // Retry up to 2 times for network errors
    return failureCount < 2;
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
};

export function useStrapiPage(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['page', slug, countryCode],
    queryFn: async () => {
      const pageService = PageService.getInstance();
      return pageService.getPage(slug, countryCode);
    },
    enabled: !!currentCountry && !!slug,
    ...defaultQueryConfig,
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
    enabled: !!currentCountry && !!slug,
    ...defaultQueryConfig,
  });
}

export function useStrapiServices() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['services', countryCode],
    queryFn: async () => {
      console.log(`🚀 useStrapi: Fetching services for ${countryCode}`);
      return contentService.getServices(countryCode);
    },
    enabled: !!currentCountry,
    ...defaultQueryConfig,
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

  return useQuery<StrapiResponse<StrapiTestimonial>>({
    queryKey: ['testimonials', countryCode, options],
    queryFn: async () => {
      console.log(`🚀 useStrapi: Fetching testimonials for ${countryCode}`, options);
      return contentService.getTestimonials(countryCode, options);
    },
    enabled: !!currentCountry,
    ...defaultQueryConfig,
  });
}

export function useStrapiFAQs(options?: {
  category?: ContentCategory;
  sortBy?: 'order';
  sortOrder?: 'asc' | 'desc';
}) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<StrapiFAQ>>({
    queryKey: ['faqs', countryCode, options],
    queryFn: async () => {
      console.log(`🚀 useStrapi: Fetching FAQs for ${countryCode}`, options);
      return contentService.getFAQs(countryCode, options);
    },
    enabled: !!currentCountry,
    ...defaultQueryConfig,
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
      console.log(`🚀 useStrapi: Fetching policies for ${countryCode}`);
      const response = await contentService.getPolicies(countryCode);
      // Transform the Strapi response to flatten the data structure
      return response.data.map(policy => ({
        ...policy,
        country: policy.country
      }));
    },
    enabled: !!currentCountry,
    ...defaultQueryConfig,
  });
}
