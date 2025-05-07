
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePageAvailability = (pagePath: string) => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const checkPageAvailability = async () => {
      if (!countryCode) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        
        // Check if this page is available for the current country
        const { data: isAvailable, error: availabilityError } = await supabase
          .rpc('is_page_available', {
            country_code: countryCode.toLowerCase(),
            page_path: pagePath
          });

        if (availabilityError) {
          console.error('Error checking page availability:', availabilityError);
          setIsAvailable(false);
        } else {
          setIsAvailable(!!isAvailable);
          
          // If page is available, try to load its content
          if (isAvailable) {
            const { data: content, error: contentError } = await supabase
              .rpc('get_page_content', {
                p_country_code: countryCode.toLowerCase(),
                p_slug: pagePath
              });
              
            if (!contentError && content) {
              setPageContent(content);
            } else if (contentError) {
              console.error('Error loading page content:', contentError);
            }
          } else {
            // If page is not available, redirect to country homepage
            toast.error(`This feature is not available in your region.`);
            navigate(`/${countryCode}`);
          }
        }
      } catch (error) {
        console.error('Error in page availability check:', error);
        setIsAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPageAvailability();
  }, [countryCode, pagePath, navigate]);

  return { isLoading, isAvailable, pageContent };
};
