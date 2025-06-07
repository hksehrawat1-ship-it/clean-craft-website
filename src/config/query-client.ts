
import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { 
        retry: (failureCount, error) => {
          // Retry up to 2 times for network errors, but not for 4xx errors
          if (failureCount < 2) {
            const errorMessage = error?.message?.toLowerCase() || '';
            return !errorMessage.includes('400') && 
                   !errorMessage.includes('401') && 
                   !errorMessage.includes('403') && 
                   !errorMessage.includes('404');
          }
          return false;
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (updated from cacheTime)
      },
    },
  });
}
