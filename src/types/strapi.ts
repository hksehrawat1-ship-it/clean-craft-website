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
    documentId: string;
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    default_locale?: StrapiLocale;
    locales?: { data: StrapiLocale[] };
  }
  
  export interface StrapiService {
    id: number;
    attributes: {
      slug: string;
      name: string;
      description: string;
      price_from: number;
      country: { data: StrapiCountry };
    };
  }
  
  export interface StrapiTestimonial {
    id: number;
    attributes: {
      author: string;
      content: string;
      rating: number;
      platform: 'website' | 'google' | 'facebook' | 'instagram' | 'yelp' | 'trustpilot' | 'other';
      country: { data: StrapiCountry };
    };
  }
  
  export interface StrapiFAQ {
    id: number;
    attributes: {
      question: string;
      answer: string;
      category: string;
      order: number;
      country: { data: StrapiCountry };
    };
  }
  
  export interface StrapiPolicy {
    id: number;
    attributes: {
      body: string;
      effective_date: string;
      policy_type: {
        data: {
          id: number;
          attributes: {
            name: string;
            slug: string;
            description: string;
          }
        }
      };
      country: { data: StrapiCountry };
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
      country: { data: StrapiCountry };
    };
  } 