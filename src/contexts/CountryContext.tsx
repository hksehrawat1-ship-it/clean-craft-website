import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCookieConsent } from "./CookieConsentContext";
import { useCountryConfig, CountryConfig } from "@/hooks/use-country-config";

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
  
  // Use ref to prevent navigation loops
  const isNavigating = useRef(false);

  // Get country from URL path
  const getCountryFromPath = () => {
    const pathParts = location.pathname.split("/");
    const countryCode = pathParts[1]?.toLowerCase();
    return countryCode && isSupportedCountry(countryCode) ? countryCode : null;
  };

  // Handle country change
  const handleCountryChange = (country: string) => {
    if (isNavigating.current) return;

    if (!isSupportedCountry(country)) {
      toast.error("Invalid country selected");
      return;
    }

    isNavigating.current = true;
    const targetPath = `/${country.toLowerCase()}`;

    // Only navigate if we're not already on the target path
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }

    setCurrentCountry(country);
    
    // Store preference if allowed
    if (hasConsent("preferences")) {
      localStorage.setItem("preferredCountry", country);
    }

    // Reset navigation lock after a short delay
    setTimeout(() => {
      isNavigating.current = false;
    }, 100);
  };

  // Initialize country from URL or stored preference
  useEffect(() => {
    if (isNavigating.current) return;

    const urlCountry = getCountryFromPath();

    if (urlCountry) {
      // Only update state if needed
      setCurrentCountry((prev) => (prev !== urlCountry ? urlCountry : prev));
    } else if (location.pathname === "/") {
      // At root path, try to use stored preference
      const storedCountry = localStorage.getItem("preferredCountry");
      if (
        storedCountry &&
        isSupportedCountry(storedCountry) &&
        hasConsent("preferences")
      ) {
        const targetPath = `/${storedCountry.toLowerCase()}`;
        if (location.pathname !== targetPath) {
          navigate(targetPath);
        }
      }
    }
    // ⚠️ intentionally not putting hasConsent in deps
  }, [location.pathname]);

  const value = {
    countries,
    currentCountry,
    setCurrentCountry: handleCountryChange,
    isLoading: false,
    error,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
