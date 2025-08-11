import { getCollection } from "../client";
import {
  StrapiBlog,
  StrapiBlogCategory,
  StrapiFAQ,
  StrapiPolicy,
  StrapiService,
  StrapiTestimonial,
} from "@/types/strapi";

const FEATURED_FIELD = "is_featured";
const SORT_FIELD_PUBLISHED = "publishedDate";

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

interface BaseQueryParams {
  populate?: string | string[] | Record<string, any>;
  filters?: any;
  sort?: string[];
  locale?: string;
  pagination?: { page?: number; pageSize?: number };
}

export type ContentCategory = "home" | "courses" | "book";

const clean = (o: any): any =>
  Array.isArray(o)
    ? o.map(clean)
    : o && typeof o === "object"
    ? Object.fromEntries(
        Object.entries(o)
          .filter(([, v]) => v !== undefined && v !== null && v !== "")
          .map(([k, v]) => [k, clean(v)])
      )
    : o;

class ContentService {
  private static inst: ContentService;
  private constructor() {}
  static getInstance() {
    if (!ContentService.inst) ContentService.inst = new ContentService();
    return ContentService.inst;
  }

  async getBlogs(
    countryCode: string,
    opts: {
      category?: string;
      featured?: boolean;
      search?: string;
      page?: number;
      pageSize?: number;
      locale?: string;
      sortBy?: "publishedDate" | "createdAt";
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<StrapiResponse<StrapiBlog>> {
    const {
      category,
      featured,
      search,
      page = 1,
      pageSize = 9,
      locale,
      sortBy = SORT_FIELD_PUBLISHED,
      sortOrder = "desc",
    } = opts;

    const filters: any = {
      country: { code: { $eq: countryCode.toLowerCase() } },
    };

    if (featured !== undefined) filters[FEATURED_FIELD] = { $eq: featured };
    if (category) filters.blog_categories = { slug: { $eq: category } };
    if (search && search.trim()) {
      filters.$or = [
        { title: { $containsi: search.trim() } },
        { content: { $containsi: search.trim() } },
        { seo_description: { $containsi: search.trim() } },
      ];
    }

    const params: BaseQueryParams = {
      populate: "*",
      filters,
      sort: [`${sortBy}:${sortOrder}`],
      pagination: { page, pageSize },
      locale,
    };

    return getCollection<StrapiBlog>("blogs", clean(params));
  }

  async getBlogBySlug(slug: string, countryCode: string, locale?: string) {
    const params: BaseQueryParams = {
      populate: "*",
      filters: {
        slug: { $eq: slug },
        country: { code: { $eq: countryCode.toLowerCase() } },
      },
      locale,
    };

    const res = await getCollection<StrapiBlog>("blogs", clean(params));
    return res.data[0] ?? null;
  }

  async getBlogCategories() {
    return getCollection<StrapiBlogCategory>("blog-categories", {
      populate: "*",
      sort: ["name:asc"],
    });
  }

  async getServices(countryCode: string): Promise<StrapiResponse<StrapiService>> {
    const params: BaseQueryParams = {
      populate: {
        icon: { fields: ["url", "alternativeText"] },
        country: true,
      },
      filters: {
        country: { code: { $eq: countryCode.toLowerCase() } },
      },
      sort: ["name:asc"],
    };

    return getCollection<StrapiService>("services", clean(params));
  }

  async getTestimonials(
    countryCode: string,
    opts: {
      category?: ContentCategory;
      platform?: string;
      sortBy?: "rating" | "order";
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<StrapiResponse<StrapiTestimonial>> {
    const {
      category,
      platform,
      sortBy = "rating",
      sortOrder = "desc",
    } = opts;

    const filters: any = {
      country: { code: { $eq: countryCode.toLowerCase() } },
    };
    if (category) filters.category = { $eq: category };
    if (platform) filters.platform = { $eq: platform };

    const params: BaseQueryParams = {
      populate: {
        country: true,
      },
      filters,
      sort: [`${sortBy}:${sortOrder}`],
    };

    return getCollection<StrapiTestimonial>("testimonials", clean(params));
  }

  async getFAQs(
    countryCode: string,
    opts: {
      category?: ContentCategory;
      sortBy?: "order";
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<StrapiResponse<StrapiFAQ>> {
    const {
      category,
      sortBy = "order",
      sortOrder = "asc",
    } = opts;

    const filters: any = {
      country: { code: { $eq: countryCode.toLowerCase() } },
    };
    if (category) filters.category = { $eq: category };

    const params: BaseQueryParams = {
      populate: {
        country: true,
      },
      filters,
      sort: [`${sortBy}:${sortOrder}`],
    };

    return getCollection<StrapiFAQ>("faqs", clean(params));
  }

  async getPolicies(countryCode: string): Promise<StrapiResponse<StrapiPolicy>> {
    const params: BaseQueryParams = {
      populate: {
        country: true,
      },
      filters: {
        country: { code: { $eq: countryCode.toLowerCase() } },
      },
      sort: ["name:asc"],
    };

    return getCollection<StrapiPolicy>("policies", clean(params));
  }

  async getCitiesForBooking(): Promise<string[]> {
    let allCities: string[] = [];
    let page = 1;
    let pageCount = 1; // assume 1 initially

    try {
      while (page <= pageCount) {
        const result = await getCollection<any>("franchises", {
          sort: ["city:asc"],
          pagination: { page, pageSize: 50 }, // 50 per page
        });

        if (!result || !Array.isArray(result.data)) {
          console.warn("⚠️ Invalid franchise data format");
          break;
        }

        const citiesOnPage = result.data
          .map((item: any) => item.city || item.attributes?.city)
          .filter((city: string) => city && city.trim() !== "")
          .map((city: string) => city.trim());

        allCities = allCities.concat(citiesOnPage);

        pageCount = result.meta.pagination.pageCount;
        page++;
      }

      const uniqueCities = Array.from(new Set(allCities));

      console.log("🏙️ Final Unique Cities List:", uniqueCities);

      return uniqueCities;
    } catch (error) {
      console.error("❌ Error fetching cities from Strapi:", error);
      return [];
    }
  }
}

export const contentService = ContentService.getInstance();
