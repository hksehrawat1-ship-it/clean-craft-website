
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
        
        const { data, error } = await supabase
          .from('countries')
          .select('*')
          .eq('is_active', true)
          .order('name');
        
        if (error) throw error;
        
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
    const country = countries.find((c) => c.code.toLowerCase() === countryCode.toLowerCase());
    
    if (country) {
      // Update local storage
      localStorage.setItem('selectedCountry', country.code);
      
      // Update state
      setCurrentCountryState(country);
    } else {
      console.warn(`Country code ${countryCode} not found`);
      // If country not found, use default country or first available
      const defaultCountry = countries.find(c => c.code === 'in') || countries[0];
      
      if (defaultCountry) {
        localStorage.setItem('selectedCountry', defaultCountry.code);
        setCurrentCountryState(defaultCountry);
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

  // Try to detect user's country if not already set
  const detectUserCountry = useCallback(async () => {
    // First check if we have a selected country in local storage
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry && countries.length > 0) {
      setCurrentCountry(savedCountry);
      return savedCountry;
    }
    
    // If no saved country, try to get from geolocation API
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data && data.country_code && countries.length > 0) {
        const countryCode = data.country_code.toLowerCase();
        const foundCountry = countries.find(c => 
          c.code.toLowerCase() === countryCode
        );
        
        if (foundCountry) {
          setCurrentCountry(foundCountry.code);
          return foundCountry.code;
        }
      }
    } catch (error) {
      console.error('Error detecting country:', error);
    }
    
    // If no country detected or not available, use default
    if (countries.length > 0) {
      const defaultCountry = countries.find(c => c.code === 'in') || countries[0];
      if (defaultCountry) {
        setCurrentCountry(defaultCountry.code);
        return defaultCountry.code;
      }
    }
    
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
