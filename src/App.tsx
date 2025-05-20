import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { CountryProvider } from './contexts/CountryContext';

import CookieConsentBanner from './components/CookieConsentBanner';
import CountryRedirect from './components/CountryRedirect';
import CountryRouteGuard from './components/CountryRouteGuard';

/* pages */
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Courses from './pages/learning/Courses';
import Book from './pages/learning/Book';
import Policies from './pages/Policies';
import PolicyDetails from './pages/PolicyDetails';

/* layout that just renders routed content */
const CountryLayout = () => <Outlet />;

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <CookieConsentProvider>
              <CountryProvider>
                <CookieConsentBanner />

                <Routes>
                  {/* root → geo-IP redirect or manual picker */}
                  <Route path="/" element={<CountryRedirect />} />

                  {/* country-specific section */}
                  <Route path=":countryCode/*" element={<CountryLayout />}>
                    <Route
                      index
                      element={
                        <CountryRouteGuard pagePath="/" element={<Index />} />
                      }
                    />

                    <Route path="learning">
                      <Route
                        path="courses"
                        element={
                          <CountryRouteGuard
                            pagePath="/learning/courses"
                            element={<Courses />}
                          />
                        }
                      />
                      <Route
                        path="book"
                        element={
                          <CountryRouteGuard
                            pagePath="/learning/book"
                            element={<Book />}
                          />
                        }
                      />
                    </Route>

                    <Route path="policies">
                      <Route
                        index
                        element={
                          <CountryRouteGuard
                            pagePath="/policies"
                            element={<Policies />}
                            allowEmptyContent
                          />
                        }
                      />
                      <Route
                        path=":slug"
                        element={
                          <CountryRouteGuard
                            pagePath="/policies"
                            element={<PolicyDetails />}
                          />
                        }
                      />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CountryProvider>
            </CookieConsentProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
