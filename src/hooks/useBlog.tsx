
import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/lib/strapi/services/content.service';
import { useCountry } from '@/contexts/CountryContext';
import { useStrapiConnection } from '@/contexts/StrapiConnectionContext';
import { StrapiBlog, StrapiBlogCategory } from '@/types/strapi';

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
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<StrapiBlog>>({
    queryKey: ["blogs", countryCode, options],
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
    enabled: !!currentCountry && isConnected && !isInitializing
  });
}

export function useBlogBySlug(slug: string) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiBlog | null>({
    queryKey: ["blog", slug, countryCode],
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
    enabled: !!slug && !!currentCountry && isConnected && !isInitializing
  });
}

export function useBlogCategories() {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || 'in';

  return useQuery<StrapiResponse<StrapiBlogCategory>>({
    queryKey: ["blogCategories", countryCode],
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
    enabled: !!currentCountry && isConnected && !isInitializing
  });
}
