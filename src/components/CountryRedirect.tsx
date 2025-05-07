
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe } from 'lucide-react';

interface CountryRedirectProps {
  path?: string;
}

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = '' }) => {
  const { currentCountry, countries, setCurrentCountry, isLoading, error } = useCountry();
  const navigate = useNavigate();
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  
  // Group countries by region
  const groupedCountries = countries.reduce((acc, country) => {
    // Determine region based on country code
    // This is a simple mapping - in production, you might want to store this in your database
    let region = 'GLOBAL';
    if (['in', 'au', 'sg', 'my'].includes(country.code)) {
      region = 'ASIA/PACIFIC';
    } else if (['uk', 'de', 'fr', 'es', 'it'].includes(country.code)) {
      region = 'EUROPE';
    } else if (['us', 'ca'].includes(country.code)) {
      region = 'NORTH AMERICA';
    }
    
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(country);
    return acc;
  }, {} as Record<string, typeof countries>);
  
  // Handle redirection based on selected country
  useEffect(() => {
    if (!isLoading && currentCountry) {
      navigate(`/${currentCountry.code}${path}`);
    }
  }, [currentCountry, isLoading, navigate, path]);

  // Increment redirect attempts to prevent infinite loading
  useEffect(() => {
    if (isLoading && redirectAttempts < 3) {
      const timer = setTimeout(() => {
        setRedirectAttempts(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, redirectAttempts]);

  // Helper to select a country
  const handleCountrySelect = (code: string) => {
    setCurrentCountry(code);
  };

  // Always show the country selection screen if we have countries available,
  // or if there's an error or we've tried loading too many times
  if (countries.length > 0 || error || (redirectAttempts >= 3 && isLoading)) {
    if (error) {
      toast.error("Couldn't load country information. Please select one manually.");
    }
    
    return (
      <div className="flex flex-col items-center min-h-screen bg-[#1869D3] text-white p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
            {/* Left Column - Mobile Mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-[300px] h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-800">
                {/* Phone Mockup Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col">
                  <div className="bg-white h-16 w-full flex items-center px-4 shadow-sm">
                    <div className="w-[120px]">
                      <img 
                        src="/cleancraft-logo.svg" 
                        alt="CleanCraft Logo" 
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="rounded-lg bg-white shadow p-4 mb-3">
                      <h3 className="text-black font-medium text-sm">Wash & Iron</h3>
                      <p className="text-gray-500 text-xs">Premium service for your clothes</p>
                    </div>
                    <div className="rounded-lg bg-white shadow p-4 mb-3">
                      <h3 className="text-black font-medium text-sm">Dry Cleaning</h3>
                      <p className="text-gray-500 text-xs">Professional care for delicate fabrics</p>
                    </div>
                    <div className="rounded-lg bg-white shadow p-4">
                      <h3 className="text-black font-medium text-sm">Duvet & Blankets</h3>
                      <p className="text-gray-500 text-xs">Deep clean for bulky items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Country Selection */}
            <div className="lg:order-last">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Quality laundry service at your fingertips
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Please select your location to continue to our website
              </p>
              
              {/* Country Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-gray-800">
                <h2 className="text-xl font-semibold mb-4">Select your location</h2>
                
                {Object.entries(groupedCountries).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedCountries).map(([region, regionCountries]) => (
                      <div key={region}>
                        <h3 className="text-sm font-bold text-gray-500 mb-2">{region}</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {regionCountries.map((country) => (
                            <Button
                              key={country.code}
                              variant="outline"
                              className="justify-start h-12 px-4 w-full hover:bg-blue-50 hover:border-blue-300"
                              onClick={() => handleCountrySelect(country.code)}
                            >
                              <Globe className="mr-2 h-4 w-4 text-gray-500" />
                              <span>{country.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-red-500 mb-2">No countries available</p>
                    <p className="text-sm text-gray-600">
                      Please check that countries are properly configured in the database.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show loading state while redirecting
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#1869D3] text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
      <p>Loading country information...</p>
    </div>
  );
};

export default CountryRedirect;
