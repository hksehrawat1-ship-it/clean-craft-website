export interface CountryConfig {
  name: string;
  flag_emoji: string;
  region: string;
}

export interface SEODefaults {
  title_suffix: string;
  keywords_base: string[];
  image: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface PageSection {
  type: 'faq' | 'testimonial';
  category: string;
}

export interface PageData {
  path: string;
  navbar: boolean;
  title: string;
  order: number;
  sections?: PageSection[];
  children?: PageData[];
}

export interface CountryPages {
  pages: PageData[];
}

export interface PageConfig {
  countries: {
    [key: string]: CountryConfig;
  };
  seo: {
    global: {
      defaults: SEODefaults;
    };
    pages: {
      [path: string]: {
        [country: string]: SEOData;
      };
    };
  };
  global: {
    pages: PageData[];
  };
  [countryCode: string]: CountryPages | any; // Allow country-specific pages
} 