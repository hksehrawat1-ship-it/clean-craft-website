import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useCountry } from '@/contexts/CountryContext';
import { isPageEnabled } from '@/hooks/use-pages-config';

interface Props {
  pagePath: string;
  element: React.ReactNode;
  allowEmptyContent?: boolean;
}

const CountryRouteGuard: React.FC<Props> = ({
  pagePath,
  element,
  allowEmptyContent = false,
}) => {
  const { countryCode } = useParams();

  /* 1 ─ country context */
  const { currentCountry, isLoading: isCountriesLoading } = useCountry();

  /* 2 ─ YAML page-matrix (synchronous once loaded) */
  // const { isPageEnabled } = usePagesConfig();

  /* spinner until country list is ready */
  if (isCountriesLoading || !currentCountry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!countryCode) return <Navigate to="/" replace />;

  if (!isPageEnabled(currentCountry, pagePath)) {
    return <Navigate to={`/${countryCode}/not-found`} replace />;
  }

  if (allowEmptyContent) return <>{element}</>;

  return <>{element}</>;
};

export default CountryRouteGuard;
