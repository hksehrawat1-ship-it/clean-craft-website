
import React from 'react';
import { Outlet, Navigate, useParams } from 'react-router-dom';
import { usePageAvailability } from '@/hooks/usePageAvailability';
import { Loader2 } from 'lucide-react';

interface CountryRouteGuardProps {
  pagePath: string;
  element: React.ReactNode;
}

const CountryRouteGuard: React.FC<CountryRouteGuardProps> = ({ pagePath, element }) => {
  const { countryCode } = useParams();
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

  if (!isAvailable) {
    return <Navigate to={`/${countryCode}`} replace />;
  }

  return <>{element}</>;
};

export default CountryRouteGuard;
