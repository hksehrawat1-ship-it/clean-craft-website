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

    /* --- params ---------------------------------------------------- */
    const params: BaseQueryParams = {
      /* Nested‑object format => no comma issue */
      populate: {
        image:         { fields: ["url", "alternativeText"] },
        blog_category: true,
      },
      filters,
      sort:       [`${sortBy}:${sortOrder}`],
      pagination: { page, pageSize },
      locale,
    };

    return getCollection<StrapiBlog>("blogs", clean(params));
  }

  /* ───────── SINGLE BLOG ───────── */
  async getBlogBySlug(slug: string, countryCode: string, locale?: string) {
    const params: BaseQueryParams = {
      populate: "deep",
      filters: {
        slug:    { $eq: slug },
        country: { code: { $eq: countryCode.toLowerCase() } },
      },
      locale,
    };
    const res = await getCollection<StrapiBlog>("blogs", clean(params));
    return res.data[0] ?? null;
  }

  /* ───────── BLOG CATEGORIES ───────── */
  async getBlogCategories() {
    return getCollection<StrapiBlogCategory>("blog-categories", {
      populate: "*",
      sort:     ["name:asc"],
    });
  }

  /* ---- remaining endpoints unchanged for brevity ---- */
}

export const contentService = ContentService.getInstance();
