import { useQuery } from "@tanstack/react-query";
import { PageService } from "@/lib/strapi/services/page.service";
import {
  contentService,
  ContentCategory,
} from "@/lib/strapi/services/content.service";
import { useCountry } from "@/contexts/CountryContext";
import {
  StrapiFAQ,
  StrapiService,
  StrapiTestimonial,
  StrapiPolicy,
} from "@/types/strapi";

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
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["page", slug, countryCode],
    queryFn: async () => {
      console.log("🔄 Fetching page:", slug, "Country:", countryCode);
      try {
        const pageService = PageService.getInstance();
        const data = await pageService.getPage(slug, countryCode);
        console.log("✅ Page data:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching page:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

export function useStrapiPageSEO(slug: string) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["pageSEO", slug, countryCode],
    queryFn: async () => {
      console.log("🔄 Fetching SEO for:", slug, "Country:", countryCode);
      try {
        const pageService = PageService.getInstance();
        const data = await pageService.getPageSEO(slug, countryCode);
        console.log("✅ SEO data:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching SEO:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

export function useStrapiServices() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["services", countryCode],
    queryFn: async () => {
      console.log("🔄 Fetching services for:", countryCode);
      try {
        const data = await contentService.getServices(countryCode);
        console.log("✅ Services:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching services:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

export function useStrapiTestimonials(options?: {
  category?: ContentCategory;
  platform?: string;
  sortBy?: "rating" | "order";
  sortOrder?: "asc" | "desc";
}) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery<StrapiResponse<any>>({
    queryKey: ["testimonials", countryCode, options],
    queryFn: async () => {
      console.log(
        "🔄 Fetching testimonials for:",
        countryCode,
        "Options:",
        options
      );
      try {
        const data = await contentService.getTestimonials(countryCode, options);
        console.log("✅ Testimonials:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching testimonials:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

export function useStrapiFAQs(options?: {
  category?: ContentCategory;
  sortBy?: "order";
  sortOrder?: "asc" | "desc";
}) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery<StrapiResponse<any>>({
    queryKey: ["faqs", countryCode, options],
    queryFn: async () => {
      console.log("🔄 Fetching FAQs for:", countryCode, "Options:", options);
      try {
        const data = await contentService.getFAQs(countryCode, options);
        console.log("✅ FAQs:", data);
        return data;
      } catch (err) {
        console.error("❌ Error fetching FAQs:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

export function useStrapiPolicies() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["policies", countryCode],
    queryFn: async () => {
      console.log("🔄 Fetching policies for:", countryCode);
      try {
        if (!countryCode) {
          return [];
        }
        const response = await contentService.getPolicies(countryCode);
        console.log("✅ Policies:", response.data);
        return response.data.map((policy) => ({
          ...policy,
          country: policy.country,
        }));
      } catch (err) {
        console.error("❌ Error fetching policies:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}
