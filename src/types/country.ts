
export interface Country {
  id: string;
  code: string;
  name: string;
  default_locale: string;
  is_active: boolean;
  region?: string;
}

export interface CountryContextType {
  currentCountry: Country | null;
  countries: Country[];
  isLoading: boolean;
  error: Error | null;
  setCurrentCountry: (countryCode: string) => void;
  detectUserCountry: () => Promise<string | null>;
  getImageUrl: (path: string) => string;
  getCountryRegion: (countryCode: string) => string;
}
