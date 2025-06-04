
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { CookieConsentProvider } from "../contexts/CookieConsentContext";
import { CountryProvider } from "../contexts/CountryContext";
import { StrapiConnectionProvider } from "../contexts/StrapiConnectionContext";

interface AppProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <StrapiConnectionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieConsentProvider>
              <CountryProvider>
                {children}
              </CountryProvider>
            </CookieConsentProvider>
          </BrowserRouter>
        </StrapiConnectionProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
