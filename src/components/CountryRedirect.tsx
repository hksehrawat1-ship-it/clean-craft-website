import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Globe, Loader2 } from "lucide-react";
import { StrapiCountry } from "@/types/strapi";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

interface CountryRedirectProps {
  path?: string;
}

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = "" }) => {
  const { currentCountry, countries, detectUserCountry, isLoading, error } =
    useCountry();
  const { hasConsent } = useCookieConsent();
  const navigate = useNavigate();

  const [detectionInProgress, setDetectionInProgress] = useState(false);
  const [detectionError, setDetectionError] = useState<Error | null>(null);

  /* --------------------- Toasts --------------------- */
  useEffect(() => {
    if (error || detectionError) {
      console.error("Error detected:", error || detectionError);
      toast.error(
        "Couldn't load country information. Please select one manually.",
        {
          id: "country-error",
          duration: 5000,
        }
      );
    } else if (!hasConsent("essential") && window.location.pathname === "/") {
      toast.info(
        "We use one essential cookie to remember your country during this visit.",
        { id: "essential-required", duration: 5000 }
      );
    }
  }, [error, detectionError, hasConsent]);

  /* ----------------- Country Groups ----------------- */
  const groupedCountries = countries.reduce<Record<string, StrapiCountry[]>>(
    (acc, country) => {
      if (!country?.code) return acc;
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

  /* -------- Auto-detect on "/" with consent -------- */
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    if (isLoading || countries.length === 0 || detectionInProgress) return;

    if (!hasConsent("essential")) {
      console.warn("Skipping auto-detection: no essential consent");
      return;
    }

    const runDetection = async () => {
      try {
        setDetectionInProgress(true);
        setDetectionError(null); // clear previous error

        const detectedCode = await detectUserCountry();
        if (detectedCode) {
          navigate(`/${detectedCode}${path}`);
          if (hasConsent("preferences")) {
            localStorage.setItem("selectedCountry", detectedCode.toUpperCase());
          }
        } else {
          setDetectionError(new Error("Could not detect country"));
        }
      } catch (e) {
        setDetectionError(e as Error);
      } finally {
        setDetectionInProgress(false);
      }
    };

    runDetection();
  }, [
    isLoading,
    countries,
    detectUserCountry,
    navigate,
    path,
    hasConsent,
    detectionInProgress,
  ]);

  /* --------- Redirect if currentCountry set --------- */
  useEffect(() => {
    if (
      window.location.pathname === "/" &&
      hasConsent("essential") &&
      currentCountry
    ) {
      navigate(`/${currentCountry.code.toLowerCase()}${path}`);
    }
  }, [currentCountry, hasConsent, navigate, path]);

  /* ------------------ Loading UI ------------------ */
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#1869D3] text-white">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-xl font-medium mb-2">Loading countries...</p>
      </div>
    );
  }

  /* -------------- Manual Country Picker ------------- */
  const handleManualSelect = (code: string) => navigate(`/${code}${path}`);

  return (
    <div className="min-h-screen bg-[#1869D3] flex items-center">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side */}
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
              {[
                "ASIA/PACIFIC",
                "EUROPE",
                "AMERICAS",
                "MIDDLE EAST",
                "OTHER REGIONS",
              ]
                .filter((r) => groupedCountries[r])
                .map((region) => (
                  <div key={region}>
                    <h3 className="text-sm font-bold text-blue-200 mb-2">
                      {region}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {groupedCountries[region].map((c) => (
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

          {/* Right Side */}
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
