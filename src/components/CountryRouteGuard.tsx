
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageAvailability } from '@/hooks/usePageAvailability';
import { Loader2 } from 'lucide-react';

interface CountryRouteGuardProps {
  pagePath: string;
  element: React.ReactNode;
}

const CountryRouteGuard: React.FC<CountryRouteGuardProps> = ({ pagePath, element }) => {
  const { countryCode } = useParams();
  const { isLoading, isAvailable, pageContent } = usePageAvailability(pagePath);

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
    // If the page is not available for this country, redirect to the NotFound page
    return <Navigate to={`/${countryCode}/not-found`} replace />;
  }

  // Safely pass pageContent to components that might accept it
  let elementWithContent = element;
  
  if (React.isValidElement(element)) {
    // Safe way to check if component accepts pageContent prop
    const componentType = element.type as any;
    
    // Check if propTypes exists and contains pageContent
    if (componentType && 
        componentType.propTypes && 
        'pageContent' in componentType.propTypes) {
      elementWithContent = React.cloneElement(element as React.ReactElement<any>, { pageContent });
    }
  }

  return <>{elementWithContent}</>;
};

export default CountryRouteGuard;
