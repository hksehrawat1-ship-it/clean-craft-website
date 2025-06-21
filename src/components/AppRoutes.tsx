
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

/* global layout / wrappers */
import CookieConsentBanner from "./CookieConsentBanner";
import CountryRedirect from "./CountryRedirect";
import CountryRouteGuard from "./CountryRouteGuard";
import CountryLayout from "./CountryLayout";
import { PageLoader } from "./PageLoader";

/* statically‑rendered pages (small + always needed) */
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import PolicyDetails from "../pages/PolicyDetails";
import FaqPage from "../pages/Faq";
import ServicesNavbar from "../pages/ServicesNavbar";

/* ✨ Lazy‑loaded (code‑split) pages */
const LazyCoursesPage = lazy(() => import("../pages/learning/Courses"));
const LazyBookPage = lazy(() => import("../pages/learning/Book"));
const LazyBlogPage = lazy(() => import("../pages/Blog"));
const LazyBlogDetailPage = lazy(() => import("../pages/BlogDetail"));
const LazyFranchisePage = lazy(() => import("../pages/Franchise"));
const LazyPoliciesPage = lazy(() => import("../pages/Policies"));
const LazyDiscoverCleanCraftPage = lazy(() => import("../pages/DiscoverCleanCraft"));

export function AppRoutes() {
  return (
    <>
      <CookieConsentBanner />

      {/* Outer suspense ensures a single fallback while any lazy chunk loads */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 🌍 Geo‑IP redirect or manual picker */}
          <Route path="/" element={<CountryRedirect />} />

          {/* ───────────────── Country‑scoped section ───────────────── */}
          <Route path=":countryCode/*" element={<CountryLayout />}>
            {/* Home */}
            <Route
              index
              element={<CountryRouteGuard pagePath="/" element={<Index />} />}
            />

            {/* Learning section */}
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

            {/* Blog */}
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

            {/* Policies */}
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

            {/* FAQ */}
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

            {/* Services */}
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

            {/* Discover Clean Craft */}
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

            {/* Franchise */}
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

            {/* 404 inside country scope */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* global 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
