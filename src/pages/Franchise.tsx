
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/home/Layout";
import { useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";
import FAQDisplay from "@/components/shared/FAQDisplay";
import TestimonialDisplay from "@/components/shared/TestimonialDisplay";

// Import refactored components
import HeroSection from "@/components/franchise/HeroSection";
import FranchiseComparisonTable from "@/components/franchise/FranchiseComparisonTable";
import SmartChoiceSection from "@/components/franchise/SmartChoiceSection";
import WhyBuyFromUsSection from "@/components/franchise/WhyBuyFromUsSection";
import WhyBuyNowSection from "@/components/franchise/WhyBuyNowSection";
import IdealFranchiseSection from "@/components/franchise/IdealFranchiseSection";
import GuaranteeSection from "@/components/franchise/GuaranteeSection";
import CTASection from "@/components/franchise/CTASection";

const Franchise: React.FC = () => {
  // Fetch franchise-specific FAQs and testimonials
  const { data: faqsData, isLoading: faqsLoading } = useStrapiFAQs({
    category: "franchise",
    sortBy: "order",
    sortOrder: "asc",
  });

  const { data: testimonialsData, isLoading: testimonialsLoading } =
    useStrapiTestimonials({
      category: "franchise",
      sortBy: "rating",
      sortOrder: "desc",
    });

  return (
    <Layout showOfferCarousel={false}>
      <Helmet>
        <title>Laundry Franchise Opportunities | Clean Craft</title>
        <meta
          name="description"
          content="Start your own thriving laundry business with Clean Craft's franchise opportunities. Low investment, high returns, and complete business support."
        />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Franchise Comparison Table */}
      <FranchiseComparisonTable />

      {/* Smart Choice Section */}
      <SmartChoiceSection />

      {/* Why Buy From Us Section */}
      <WhyBuyFromUsSection />

      {/* Why Buy Now Section */}
      <WhyBuyNowSection />

      {/* Ideal Franchise Section */}
      <IdealFranchiseSection />

      {/* Clean Craft Partner Guarantee */}
      <GuaranteeSection />

      {/* FAQ Section */}
      {faqsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin text-primary border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : faqsData?.data?.length ? (
        <FAQDisplay faqs={faqsData.data} variant="home" />
      ) : null}

      {/* Testimonials Section */}
      {testimonialsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin text-primary border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : testimonialsData?.data?.length ? (
        <TestimonialDisplay testimonials={testimonialsData.data} variant="home" />
      ) : null}

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
};

export default Franchise;
