
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Country, CountryContextType } from '@/types/country';
import { toast } from 'sonner';

// Create the context
const CountryContext = createContext<CountryContextType | null>(null);

// Create a provider component
export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountryState] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching countries from Supabase...');
        
        const { data, error } = await supabase
          .from('countries')
          .select('*')
          .eq('is_active', true)
          .order('name');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Countries fetched:', data);
        
        if (!data || data.length === 0) {
          console.warn('No active countries found in database');
          throw new Error('No countries available');
        }
        
        setCountries(data || []);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError(err as Error);
        toast.error('Failed to load countries. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCountries();
  }, []);

  // Set current country based on code
  const setCurrentCountry = useCallback((countryCode: string) => {
    console.log('Setting current country to:', countryCode);
    
    const country = countries.find((c) => c.code.toLowerCase() === countryCode.toLowerCase());
    
    if (country) {
      console.log('Country found:', country);
      // Update local storage
      localStorage.setItem('selectedCountry', country.code);
      
      // Update state
      setCurrentCountryState(country);
    } else {
      console.warn(`Country code ${countryCode} not found`);
      // If country not found, use default country or first available
      const defaultCountry = countries.find(c => c.code === 'in') || countries[0];
      
      if (defaultCountry) {
        console.log('Using default country:', defaultCountry);
        localStorage.setItem('selectedCountry', defaultCountry.code);
        setCurrentCountryState(defaultCountry);
      } else {
        console.error('No default country available and no countries in the list');
      }
    }
  }, [countries]);

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
  const detectUserCountry = useCallback(async () => {
    console.log('Detecting user country...');
    
    try {
      // First check if we have a selected country in local storage
      const savedCountry = localStorage.getItem('selectedCountry');
      
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
  }, [countries, setCurrentCountry]);

  // Provide the context value
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
};

// Custom hook to use the country context
export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  
  return context;
};
