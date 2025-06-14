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

const countries: CountryConfig[] = Object.entries((pagesConfig as PagesYamlConfig).countries || {}).map(
  ([code, data]): CountryConfig => ({
    code,
    name: data.name,
    flag_emoji: data.flag_emoji,
    region: data.region,
  })
);

function isSupportedCountry(code: string): boolean {
  return countries.some((c) => c.code.toLowerCase() === code.toLowerCase());
}

function getCountryByCode(code: string): CountryConfig | undefined {
  return countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

function getCountryRegion(code: string): string {
  const country = getCountryByCode(code);
  return country?.region || 'OTHER REGIONS';
}

export const countryConfig = {
  countries,
  isSupportedCountry,
  getCountryByCode,
  getCountryRegion,
}; 