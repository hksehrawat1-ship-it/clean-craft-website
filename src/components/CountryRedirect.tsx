import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe, Loader2 } from 'lucide-react';
import { StrapiCountry } from '@/types/strapi';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

interface CountryRedirectProps {
  path?: string;
}

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = '' }) => {
  const { currentCountry, countries, setCurrentCountry, detectUserCountry, isLoading, error } = useCountry();
  const { hasConsent } = useCookieConsent();
  const navigate = useNavigate();
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const [detectionInProgress, setDetectionInProgress] = useState(false);
  const [detectionError, setDetectionError] = useState<Error | null>(null);
  
  // Debug logging
  useEffect(() => {
    console.log('CountryRedirect component state:', {
      countries: countries.length,
      isLoading,
      currentCountry,
      error,
      detectionInProgress,
      redirectAttempts,
      pathname: window.location.pathname
    });
  }, [countries, isLoading, currentCountry, error, detectionInProgress, redirectAttempts]);
  
  // Show toasts for errors and cookie consent
  useEffect(() => {
    if (error || detectionError) {
      console.error('Error detected:', error || detectionError);
      toast.error("Couldn't load country information. Please select one manually.", {
        id: 'country-error',
        duration: 5000,
      });
    } else if (!hasConsent('preferences') && window.location.pathname === '/') {
      console.log('Preferences cookies not enabled');
      toast.info("Please accept preferences cookies to save your country selection.", {
        id: 'preferences-required',
        duration: 5000,
      });
    }
  }, [error, detectionError, hasConsent]);

  // Group countries by region
  const groupedCountries = countries.reduce<Record<string, StrapiCountry[]>>((acc, country) => {
    if (!country?.code) return acc;
    
    let region = 'OTHER REGIONS';
    const countryCode = country.code.toLowerCase();
    
    if (['in', 'au', 'sg', 'my'].includes(countryCode)) {
      region = 'ASIA/PACIFIC';
    } else if (['uk', 'de', 'fr', 'es', 'it'].includes(countryCode)) {
      region = 'EUROPE';
    } else if (['us', 'ca'].includes(countryCode)) {
      region = 'AMERICAS';
    } else if (['ae', 'sa', 'qa', 'kw', 'bh'].includes(countryCode)) {
      region = 'MIDDLE EAST';
    }
    
    if (!acc[region]) acc[region] = [];
    acc[region].push(country);
    return acc;
  }, {});
  
  // Auto-detect country and redirect
  useEffect(() => {
    const autoDetectCountry = async () => {
      // Only run detection on root path
      if (window.location.pathname !== '/') {
        setDetectionInProgress(false);
        return;
      }
      
      // Skip if countries haven't loaded or already detecting
      if (isLoading || countries.length === 0 || detectionInProgress) {
        return;
      }
      
      // Skip if we don't have necessary cookie consents
      if (!hasConsent('essential') || !hasConsent('preferences')) {
        setDetectionError(new Error('Cookie consent required'));
        return;
      }
      
      try {
        console.log('Starting country detection...');
        setDetectionInProgress(true);
        setDetectionError(null);
        
        // Set a shorter timeout for better UX
        const detectionTimeout = setTimeout(() => {
          console.log('Country detection timeout reached');
          setDetectionInProgress(false);
          setDetectionError(new Error('Country detection timed out'));
        }, 5000);
        
        const detectedCountry = await detectUserCountry();
        clearTimeout(detectionTimeout);
        
        if (detectedCountry) {
          console.log('Navigating to detected country:', detectedCountry);
          navigate(`/${detectedCountry}${path}`);
        } else {
          console.warn('No country detected');
          setDetectionError(new Error('Could not detect country'));
        }
      } catch (error) {
        console.error('Country detection failed:', error);
        setDetectionError(error as Error);
      } finally {
        setDetectionInProgress(false);
      }
    };
    
    autoDetectCountry();
  }, [isLoading, countries, detectUserCountry, navigate, path, hasConsent, detectionInProgress]);

  // Increment redirect attempts to prevent infinite loading
  useEffect(() => {
    if ((isLoading || detectionInProgress) && redirectAttempts < 3) {
      const timer = setTimeout(() => {
        console.log('Incrementing redirect attempts');
        setRedirectAttempts(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, detectionInProgress, redirectAttempts]);

  const handleCountrySelect = (code: string) => {
    try {
      console.log('User selected country:', code);
      setCurrentCountry(code);
      navigate(`/${code}${path}`);
    } catch (error) {
      console.error('Error selecting country:', error);
      toast.error('Failed to set country. Please try again.');
    }
  };

  // Show country selector if:
  // 1. On root path
  // 2. Detection failed or cookies not accepted
  // 3. Countries are loaded but something went wrong
  const showCountrySelector = 
    window.location.pathname === '/' && 
    !isLoading && 
    countries.length > 0 && 
    (!hasConsent('preferences') || detectionError || error || redirectAttempts >= 2);
  
  if (showCountrySelector) {
    return (
      <div className="min-h-screen bg-[#1869D3] flex items-center">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/cleancraft-icon.png" 
                  alt="Cleancraft"
                  className="h-10 md:h-12 [filter:brightness(0)_invert(1)_sepia(1)_saturate(10000%)_hue-rotate(45deg)]"
                />
              </div>

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
              
              {/* Country Selection */}
              <div className="space-y-4">
                {/* Show Asia/Pacific region first */}
                {groupedCountries['ASIA/PACIFIC'] && (
                  <div>
                    <h3 className="text-sm font-bold text-blue-200 mb-2">ASIA/PACIFIC</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {groupedCountries['ASIA/PACIFIC'].map((country) => (
                        <Button
                          key={country.code}
                          variant="outline"
                          className="w-full justify-start text-left bg-white/10 hover:bg-white/20 border-white/20 h-10"
                          onClick={() => handleCountrySelect(country.code)}
                        >
                          <Globe className="w-4 h-4 mr-2 shrink-0" />
                          <span className="truncate">{country.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Other regions */}
                {Object.entries(groupedCountries)
                  .filter(([region]) => region !== 'ASIA/PACIFIC')
                  .map(([region, regionCountries]) => (
                    <div key={region}>
                      <h3 className="text-sm font-bold text-blue-200 mb-2">{region}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {regionCountries.map((country) => (
                          <Button
                            key={country.code}
                            variant="outline"
                            className="w-full justify-start text-left bg-white/10 hover:bg-white/20 border-white/20 h-10"
                            onClick={() => handleCountrySelect(country.code)}
                          >
                            <Globe className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">{country.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Column - App Preview */}
            <div className="hidden lg:flex lg:justify-center">
              <div className="relative w-[240px] h-[480px]">
                {/* App Screenshot */}
                <img 
                  src="/lovable-uploads/cleancraft-laundry-app.png"
                  alt="Cleancraft Mobile App"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                {/* Floating Icons */}
                <div className="absolute -right-12 top-16 transform-gpu">
                  <img 
                    src="/lovable-uploads/wash-and-fold.png" 
                    alt="" 
                    className="w-16 h-16 animate-float object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 transform-gpu">
                  <img 
                    src="/lovable-uploads/dry-cleaning.png" 
                    alt="" 
                    className="w-16 h-16 animate-float-delayed object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <div className="absolute -right-10 bottom-24 transform-gpu">
                  <img 
                    src="/lovable-uploads/ironing.png" 
                    alt="" 
                    className="w-16 h-16 animate-float object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show loading state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#1869D3] text-white">
      <Loader2 className="h-12 w-12 animate-spin mb-4" />
      <p className="text-xl font-medium mb-2">Loading...</p>
      {detectionInProgress && (
        <p className="text-blue-200">Detecting your location...</p>
      )}
      {redirectAttempts > 1 && (
        <Button 
          variant="outline" 
          className="mt-4 border-white text-white hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      )}
    </div>
  );
};

export default CountryRedirect;
