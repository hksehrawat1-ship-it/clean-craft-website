
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';

interface CountryRedirectProps {
  path?: string;
}

const CountryRedirect: React.FC<CountryRedirectProps> = ({ path = '' }) => {
  const { currentCountry, isLoading } = useCountry();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && currentCountry) {
      navigate(`/${currentCountry.code}${path}`);
    }
  }, [currentCountry, isLoading, navigate, path]);
  
  // Show minimal loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1869D3]"></div>
    </div>
  );
};

export default CountryRedirect;
