
import Layout from "@/components/home/Layout";
import HeroSection from "@/components/franchise/HeroSection";
import IdealCustomerSection from "@/components/franchise/IdealCustomerSection";
import ComparisonSection from "@/components/franchise/ComparisonSection";
import FeaturesSection from "@/components/franchise/FeaturesSection";
import GuaranteeSection from "@/components/franchise/GuaranteeSection";
import ProcessSection from "@/components/franchise/ProcessSection";
import TestimonialsSection from "@/components/franchise/TestimonialsSection";
import FaqSection from "@/components/franchise/FaqSection";
import CareSection from "@/components/franchise/CareSection";
import { EnhancedSEO } from "@/components/EnhancedSEO";

const Franchise = () => {
  return (
    <Layout showOfferCarousel={false}>
      <EnhancedSEO 
        slug="franchise"
        pageType="Organization"
        defaultTitle="Laundry Franchise Opportunity | Clean Craft"
        defaultDescription="Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available."
        customKeywords={['dry cleaning franchise', 'wet cleaning business opportunity', 'profitable laundry franchise']}
      />
      <main className="franchise-page">
        <HeroSection />
        <IdealCustomerSection />
        <ComparisonSection />
        <FeaturesSection />
        <GuaranteeSection />
        <ProcessSection />
        <TestimonialsSection />
        <CareSection />
        <FaqSection />
      </main>
    </Layout>
  );
};

export default Franchise;
