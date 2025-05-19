import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageAvailability } from '@/hooks/usePageAvailability';
import { Loader2 } from 'lucide-react';
import { usePagesConfig } from '@/hooks/use-pages-config';

interface CountryRouteGuardProps {
  pagePath: string;
  element: React.ReactNode;
  allowEmptyContent?: boolean;
}

const CountryRouteGuard: React.FC<CountryRouteGuardProps> = ({ pagePath, element, allowEmptyContent = false }) => {
  const { countryCode } = useParams();
  const { isPageEnabled } = usePagesConfig();
  const { isLoading, isAvailable } = usePageAvailability(pagePath);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!countryCode) {
    return <Navigate to="/" replace />;
  }

  // Check if the page is enabled in the pages config
  if (!isPageEnabled(pagePath)) {
    return <Navigate to={`/${countryCode}/not-found`} replace />;
  }

  // For pages that should show their own "no content" state
  if (allowEmptyContent) {
    return <>{element}</>;
  }

  // For other pages, redirect to not-found if content is not available
  if (!isAvailable) {
    return <Navigate to={`/${countryCode}/not-found`} replace />;
  }

  return <>{element}</>;
};

export default CountryRouteGuard;
