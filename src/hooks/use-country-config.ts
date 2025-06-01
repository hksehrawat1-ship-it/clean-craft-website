import pagesConfig from '@/config/pages.yaml';

export interface CountryConfig {
  code: string;
  name: string;
  flag_emoji: string;
  region: string;
}

interface CountryYamlData {
  name: string;
  flag_emoji: string;
  region: string;
}

interface PagesYamlConfig {
  countries: {
    [key: string]: CountryYamlData;
  };
}

export function useCountryConfig() {
  const countries = Object.entries((pagesConfig as PagesYamlConfig).countries || {}).map(
    ([code, data]): CountryConfig => ({
      code,
      name: data.name,
      flag_emoji: data.flag_emoji,
      region: data.region,
    })
  );

  const isSupportedCountry = (code: string): boolean => {
    return countries.some((c) => c.code.toLowerCase() === code.toLowerCase());
  };

  const getCountryByCode = (code: string): CountryConfig | undefined => {
    return countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
  };

  const getCountryRegion = (code: string): string => {
    const country = getCountryByCode(code);
    return country?.region || 'OTHER REGIONS';
  };

  return {
    countries,
    isSupportedCountry,
    getCountryByCode,
    getCountryRegion,
  };
} 