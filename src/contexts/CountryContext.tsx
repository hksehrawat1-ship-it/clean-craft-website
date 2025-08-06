import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCookieConsent } from "./CookieConsentContext";
import { countryConfig, CountryConfig } from "@/hooks/use-country-config";

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
  const { countries, isSupportedCountry } = countryConfig;

  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isNavigating = useRef(false); // prevent navigation loop

  // Get country from URL
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

    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }

    setCurrentCountry((prev) => (prev !== country ? country : prev));

    if (hasConsent("preferences")) {
      localStorage.setItem("preferredCountry", country);
    }

    // Unlock after short delay
    setTimeout(() => {
      isNavigating.current = false;
    }, 100);
  };

  // On initial load: set from URL or fallback to localStorage
  useEffect(() => {
    if (isNavigating.current) return;

    const urlCountry = getCountryFromPath();

    if (urlCountry) {
      setCurrentCountry((prev) => (prev !== urlCountry ? urlCountry : prev));
    } else if (location.pathname === "/") {
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
