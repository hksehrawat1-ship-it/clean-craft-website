import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CountryService } from '@/lib/strapi/services/country.service';
import { StrapiCountry } from '@/types/strapi';
import { useQuery } from '@tanstack/react-query';
import { useCookieConsent } from './CookieConsentContext';

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

// Helper function to convert basic country to Strapi country
const toStrapiCountry = (country: any): StrapiCountry => ({
  id: country.id,
  code: country.code,
  name: country.name,
  flag_emoji: country.flag_emoji || '',
  documentId: country.documentId || country.id?.toString() || '',
  createdAt: country.createdAt || new Date().toISOString(),
  updatedAt: country.updatedAt || new Date().toISOString(),
  publishedAt: country.publishedAt || new Date().toISOString()
});

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountryState] = useState<StrapiCountry | null>(null);
  const navigate = useNavigate();
  const { countryCode: urlCountryCode } = useParams();
  const { hasConsent } = useCookieConsent();

  // Fetch countries with React Query
  const { 
    data: countries = [], 
    isLoading,
    error: queryError
  } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      console.log('Fetching countries from Strapi...');
      const countries = await countryService.getCountries();
      
      if (!countries || countries.length === 0) {
        console.warn('No active countries found in database');
        throw new Error('No countries available');
      }
      
      return countries.map(toStrapiCountry);
    },
    staleTime: Infinity, // Never consider the data stale
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  // Initial setup - check URL and cookies
  useEffect(() => {
    if (!countries.length) return;

    // Priority 1: URL country code
    if (urlCountryCode) {
      const urlCountry = countries.find(c => 
        c.code.toLowerCase() === urlCountryCode.toLowerCase()
      );
      if (urlCountry) {
        setCurrentCountryState(urlCountry);
        if (hasConsent('preferences')) {
          localStorage.setItem('selectedCountry', urlCountry.code);
        }
        return; // Do NOT call navigate here!
      } else {
        toast.error('Invalid country selected. Please choose your country.');
        setCurrentCountryState(null);
        return;
      }
    }

    // Priority 2: Check localStorage (if we have preferences consent)
    if (hasConsent('preferences')) {
      const storedCountry = localStorage.getItem('selectedCountry');
      if (storedCountry) {
        const country = countries.find(c => 
          c.code.toLowerCase() === storedCountry.toLowerCase()
        );
        if (country) {
          setCurrentCountryState(country);
          navigate(`/${country.code.toLowerCase()}`);
          return;
        } else {
          toast.error('Invalid country selected. Please choose your country.');
          setCurrentCountryState(null);
          return;
        }
      }
    }

    // Priority 3: Wait for manual selection or cookie acceptance
    setCurrentCountryState(null);
  }, [countries, urlCountryCode, hasConsent, navigate]);

  // Handle country selection from UI
  const setCurrentCountry = (countryCode: string) => {
    if (!countries.length) return;
    const country = countries.find(c => 
      c.code.toLowerCase() === countryCode.toLowerCase()
    );

    if (country) {
      setCurrentCountryState(country);
      navigate(`/${country.code.toLowerCase()}`);
      if (hasConsent('preferences')) {
        localStorage.setItem('selectedCountry', country.code);
      }
    } else {
      toast.error('Invalid country selected');
    }
  };

  // When cookies are accepted, use GeoIP to detect country
  const detectUserCountry = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Get the country code from the API response
      const detectedCode = data.country_code?.toLowerCase();
      
      // Check if we support this country
      const supportedCountry = countries.find(c => 
        c.code.toLowerCase() === detectedCode
      );
      
      if (supportedCountry) {
        return supportedCountry.code.toLowerCase();
      }
      
      // If country not supported, return null
      return null;
    } catch (error) {
      console.error('Error detecting user country:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!countries.length) return;
    if (!hasConsent('essential')) return;
    if (currentCountry) return; // already set (manual or from url/localStorage)

    (async () => {
      const detectedCode = await detectUserCountry();
      if (detectedCode) {
        const detectedCountry = countries.find(c => c.code.toLowerCase() === detectedCode);
        if (detectedCountry) {
          setCurrentCountryState(detectedCountry);
          navigate(`/${detectedCountry.code.toLowerCase()}`);
          if (hasConsent('preferences')) {
            localStorage.setItem('selectedCountry', detectedCountry.code);
          }
        }
        // If detected country is not in Strapi list, do nothing (wait for manual selection)
      }
    })();
  }, [countries, hasConsent, currentCountry, detectUserCountry, navigate]);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const regionPrefix = currentCountry ? `/${currentCountry.code.toLowerCase()}` : '';
    return `${regionPrefix}${path}`;
  };

  const getCountryRegion = (countryCode: string): string => {
    if (!countryCode) return 'Other';
    countryCode = countryCode.toLowerCase();
    if (['in', 'au', 'sg', 'my'].includes(countryCode)) return 'ASIA/PACIFIC';
    if (['uk', 'de', 'fr', 'es', 'it'].includes(countryCode)) return 'EUROPE';
    if (['us', 'ca'].includes(countryCode)) return 'AMERICAS';
    if (['ae', 'sa', 'qa', 'kw', 'bh'].includes(countryCode)) return 'MIDDLE EAST';
    return 'OTHER REGIONS';
  };

  const value: CountryContextType = {
    currentCountry,
    countries,
    setCurrentCountry,
    isLoading,
    error: queryError,
    getImageUrl,
    getCountryRegion,
    detectUserCountry
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
