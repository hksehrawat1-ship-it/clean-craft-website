import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isPageEnabled } from './use-pages-config';

export const usePageAvailability = (pagePath: string) => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkPageAvailability = () => {
      if (!countryCode) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const available = isPageEnabled(countryCode, pagePath);
        setIsAvailable(available);
      } catch (error) {
        console.error('Error in page availability check:', error);
        setIsAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPageAvailability();
  }, [countryCode, pagePath, navigate]);

  return { isLoading, isAvailable };
};
