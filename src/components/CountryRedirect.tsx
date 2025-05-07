
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CountryRedirectProps {
  path?: string;
}

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = '' }) => {
  const { currentCountry, countries, setCurrentCountry, isLoading, error } = useCountry();
  const navigate = useNavigate();
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  
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

  // If there's an error or we've tried loading too many times, show country selection
  if (error || (redirectAttempts >= 3 && isLoading)) {
    if (error) {
      toast.error("Couldn't load country information. Please select one manually.");
    }
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Select Your Location</h1>
          
          {countries.length > 0 ? (
            <>
              <p className="text-gray-600 mb-4 text-center">
                Please select your country to continue
              </p>
              
              <Select onValueChange={handleCountrySelect} defaultValue={countries[0]?.code}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                className="w-full" 
                onClick={() => handleCountrySelect(countries[0].code)}
              >
                Continue
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-red-500 mb-4">No countries available</p>
              <p className="text-sm text-gray-600">
                Please check that countries are properly configured in the database.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Show loading state while redirecting
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1869D3] mb-4"></div>
      <p className="text-gray-600">Loading country information...</p>
    </div>
  );
};

export default CountryRedirect;
