
export interface Country {
  id: string;
  code: string;
  name: string;
  default_locale: string;
  is_active: boolean;
}

export interface CountryContextType {
  currentCountry: Country | null;
  countries: Country[];
  isLoading: boolean;
  error: Error | null;
  setCurrentCountry: (countryCode: string) => void;
  getImageUrl: (path: string) => string;
}
