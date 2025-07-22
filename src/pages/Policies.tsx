import React from "react";
import { Link } from "react-router-dom";
import { useStrapiPolicies } from "@/hooks/useStrapi";
import Layout from "@/components/home/Layout";
import { useCountry } from "@/contexts/CountryContext";
import { FileText, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancedSEO } from "@/components/EnhancedSEO"; // ✅ SEO import

const Policies = () => {
  const { currentCountry } = useCountry();
  const { data: policies, isLoading, error } = useStrapiPolicies();

  const createLink = (path: string): string => {
    if (!currentCountry) return "/";
    return `/${currentCountry.toLowerCase()}${path}`;
  };

  return (
    <>
      <EnhancedSEO
        slug="/policies"
        pageType="Organization"
        defaultTitle="Laundry Franchise Opportunity | Clean Craft"
        defaultDescription="Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available."
        customKeywords={[
          "dry cleaning franchise",
          "wet cleaning business opportunity",
          "profitable laundry franchise",
        ]}
      />

      <Layout showOfferCarousel={false}>
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our Policy
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn about our terms, policies, and guidelines that ensure the
                best service experience for you.
              </p>
            </div>

            {isLoading ? (
              <div className="animate-pulse space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Error Loading Policies
                </h1>
                <p className="text-gray-600 mb-6">
                  We're having trouble loading the policies. Please try again
                  later.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : policies && policies.length > 0 ? (
              <div className="grid gap-6">
                {policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {policy.name}
                        </h2>

                        {policy.description && (
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {policy.description}
                          </p>
                        )}

                        <Link
                          to={createLink(`/policies/${policy.slug}`)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:translate-x-1 transition-all duration-200"
                        >
                          Read Full Policy
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Policies Available
                </h3>
                <p className="text-gray-600 mb-6">
                  No policies are currently available for your region. Please
                  check back later.
                </p>
                <Link to={createLink("/")}>
                  <Button variant="outline">Return to Home</Button>
                </Link>
              </div>
            )}

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    Questions about our policies?
                  </h3>
                  <p className="text-blue-700 text-sm">
                    If you have any questions or need clarification about our
                    policies, please don't hesitate to contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Policies;
