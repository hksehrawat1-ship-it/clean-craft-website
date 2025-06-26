// lib/strapi/services/content.service.ts
import { getCollection } from "../client";
import {
  StrapiBlog,
  StrapiBlogCategory,
  StrapiFAQ,
  StrapiPolicy,
  StrapiService,
  StrapiTestimonial,
} from "@/types/strapi";

const FEATURED_FIELD        = "is_featured";
const SORT_FIELD_PUBLISHED  = "publishedDate";

/* ------------------------------------------------------------------ */
/*  Common response + helper                                          */
/* ------------------------------------------------------------------ */
interface StrapiResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface BaseQueryParams {
  /*  ⬇︎ populate can now be string | string[] | object  */
  populate?: string | string[] | Record<string, any>;
  filters?: any;
  sort?: string[];
  locale?: string;
  pagination?: { page?: number; pageSize?: number };
}

export type ContentCategory = 'home' | 'courses' | 'book';

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

/* ------------------------------------------------------------------ */
/*  Singleton service                                                 */
/* ------------------------------------------------------------------ */
class ContentService {
  private static inst: ContentService;
  private constructor() {}
  static getInstance() {
    if (!ContentService.inst) ContentService.inst = new ContentService();
    return ContentService.inst;
  }

  /* ───────── BLOG LIST ───────── */
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
      page      = 1,
      pageSize  = 9,
      locale,
      sortBy    = SORT_FIELD_PUBLISHED,
      sortOrder = "desc",
    } = opts;

    /* --- filters --------------------------------------------------- */
    const filters: any = {
      country: { code: { $eq: countryCode.toLowerCase() } },
    };
    if (featured !== undefined)          filters[FEATURED_FIELD] = { $eq: featured };
    if (category)                        filters.blog_category   = { slug: { $eq: category } };
    
    // Add search functionality
    if (search && search.trim()) {
      filters.$or = [
        { title: { $containsi: search.trim() } },
        { content: { $containsi: search.trim() } },
        { seo_description: { $containsi: search.trim() } }
      ];
    }

    /* --- params ---------------------------------------------------- */
    const params: BaseQueryParams = {
      /* Simplified populate using wildcards */
      populate: "*",
      filters,
      sort:       [`${sortBy}:${sortOrder}`],
      pagination: { page, pageSize },
      locale,
    };

    console.log("📝 Blog list API call params:", JSON.stringify(params, null, 2));
    const result = await getCollection<StrapiBlog>("blogs", clean(params));
    console.log("📝 Blog list API response:", JSON.stringify(result, null, 2));
    return result;
  }

  /* ───────── SINGLE BLOG ───────── */
  async getBlogBySlug(slug: string, countryCode: string, locale?: string) {
    console.log("🔍 Fetching blog by slug:", slug, "Country:", countryCode);
    
    const params: BaseQueryParams = {
      /* Simplified populate - use wildcard to get all related data */
      populate: "*",
      filters: {
        slug:    { $eq: slug },
        country: { code: { $eq: countryCode.toLowerCase() } },
      },
      locale,
    };
    
    console.log("🔍 Blog detail API call params:", JSON.stringify(params, null, 2));
    const res = await getCollection<StrapiBlog>("blogs", clean(params));
    console.log("🔍 Blog detail API response:", JSON.stringify(res, null, 2));
    
    return res.data[0] ?? null;
  }

  /* ───────── BLOG CATEGORIES ───────── */
  async getBlogCategories() {
    return getCollection<StrapiBlogCategory>("blog-categories", {
      populate: "*",
      sort:     ["name:asc"],
    });
  }

  /* ───────── SERVICES ───────── */
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

  /* ───────── TESTIMONIALS ───────── */
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

  /* ───────── FAQS ───────── */
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

  /* ───────── POLICIES ───────── */
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
}

export const contentService = ContentService.getInstance();
