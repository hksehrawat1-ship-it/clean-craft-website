
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import CookieConsentBanner from "./CookieConsentBanner";
import CountryRedirect from "./CountryRedirect";
import CountryRouteGuard from "./CountryRouteGuard";
import { SitemapGenerator } from "./SitemapGenerator";
import CountryLayout from "./CountryLayout";
import { PageLoader } from "./PageLoader";

/* pages */
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Courses from "../pages/learning/Courses";
import Book from "../pages/learning/Book";
import Policies from "../pages/Policies";
import PolicyDetails from "../pages/PolicyDetails";
import FaqPage from "../pages/Faq";
import Franchise from "../pages/Franchise";
import ServicesNavbar from "../pages/ServicesNavbar";

/* Lazy loaded components for code splitting */
const LazyBookPage = lazy(() => import("../pages/learning/Book"));
const LazyFranchisePage = lazy(() => import("../pages/Franchise"));

export function AppRoutes() {
  return (
    <>
      <CookieConsentBanner />
      <SitemapGenerator />
      
      <Suspense fallback={<PageLoader />}>
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
                    element={<Suspense fallback={<PageLoader />}><LazyBookPage /></Suspense>}
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
            
            {/* Services page */}
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
                  element={<Suspense fallback={<PageLoader />}><LazyFranchisePage /></Suspense>}
                  allowEmptyContent
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
