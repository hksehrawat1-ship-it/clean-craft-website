import { useQuery } from '@tanstack/react-query';
import { PageService } from '@/lib/strapi/services/page.service';
import { ContentService } from '@/lib/strapi/services/content.service';
import { useCountry } from '@/contexts/CountryContext';

export function useStrapiPage(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['page', slug, countryCode],
    queryFn: async () => {
      const pageService = PageService.getInstance();
      return pageService.getPage(slug, countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useStrapiPageSEO(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['pageSEO', slug, countryCode],
    queryFn: async () => {
      const pageService = PageService.getInstance();
      return pageService.getPageSEO(slug, countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useStrapiServices() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['services', countryCode],
    queryFn: async () => {
      const contentService = ContentService.getInstance();
      return contentService.getServices(countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useStrapiTestimonials(platform?: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['testimonials', countryCode, platform],
    queryFn: async () => {
      const contentService = ContentService.getInstance();
      return contentService.getTestimonials(countryCode, platform);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useStrapiFAQs(category?: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['faqs', countryCode, category],
    queryFn: async () => {
      const contentService = ContentService.getInstance();
      return contentService.getFAQs(countryCode, category);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useStrapiPolicies() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return useQuery({
    queryKey: ['policies', countryCode],
    queryFn: async () => {
      const contentService = ContentService.getInstance();
      return contentService.getPolicies(countryCode);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
} 