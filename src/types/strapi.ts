export interface StrapiImage {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string;
        width: number;
        height: number;
        formats: {
          thumbnail: { url: string };
          small: { url: string };
          medium: { url: string };
          large: { url: string };
        };
      };
    };
  }
  
  export interface StrapiLocale {
    id: number;
    attributes: {
      code: string;
      is_default: boolean;
    };
  }
  
  export interface StrapiCountry {
    id: number;
    code: string;
    name: string;
    flag_emoji: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface StrapiService {
    id: number;
    documentId: string;
    name: string;
    description: string;
    price_from: number;
    price_type?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country: {
      id: number;
      code: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      documentId: string;
      publishedAt: string;
      is_active: boolean;
    };
    icon?: {
      id: number;
      name: string;
      alternativeText: string;
      caption: string | null;
      width: number;
      height: number;
      formats: any;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      createdAt: string;
      updatedAt: string;
      documentId: string;
      publishedAt: string;
    }[];
  }
  
  export interface StrapiTestimonial {
    id: number;
    documentId: string;
    name: string;
    content: string;
    rating: number;
    platform?: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country: {
      id: number;
      code: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      documentId: string;
      publishedAt: string;
      is_active: boolean;
    };
  }
  
  export interface StrapiFAQ {
    id: number;
    documentId: string;
    question: string;
    answer: string | null;
    category: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country: {
      id: number;
      code: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      documentId: string;
      publishedAt: string;
      is_active: boolean;
    };
  }
  
  export interface StrapiPolicy {
    id: number;
    name: string;
    slug: string;
    description: string;
    content: string;
    publishedAt: string;
    country?: {
      id: number;
      code: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      documentId: string;
      publishedAt: string;
      is_active: boolean;
    };
  }
  
  export interface StrapiPage {
    id: number;
    attributes: {
      slug: string;
      title: string;
      seo_title: string;
      seo_description: string;
      sections: any[]; // This will be defined based on your dynamic zones
      country: StrapiCountry;
    };
  } 