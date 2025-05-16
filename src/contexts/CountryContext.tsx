import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CountryService } from '@/lib/strapi/services/country.service';
import { CookieService } from '@/lib/services/cookie.service';
import { StrapiCountry } from '@/types/strapi';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

interface CountryContextType {
  currentCountry: StrapiCountry | null;
  countries: StrapiCountry[];
  setCurrentCountry: (code: string) => void;
  isLoading: boolean;
  error: Error | null;
  detectUserCountry: () => Promise<string | null>;
  getImageUrl: (path: string) => string;
  getCountryRegion: (countryCode: string) => string;
}

const CountryContext = createContext<CountryContextType | null>(null);

function useCountry(): CountryContextType {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<StrapiCountry[]>([]);
  const [currentCountry, setCurrentCountryState] = useState<StrapiCountry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const countryService = CountryService.getInstance();
  const cookieService = CookieService.getInstance();
  const { hasConsent } = useCookieConsent();

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching countries from Strapi...');
        const data = await countryService.getCountries();
        
        if (!data || data.length === 0) {
          console.warn('No active countries found in database');
          throw new Error('No countries available');
        }
        
        console.log('Countries fetched:', data);
        setCountries(data);

        // Only try to auto-detect if we have necessary cookie consents
        if (hasConsent('essential') && hasConsent('preferences')) {
          // Check for saved country preference
          const savedCountry = cookieService.getStoredCountry();
          if (savedCountry) {
            const country = data.find(c => c.code.toLowerCase() === savedCountry.toLowerCase());
            if (country) {
              setCurrentCountryState(country);
              if (window.location.pathname === '/') {
                navigate(`/${country.code.toLowerCase()}`);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError(err as Error);
        toast.error('Failed to load countries. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCountries();
  }, [hasConsent, navigate, countryService, cookieService]);

  // Set current country based on code
  const setCurrentCountry = async (countryCode: string) => {
    try {
      console.log('Setting current country to:', countryCode);
      const country = await countryService.getCountryByCode(countryCode);
      
      if (country) {
        console.log('Country found:', country);
        
        // Get current path without country code
        const currentPath = window.location.pathname;
        const pathWithoutCountry = currentPath.replace(/^\/[a-z]{2}/, '');
        
        // Set the country in state and storage
        if (hasConsent('preferences')) {
          cookieService.storeCountry(country.code);
          setCurrentCountryState(country);
        } else {
          console.log('Preferences cookies not enabled, not storing country');
          setCurrentCountryState(country);
          toast.info("Your country selection won't be saved until you accept preferences cookies.", {
            id: 'preferences-required',
            duration: 5000,
          });
        }

        // Navigate to the same path but with new country code
        const newPath = `/${country.code.toLowerCase()}${pathWithoutCountry || ''}`;
        navigate(newPath);
      } else {
        console.warn(`Country code ${countryCode} not found`);
        // If country not found, use default country or first available
        const defaultCountry = countries.find(c => 
          c.code.toLowerCase() === 'in'
        ) || countries[0];
        
        if (defaultCountry) {
          console.log('Using default country:', defaultCountry);
          if (hasConsent('preferences')) {
            cookieService.storeCountry(defaultCountry.code);
          }
          setCurrentCountryState(defaultCountry);
          navigate(`/${defaultCountry.code.toLowerCase()}`);
        } else {
          console.error('No default country available and no countries in the list');
        }
      }
    } catch (err) {
      console.error('Error setting country:', err);
      toast.error('Failed to set country. Please try again.');
    }
  };

  // Handle region-specific image paths
  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const regionPrefix = currentCountry ? `/${currentCountry.code.toLowerCase()}` : '';
    return `${regionPrefix}${path}`;
  };

  // Get country region for grouping
  const getCountryRegion = (countryCode: string): string => {
    if (!countryCode) return 'Other';
    
    countryCode = countryCode.toLowerCase();
    
    if (['in', 'au', 'sg', 'my'].includes(countryCode)) {
      return 'ASIA/PACIFIC';
    }
    if (['uk', 'de', 'fr', 'es', 'it'].includes(countryCode)) {
      return 'EUROPE';
    }
    if (['us', 'ca'].includes(countryCode)) {
      return 'NORTH AMERICA';
    }
    
    return 'GLOBAL';
  };

  // Try to detect user's country with improved error handling and fallbacks
  const detectUserCountry = async () => {
    console.log('Detecting user country...');
    
    try {
      // First check if we have necessary cookie consents
      if (!hasConsent('essential') || !hasConsent('preferences')) {
        console.log('Missing required cookie consents for country detection');
        return null;
      }

      // Check if we have a selected country in local storage
      const savedCountry = cookieService.getStoredCountry();
      
      if (savedCountry) {
        console.log('Found saved country in localStorage:', savedCountry);
        
        if (countries.length > 0) {
          const isValidSavedCountry = countries.some(c => 
            c.code.toLowerCase() === savedCountry.toLowerCase()
          );
          
          if (isValidSavedCountry) {
            console.log('Valid saved country, using it:', savedCountry);
            setCurrentCountry(savedCountry);
            return savedCountry;
          } else {
            console.log('Saved country not valid in current countries list');
            cookieService.clearStoredCountry();
          }
        }
      }
      
      // If no valid saved country, try to get from IP geolocation API with a timeout
      console.log('Trying to detect country from IP geolocation API...');
      
      // Create a promise that rejects after a timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Geolocation API timeout')), 5000);
      });
      
      // Create the fetch promise
      const fetchPromise = fetch('https://ipapi.co/json/');
      
      // Race them - whichever resolves/rejects first wins
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      const data = await response.json();
      
      console.log('Geolocation API response:', data);
      
      if (data && data.country_code && countries.length > 0) {
        const countryCode = data.country_code.toLowerCase();
        console.log('Detected country code:', countryCode);
        
        const foundCountry = countries.find(c => 
          c.code.toLowerCase() === countryCode
        );
        
        if (foundCountry) {
          console.log('Found country in our database:', foundCountry);
          setCurrentCountry(foundCountry.code);
          return foundCountry.code;
        }
      }
    } catch (error) {
      console.error('Error detecting country:', error);
    }
    
    // If no country detected or API failed, use default
    console.log('Using default country fallback...');
    
    if (countries.length > 0) {
      const defaultCountry = countries.find(c => c.code === 'in') || countries[0];
      if (defaultCountry) {
        console.log('Using default country:', defaultCountry);
        setCurrentCountry(defaultCountry.code);
        return defaultCountry.code;
      }
    }
    
    console.warn('Could not detect or set any country');
    return null;
  };

  const value: CountryContextType = {
    currentCountry,
    countries,
    isLoading,
    error,
    setCurrentCountry,
    detectUserCountry,
    getImageUrl,
    getCountryRegion
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryProvider, useCountry };
