import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import CookieConsentBanner from "./CookieConsentBanner";
import CountryRedirect from "./CountryRedirect";
import CountryRouteGuard from "./CountryRouteGuard";
import CountryLayout from "./CountryLayout";
import { PageLoader } from "./PageLoader";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import PolicyDetails from "../pages/PolicyDetails";
import FaqPage from "../pages/Faq";
import ServicesNavbar from "../pages/ServicesNavbar";
import ThankYouPage from "../pages/ThankYouPage";
import BookingPage from "@/pages/BookingPage";

const LazyCoursesPage = lazy(() => import("../pages/learning/Courses"));
const LazyBookPage = lazy(() => import("../pages/learning/Book"));
const LazyBlogPage = lazy(() => import("../pages/Blog"));
const LazyBlogDetailPage = lazy(() => import("../pages/BlogDetail"));
const LazyFranchisePage = lazy(() => import("../pages/Franchise"));
const LazyPoliciesPage = lazy(() => import("../pages/Policies"));
const LazyDiscoverCleanCraftPage = lazy(
  () => import("../pages/DiscoverCleanCraft")
);
const LazyDynamicLandingPage = lazy(() => import("../pages/DynamicLandingPage"));
const LazyLocationsListPage = lazy(() => import("../pages/LocationsList"));
const LazyLocationItemPage = lazy(() => import("../pages/LocationItemPage"));

export function AppRoutes() {
  return (
    <>
      <CookieConsentBanner />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<CountryRedirect />} />

          <Route path=":countryCode/*" element={<CountryLayout />}>
            <Route
              index
              element={<CountryRouteGuard pagePath="/" element={<Index />} />}
            />

            <Route path="learning">
              <Route
                path="laundry-training-course"
                element={
                  <CountryRouteGuard
                    pagePath="/learning/laundry-training-course"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyCoursesPage />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="laundry-training-book"
                element={
                  <CountryRouteGuard
                    pagePath="/learning/laundry-training-book"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyBookPage />
                      </Suspense>
                    }
                  />
                }
              />
            </Route>

            <Route path="blog">
              <Route
                index
                element={
                  <CountryRouteGuard
                    pagePath="/blog"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyBlogPage />
                      </Suspense>
                    }
                    allowEmptyContent
                  />
                }
              />
              <Route
                path=":slug"
                element={
                  <CountryRouteGuard
                    pagePath="/blog"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyBlogDetailPage />
                      </Suspense>
                    }
                    allowEmptyContent
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
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyPoliciesPage />
                      </Suspense>
                    }
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

            <Route
              path="discover-cleancraft"
              element={
                <CountryRouteGuard
                  pagePath="/discover-cleancraft"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <LazyDiscoverCleanCraftPage />
                    </Suspense>
                  }
                  allowEmptyContent
                />
              }
            />

            <Route
              path="laundry-franchise"
              element={
                <CountryRouteGuard
                  pagePath="/laundry-franchise"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <LazyFranchisePage />
                    </Suspense>
                  }
                  allowEmptyContent
                />
              }
            />

            {/* ✅ Correct Booking Page Route (no leading slash) */}
            <Route
              path="book"
              element={
                <CountryRouteGuard
                  pagePath="/book"
                  element={<BookingPage />}
                  allowEmptyContent
                />
              }
            />

            {/* ✅ Thank You Page Route */}
            <Route
              path="thank-you"
              element={
                <CountryRouteGuard
                  pagePath="/thank-you"
                  element={<ThankYouPage />}
                  allowEmptyContent
                />
              }
            />

            {/* Locations Routes */}
            <Route path="locations">
              <Route
                index
                element={
                  <CountryRouteGuard
                    pagePath="/locations"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLocationsListPage />
                      </Suspense>
                    }
                    allowEmptyContent
                  />
                }
              />
              <Route
                path=":service"
                element={
                  <CountryRouteGuard
                    pagePath="/locations"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLocationItemPage />
                      </Suspense>
                    }
                    allowEmptyContent
                  />
                }
              />
            </Route>

            {/* Dynamic Landing Pages */}
            <Route
              path=":city"
              element={
                <Suspense fallback={<PageLoader />}>
                  <LazyDynamicLandingPage />
                </Suspense>
              }
            />
            <Route
              path=":city/:service"
              element={
                <Suspense fallback={<PageLoader />}>
                  <LazyDynamicLandingPage />
                </Suspense>
              }
            />

            {/* Country-level fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Global fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
