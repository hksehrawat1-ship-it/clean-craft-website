
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useCookieConsent } from './CookieConsentContext';
import { useCountryConfig, CountryConfig } from '@/hooks/use-country-config';

interface CountryContextType {
  countries: CountryConfig[];
  currentCountry: string | null;
  setCurrentCountry: (country: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasConsent } = useCookieConsent();
  const { countries, isSupportedCountry } = useCountryConfig();
  
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Use refs to prevent infinite loops
  const isNavigating = useRef(false);
  const lastLocationPath = useRef(location.pathname);

  // Get country from URL path
  const getCountryFromPath = () => {
    const pathParts = location.pathname.split('/');
    const countryCode = pathParts[1]?.toLowerCase();
    return countryCode && isSupportedCountry(countryCode) ? countryCode : null;
  };

  // Handle country change
  const handleCountryChange = (country: string) => {
    if (isNavigating.current) {
      console.log('🔄 Navigation already in progress, skipping...');
      return;
    }

    if (!isSupportedCountry(country)) {
      toast.error('Invalid country selected');
      navigate('/');
      return;
    }
    
    setCurrentCountry(country);
    
    if (location.pathname === '/' || !isSupportedCountry(getCountryFromPath() || '')) {
      isNavigating.current = true;
      navigate(`/${country.toLowerCase()}`);
      // Reset navigation flag after a delay
      setTimeout(() => {
        isNavigating.current = false;
      }, 100);
    }
  };

  // Initialize country from URL or stored preference
  useEffect(() => {
    // Prevent processing the same path multiple times
    if (lastLocationPath.current === location.pathname) {
      return;
    }
    lastLocationPath.current = location.pathname;

    const urlCountry = getCountryFromPath();
    if (urlCountry) {
      setCurrentCountry(urlCountry);
    } else if (location.pathname === '/') {
      const storedCountry = localStorage.getItem('preferredCountry');
      if (storedCountry && isSupportedCountry(storedCountry) && hasConsent('preferences') && !isNavigating.current) {
        isNavigating.current = true;
        navigate(`/${storedCountry.toLowerCase()}`);
        setTimeout(() => {
          isNavigating.current = false;
        }, 100);
      }
    }
  }, [location.pathname, hasConsent, navigate, isSupportedCountry]);

  // Save country preference when changed
  useEffect(() => {
    if (currentCountry && hasConsent('preferences')) {
      localStorage.setItem('preferredCountry', currentCountry.toLowerCase());
    }
  }, [currentCountry, hasConsent]);

  const value = {
    countries,
    currentCountry,
    setCurrentCountry: handleCountryChange,
    isLoading: false,
    error
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
