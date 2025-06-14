import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IPData from "ipdata"; // Official ipdata client
import { countryConfig } from "@/hooks/use-country-config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Globe, Loader2 } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

interface CountryRedirectProps {
  path?: string;
}

// Your ipdata API key
const IPDATA_API_KEY = "6aee2f02cd09fb288e6b7e1f824c5f60debac930d5f68326041a1777";

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = "" }) => {
  const { countries } = countryConfig;
  const { hasConsent } = useCookieConsent();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState<Error | null>(null);

  // Guard to run detection only once
  const hasRunDetection = useRef(false);
  const isNavigating = useRef(false);

  /* --------------------- Toasts --------------------- */
  useEffect(() => {
    if (detectError) {
      console.error("Error during IP lookup:", detectError);
      toast.error("Couldn't detect your country. Please select one manually.", {
        id: "country-error",
        duration: 5000,
      });
    } else if (!hasConsent("essential")) {
      toast.info(
        "We use one essential cookie to remember your country during this visit.",
        { id: "essential-required", duration: 5000 }
      );
    }
  }, [detectError, hasConsent]);

  /* ----------------- Group countries by region ----------------- */
  const groupedCountries = countries.reduce<Record<string, typeof countries[0][]>>(
    (acc, country) => {
      const code = country.code.toLowerCase();
      const region = ["in", "au", "sg", "my"].includes(code)
        ? "ASIA/PACIFIC"
        : ["uk", "de", "fr", "es", "it"].includes(code)
        ? "EUROPE"
        : ["us", "ca"].includes(code)
        ? "AMERICAS"
        : ["ae", "sa", "qa", "kw", "bh"].includes(code)
        ? "MIDDLE EAST"
        : "OTHER REGIONS";
      (acc[region] ||= []).push(country);
      return acc;
    },
    {}
  );

  /* ------------- Handle Navigation ------------- */
  const handleNavigation = (countryCode: string) => {
    if (isNavigating.current) return;

    isNavigating.current = true;
    const targetPath = `/${countryCode.toLowerCase()}${path}`;
    
    if (hasConsent("preferences")) {
      localStorage.setItem("selectedCountry", countryCode.toUpperCase());
    }

    navigate(targetPath, { replace: true });
    
    setTimeout(() => {
      isNavigating.current = false;
    }, 100);
  };

  /* ------------- Main Detection Effect ------------- */
  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      countries.length === 0 ||
      hasRunDetection.current ||
      isNavigating.current
    ) {
      setIsLoading(false);
      return;
    }

    const detectCountry = async () => {
      try {
        hasRunDetection.current = true;
        setDetecting(true);
        setDetectError(null);

        // Check stored preference first
        const stored = localStorage.getItem("selectedCountry")?.toLowerCase();
        if (stored && countries.some((c) => c.code.toLowerCase() === stored)) {
          handleNavigation(stored);
          return;
        }

        // Use IP detection as fallback
        const ipdata = new IPData(IPDATA_API_KEY);
        const info = await ipdata.lookup();
        const detected = info.country_code?.toLowerCase();

        if (detected && countries.some((c) => c.code.toLowerCase() === detected)) {
          handleNavigation(detected);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        setDetectError(err as Error);
        setIsLoading(false);
      } finally {
        setDetecting(false);
      }
    };

    detectCountry();
  }, [countries, path, hasConsent]);

  /* ------------------ Loading UI ------------------ */
  if (isLoading || detecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#1869D3] text-white">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-xl font-medium mb-2">Detecting your country…</p>
      </div>
    );
  }

  /* ------------ Manual Country Picker UI ------------ */
  const handleManualSelect = (code: string) => {
    handleNavigation(code);
  };

  return (
    <div className="min-h-screen bg-[#1869D3] flex items-center">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Title + Picker */}
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Laundry and Dry
              <br />
              cleaning.
              <br />
              Delivered in 24h.
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              Find us in countries around the world
            </p>

            <div className="space-y-4">
              {Object.entries(groupedCountries).map(([region, list]) => (
                <div key={region}>
                  <h3 className="text-sm font-bold text-blue-200 mb-2">
                    {region}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {list.map((c) => (
                      <Button
                        key={c.code}
                        variant="outline"
                        className="w-full justify-start bg-white/10 hover:bg-white/20 border-white/20 h-10"
                        onClick={() => handleManualSelect(c.code)}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        <span className="truncate">{c.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="hidden lg:flex lg:justify-center">
            <div className="relative w-[240px] h-[480px]">
              <img
                src="/lovable-uploads/cleancraft-laundry-app.png"
                alt="Cleancraft Mobile App"
                className="w-full h-full object-contain"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryRedirect;
