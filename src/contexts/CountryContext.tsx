
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getStorageUrl } from '@/utils/storageUtils';
import { Country, CountryContextType } from '@/types/country';
import { toast } from 'sonner';

// Default country when no selection is available
const DEFAULT_COUNTRY_CODE = 'in';

// Define regions for countries
export const COUNTRY_REGIONS = {
  'in': 'ASIA/PACIFIC',
  'au': 'ASIA/PACIFIC',
  'sg': 'ASIA/PACIFIC',
  'my': 'ASIA/PACIFIC',
  'uk': 'EUROPE',
  'de': 'EUROPE',
  'fr': 'EUROPE',
  'es': 'EUROPE',
  'it': 'EUROPE',
  'us': 'NORTH AMERICA',
  'ca': 'NORTH AMERICA'
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  // Log debugging info
  useEffect(() => {
    console.log('CountryContext state:', { 
      currentCountry, 
      countriesCount: countries.length,
      isLoading, 
      error: error?.message 
    });
  }, [currentCountry, countries, isLoading, error]);

  // Load countries from Supabase
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log('Fetching countries from Supabase...');
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('countries')
          .select('*')
          .eq('is_active', true)
          .order('name');
          
        if (error) throw error;
        
        console.log('Fetched countries:', data);
        
        // Enhance countries with region info
        const enhancedCountries = data?.map(country => ({
          ...country,
          region: COUNTRY_REGIONS[country.code as keyof typeof COUNTRY_REGIONS] || 'GLOBAL'
        })) || [];
        
        setCountries(enhancedCountries);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch countries'));
        toast.error('Failed to load country data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Detect user's country on initial load
  useEffect(() => {
    const detectUserCountry = async () => {
      // First check if a country is selected in localStorage
      const storedCountryCode = localStorage.getItem('selectedCountry');
      
      console.log('Stored country code:', storedCountryCode);
      console.log('Available countries:', countries);
      
      // Check if we're at the root path - if so, we don't auto-select a country
      if (window.location.pathname === '/') {
        console.log('At root path, not auto-selecting country');
        return;
      }
      
      // Check if we're on a country-specific path
      const pathCountryMatch = window.location.pathname.match(/^\/([a-z]{2})(\/.*)?$/);
      if (pathCountryMatch && pathCountryMatch[1]) {
        const pathCountryCode = pathCountryMatch[1];
        const pathCountry = countries.find(c => c.code === pathCountryCode);
        
        if (pathCountry) {
          console.log('Using country from URL path:', pathCountryCode);
          setCurrentCountry(pathCountry);
          localStorage.setItem('selectedCountry', pathCountry.code);
          return;
        }
      }
      
      if (storedCountryCode && countries.some(c => c.code === storedCountryCode)) {
        console.log('Using stored country:', storedCountryCode);
        const country = countries.find(c => c.code === storedCountryCode) || null;
        setCurrentCountry(country);
        return;
      }
      
      // If no stored country or it's invalid, use the default
      if (countries.length > 0) {
        console.log('Using default country');
        const defaultCountry = countries.find(c => c.code === DEFAULT_COUNTRY_CODE) || countries[0];
        setCurrentCountry(defaultCountry);
        localStorage.setItem('selectedCountry', defaultCountry.code);
      } else if (countries.length === 0 && !isLoading) {
        console.error('No countries available in database');
        setError(new Error('No countries available'));
      }
    };
    
    if (countries.length > 0 && !currentCountry && !isLoading) {
      console.log('Detecting user country...');
      detectUserCountry();
    }
  }, [countries, currentCountry, isLoading]);

  const handleSetCurrentCountry = (countryCode: string) => {
    console.log('Setting country to:', countryCode);
    const country = countries.find(c => c.code === countryCode);
    
    if (country) {
      setCurrentCountry(country);
      localStorage.setItem('selectedCountry', country.code);
      
      // Update the URL to reflect the country change
      const currentPath = window.location.pathname;
      
      // If at the root path or already on a country path, navigate to the new country path
      if (currentPath === '/' || /^\/[a-z]{2}(\/.*)?$/.test(currentPath)) {
        const pathWithoutCountry = currentPath.split('/').slice(2).join('/');
        const newPath = `/${country.code}${pathWithoutCountry ? `/${pathWithoutCountry}` : ''}`;
        console.log('Navigating to:', newPath);
        navigate(newPath);
      }
    } else {
      toast.error(`Country code ${countryCode} is not supported`);
    }
  };

  // Helper function to get country-specific image URL
  const getImageUrl = (path: string): string => {
    if (!path) return '';
    
    // If path already includes country code or is external, use it directly
    if (path.startsWith('http') || path.includes('/')) {
      return getStorageUrl(path);
    }
    
    // Otherwise, prepend current country code
    const countryCode = currentCountry?.code || DEFAULT_COUNTRY_CODE;
    return getStorageUrl(`${countryCode}/${path}`);
  };

  // Get region of a country
  const getCountryRegion = (countryCode: string): string => {
    return COUNTRY_REGIONS[countryCode as keyof typeof COUNTRY_REGIONS] || 'GLOBAL';
  };

  const value = {
    currentCountry,
    countries,
    isLoading,
    error,
    setCurrentCountry: handleSetCurrentCountry,
    getImageUrl,
    getCountryRegion,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
