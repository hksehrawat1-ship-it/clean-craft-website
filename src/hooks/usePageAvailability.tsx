
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePageAvailability = (pagePath: string) => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const checkPageAvailability = async () => {
      if (!countryCode) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        
        // Call the Supabase function to check if this page is available for the current country
        const { data, error } = await supabase
          .rpc('is_page_available', {
            country_code: countryCode.toLowerCase(),
            page_path: pagePath
          });

        if (error) {
          console.error('Error checking page availability:', error);
          setIsAvailable(true); // Default to showing the page if there's an error
        } else {
          setIsAvailable(!!data);
          
          // If page is not available, redirect to country homepage
          if (!data) {
            toast.error(`This feature is not available in your region.`);
            navigate(`/${countryCode}`);
          }
        }
      } catch (error) {
        console.error('Error in page availability check:', error);
        setIsAvailable(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkPageAvailability();
  }, [countryCode, pagePath, navigate]);

  return { isLoading, isAvailable };
};
