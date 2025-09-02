import React from "react";
import { useParams } from "react-router-dom";
import { useStrapiPolicies } from "@/hooks/useStrapi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";

export default function PolicyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: policies, isLoading } = useStrapiPolicies();

  if (isLoading) {
    return (
      <>
        <EnhancedNavbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <LoadingSpinner />
        </div>
        <Footer />
      </>
    );
  }

  const policy = policies?.find((p) => p.slug === slug);

  if (!policy) {
    return (
      <>
        <EnhancedNavbar />
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-12 md:py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Policy not found
            </h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const policyName = policy.name;
  const policyDescription = policy.description;

  const getEffectiveDate = () => {
    const dateStr = policy.publishedAt;
    const date = dateStr ? new Date(dateStr) : null;
    return date && !isNaN(date.getTime())
      ? format(date, "MMM d, yyyy")
      : "Date not available";
  };

  return (
    <>
      <SEO
        slug={`policies/${policy.slug}`}
        defaultTitle={`${policyName} | CleanCraft`}
        defaultDescription={policyDescription}
      />
      <EnhancedNavbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                {policyName}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Effective: {getEffectiveDate()}</span>
              </div>

              {/* ✅ Render policy.content from JSON with proper typing */}
              <div className="prose max-w-none space-y-4">
                {Array.isArray(policy.content) &&
                  policy.content.map((block: any, index: number) => {
                    if (block.type === "paragraph") {
                      const text =
                        block.children
                          ?.map((child: { text: string }) => child.text)
                          .join("") || "";
                      return <p key={index}>{text}</p>;
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
