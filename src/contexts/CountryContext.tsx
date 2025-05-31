import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { CountryService } from '@/lib/strapi/services/country.service';
import { StrapiCountry } from '@/types/strapi';
import { useQuery } from '@tanstack/react-query';
import { useCookieConsent } from './CookieConsentContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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
  ...country,
  code: country.code.toLowerCase(),
});

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { hasConsent } = useCookieConsent();
  const { pathname } = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [currentCountry, setCurrentCountryState] = useState<StrapiCountry | null>(null);

  /* Extract country code from URL if present */
  const urlMatch = pathname.match(/^\/([a-z]{2})(\/|$)/i);
  const urlCountryCode = urlMatch ? urlMatch[1].toLowerCase() : undefined;

  /* Fetch countries list with React Query */
  const {
    data: countries = [],
    isLoading,
    isSuccess,
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

  /* Handle country detection and routing */
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return data.country_code?.toLowerCase();
      } catch (e) {
        console.error('GeoIP error:', e);
        return null;
      }
    };

    const handleCountryRedirect = async () => {
      /* Only proceed if we're not already redirecting, countries are loaded, and we're on root */
      if (isRedirecting || !isSuccess || pathname !== '/') return;

      setIsRedirecting(true);
      
      try {
        /* Case 1: URL has a country code */
        if (urlCountryCode) {
          const urlCountry = countries.find(c => c.code === urlCountryCode);
          if (urlCountry) {
            setCurrentCountryState(urlCountry);
            if (hasConsent('preferences')) {
              localStorage.setItem('selectedCountry', urlCountry.code);
            }
            setIsRedirecting(false);
            return;
          }
        }

        /* Case 2: Try to detect user's country */
        const detectedCode = await detectCountry();
        if (detectedCode) {
          const matchedCountry = countries.find(c => c.code === detectedCode);
          if (matchedCountry) {
            setCurrentCountryState(matchedCountry);
            navigate(`/${matchedCountry.code}`, { replace: true });
            if (hasConsent('preferences')) {
              localStorage.setItem('selectedCountry', matchedCountry.code);
            }
          } else {
            /* Country detected but not supported */
            toast.info('Please select your country from the list below', {
              duration: 5000,
            });
          }
        } else {
          /* No country detected */
          toast.info('Please select your country from the list below', {
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Error during country detection:', error);
        toast.error('Unable to detect your location. Please select your country manually.', {
          duration: 5000,
        });
      } finally {
        setIsRedirecting(false);
      }
    };

    handleCountryRedirect();
  }, [isSuccess, pathname, isRedirecting, countries, navigate, urlCountryCode, hasConsent]);

  /* Manual country selection handler */
  const setCurrentCountry = (code: string) => {
    const found = countries.find((c) => c.code === code.toLowerCase());
    if (found) {
      setCurrentCountryState(found);
      navigate(`/${found.code}`);
      if (hasConsent('preferences')) {
        localStorage.setItem('selectedCountry', found.code);
      }
    } else {
      toast.error('Invalid country selected');
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const prefix = currentCountry ? `/${currentCountry.code}` : '';
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
      return countries.some((c) => c.code === code) ? code : null;
    } catch {
      return null;
    }
  };

  /* Show loading state while fetching countries or during redirect */
  if (isLoading || isRedirecting) {
    return <LoadingSpinner />;
  }

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
