import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useCountry } from "@/contexts/CountryContext";
import { isPageEnabled } from "@/hooks/use-pages-config";

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

  const { currentCountry, isLoading: isCountriesLoading } = useCountry();

  if (isCountriesLoading || !currentCountry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!countryCode) return <Navigate to="/" replace />;

  // ✅ FIX: Only block route if NOT enabled AND not allowEmptyContent
  if (!isPageEnabled(currentCountry, pagePath) && !allowEmptyContent) {
    return <Navigate to={`/${countryCode}/not-found`} replace />;
  }

  return <>{element}</>;
};

export default CountryRouteGuard;
