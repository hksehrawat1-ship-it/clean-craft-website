
import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/lib/strapi/services/content.service';
import { useCountry } from '@/contexts/CountryContext';
import { useStrapiConnection } from '@/contexts/StrapiConnectionContext';
import { StrapiBlog, StrapiBlogCategory } from '@/types/strapi';
import { useMemo } from 'react';

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

export function useBlogs(options?: {
  category?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: 'publishedDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  
  // Serialize options to prevent unstable query keys
  const serializedOptions = useMemo(() => {
    if (!options) return null;
    return JSON.stringify(options);
  }, [options?.category, options?.featured, options?.page, options?.pageSize, options?.sortBy, options?.sortOrder]);

  // Memoize the query key with serialized options
  const queryKey = useMemo(() => {
    const countryCode = currentCountry?.toLowerCase() || 'in';
    return ["blogs", countryCode, serializedOptions];
  }, [currentCountry, serializedOptions]);

  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<StrapiBlog>>({
    queryKey,
    queryFn: async () => {
      console.log("🔄 Fetching blogs for:", countryCode, "Options:", options);
      try {
        const data = await contentService.getBlogs(countryCode, options);
        console.log("✅ Blogs:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!currentCountry && isConnected && !isInitializing,
    retry: 2, // Limit retries to prevent infinite loops
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

export function useBlogBySlug(slug: string) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  
  const queryKey = useMemo(() => {
    const countryCode = currentCountry?.toLowerCase() || 'in';
    return ["blog", slug, countryCode];
  }, [slug, currentCountry]);

  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiBlog | null>({
    queryKey,
    queryFn: async () => {
      console.log("🔄 Fetching blog:", slug, "Country:", countryCode);
      try {
        const data = await contentService.getBlogBySlug(slug, countryCode);
        console.log("✅ Blog data:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!slug && !!currentCountry && isConnected && !isInitializing,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

export function useBlogCategories() {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  
  const queryKey = useMemo(() => {
    const countryCode = currentCountry?.toLowerCase() || 'in';
    return ["blogCategories", countryCode];
  }, [currentCountry]);

  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<StrapiBlogCategory>>({
    queryKey,
    queryFn: async () => {
      console.log("🔄 Fetching blog categories for:", countryCode);
      try {
        const data = await contentService.getBlogCategories(countryCode);
        console.log("✅ Blog categories:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching blog categories:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    enabled: !!currentCountry && isConnected && !isInitializing,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}
