
import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { CountryProvider } from "./contexts/CountryContext";
import { StrapiConnectionProvider } from "./contexts/StrapiConnectionContext";

import CookieConsentBanner from "./components/CookieConsentBanner";
import CountryRedirect from "./components/CountryRedirect";
import CountryRouteGuard from "./components/CountryRouteGuard";

/* pages */
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/learning/Courses";
import Book from "./pages/learning/Book";
import Policies from "./pages/Policies";
import PolicyDetails from "./pages/PolicyDetails";
import FaqPage from "./pages/Faq";
import Franchise from "./pages/Franchise";
import ServicesNavbar from "./pages/ServicesNavbar";

/* layout that just renders routed content */
const CountryLayout = () => <Outlet />;

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { 
            retry: (failureCount, error) => {
              // Retry up to 2 times for network errors, but not for 4xx errors
              if (failureCount < 2) {
                const errorMessage = error?.message?.toLowerCase() || '';
                return !errorMessage.includes('400') && !errorMessage.includes('401') && !errorMessage.includes('403') && !errorMessage.includes('404');
              }
              return false;
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <StrapiConnectionProvider>
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

                    {/* FAQ page route */}
                    <Route
                      path="faq"
                      element={
                        <CountryRouteGuard
                          pagePath="/faq"
                          element={<FaqPage />}
                          allowEmptyContent
                        />
                      }
                    />
                    {/* serviceNavbar
                     */}
                    <Route
                      path="services"
                      element={
                        <CountryRouteGuard
                          pagePath="/services"
                          element={<ServicesNavbar />}
                          allowEmptyContent
                        />
                      }
                    />

                    {/* Franchise page route */}
                    <Route
                      path="franchise"
                      element={
                        <CountryRouteGuard
                          pagePath="/franchise"
                          element={<Franchise />}
                          allowEmptyContent
                        />
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CountryProvider>
            </CookieConsentProvider>
          </BrowserRouter>
        </StrapiConnectionProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
