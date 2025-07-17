import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/lib/strapi/services/content.service";
import { useStrapiConnection } from "@/contexts/StrapiConnectionContext";
import { useCountry } from "@/contexts/CountryContext";
import { StrapiBlog, StrapiBlogCategory } from "@/types/strapi";
import { useMemo } from "react";

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
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "publishedDate" | "createdAt";
  sortOrder?: "asc" | "desc";
}) {
  const { isConnected, isInitializing } = useStrapiConnection();
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  // 🔑 Proper key to re-fetch on filter/category change
  const key = useMemo(
    () => ["blogs", countryCode, JSON.stringify(options)],
    [countryCode, options]
  );

  return useQuery<StrapiResponse<StrapiBlog>>({
    queryKey: key,
    queryFn: () => contentService.getBlogs(countryCode, options),
    staleTime: 300_000, // 5 minutes
    enabled: isConnected && !isInitializing,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });
}

export function useBlogBySlug(slug: string) {
  const { isConnected, isInitializing } = useStrapiConnection();
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  const key = useMemo(() => ["blog", slug, countryCode], [slug, countryCode]);

  return useQuery<StrapiBlog | null>({
    queryKey: key,
    queryFn: () => contentService.getBlogBySlug(slug, countryCode),
    staleTime: 300_000,
    enabled: !!slug && isConnected && !isInitializing,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });
}

export function useBlogCategories() {
  const { isConnected, isInitializing } = useStrapiConnection();

  return useQuery<StrapiResponse<StrapiBlogCategory>>({
    queryKey: ["blogCategories"],
    queryFn: () => contentService.getBlogCategories(),
    staleTime: 600_000, // 10 minutes
    enabled: isConnected && !isInitializing,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });
}
