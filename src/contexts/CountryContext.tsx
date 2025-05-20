import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';   // ▲ useLocation
import { toast } from 'sonner';
import { CountryService } from '@/lib/strapi/services/country.service';
import { StrapiCountry } from '@/types/strapi';
import { useQuery } from '@tanstack/react-query';
import { useCookieConsent } from './CookieConsentContext';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface CountryContextType {
  currentCountry: StrapiCountry | null;
  countries: StrapiCountry[];
  setCurrentCountry: (code: string) => void;
  isLoading: boolean;
  error: Error | null;
  getImageUrl: (path: string) => string;
  getCountryRegion: (countryCode: string) => string;
  detectUserCountry: () => Promise<string | null>;
}

const CountryContext = createContext<CountryContextType | null>(null);
const countryService = CountryService.getInstance();

/* helper to normalise API object */
const toStrapiCountry = (country: any): StrapiCountry => ({
  id: country.id,
  code: country.code,
  name: country.name,
  flag_emoji: country.flag_emoji || '',
  documentId: country.documentId || String(country.id),
  createdAt: country.createdAt || new Date().toISOString(),
  updatedAt: country.updatedAt || new Date().toISOString(),
  publishedAt: country.publishedAt || new Date().toISOString(),
});

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { hasConsent } = useCookieConsent();

  /* ▲ derive `:countryCode` from pathname so provider can sit at the top */
  const { pathname } = useLocation();
  const urlMatch = pathname.match(/^\/([a-z]{2})(\/|$)/i);
  const urlCountryCode = urlMatch ? urlMatch[1].toLowerCase() : undefined;

  const [currentCountry, setCurrentCountryState] =
    useState<StrapiCountry | null>(null);

  /* Fetch master list once – React Query caches it */
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const list = await countryService.getCountries();
      if (!list?.length) throw new Error('No countries available');
      return list.map(toStrapiCountry);
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  /* -------------------------------------------------------------- */
  /* Sync: URL param → context & (optionally) localStorage          */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!countries.length) return;

    if (urlCountryCode) {
      const fromUrl = countries.find(
        (c) => c.code.toLowerCase() === urlCountryCode,
      );
      if (fromUrl) {
        setCurrentCountryState(fromUrl);
        if (hasConsent('preferences'))
          localStorage.setItem('selectedCountry', fromUrl.code);
      } else {
        toast.error('Invalid country selected. Please choose your country.');
        setCurrentCountryState(null);
      }
      return;
    }

    /* No param – try localStorage */
    if (hasConsent('preferences')) {
      const stored = localStorage.getItem('selectedCountry')?.toLowerCase();
      if (stored) {
        const found = countries.find((c) => c.code.toLowerCase() === stored);
        if (found) {
          setCurrentCountryState(found);
          navigate(`/${found.code.toLowerCase()}`, { replace: true });
          return;
        }
      }
    }

    /* Otherwise wait for GeoIP or manual pick */
    setCurrentCountryState(null);
  }, [countries, urlCountryCode, hasConsent, navigate]);

  /* -------------------------------------------------------------- */
  /* Geo-IP detection (runs once essential consent is given)        */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!countries.length) return;
    if (!hasConsent('essential')) return;
    if (currentCountry || urlCountryCode) return;

    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const code = data.country_code?.toLowerCase();
        const supported = countries.find((c) => c.code.toLowerCase() === code);
        if (supported) {
          setCurrentCountryState(supported);
          navigate(`/${supported.code.toLowerCase()}`, { replace: true });
          if (hasConsent('preferences'))
            localStorage.setItem('selectedCountry', supported.code);
        }
      } catch (e) {
        console.error('GeoIP error:', e);
      }
    })();
  }, [countries, hasConsent, currentCountry, navigate, urlCountryCode]);

  /* -------------------------------------------------------------- */
  /* Helpers & setter                                               */
  /* -------------------------------------------------------------- */
  const setCurrentCountry = (code: string) => {
    const found = countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
    if (found) navigate(`/${found.code.toLowerCase()}`);
    else toast.error('Invalid country selected');
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const prefix = currentCountry ? `/${currentCountry.code.toLowerCase()}` : '';
    return `${prefix}${path}`;
  };

  const getCountryRegion = (code: string): string => {
    code = code.toLowerCase();
    if (['in', 'au', 'sg', 'my'].includes(code)) return 'ASIA/PACIFIC';
    if (['uk', 'de', 'fr', 'es', 'it'].includes(code)) return 'EUROPE';
    if (['us', 'ca'].includes(code)) return 'AMERICAS';
    if (['ae', 'sa', 'qa', 'kw', 'bh'].includes(code)) return 'MIDDLE EAST';
    return 'OTHER REGIONS';
  };

  const detectUserCountry = async (): Promise<string | null> => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      const code = data.country_code?.toLowerCase();
      return countries.some((c) => c.code.toLowerCase() === code) ? code : null;
    } catch {
      return null;
    }
  };

  const value = useMemo<CountryContextType>(
    () => ({
      currentCountry,
      countries,
      setCurrentCountry,
      isLoading,
      error,
      getImageUrl,
      getCountryRegion,
      detectUserCountry,
    }),
    [currentCountry, countries, isLoading, error],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
};

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */
export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error('useCountry must be used within a CountryProvider');
  return ctx;
};
