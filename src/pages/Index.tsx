import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";
import Layout from "../components/home/Layout";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import ProcessStepsSection from "../components/home/ProcessStepsSection";
import YourFirstPickupEssentials from "../components/home/YourFirstPickupEssentials";
import LaundryServiceFeatures from "../components/home/LaundryServiceFeatures";
import GuaranteeSection from "../components/home/GuaranteeSection";
import FaqSection from "../components/home/FAQSection";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { cn } from "@/lib/utils";
import { useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";
import TestimonialSection from "@/components/home/TestimonialSection";
import Offers from "@/components/home/Offers";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  noPadding,
}) => {
  return (
    <section
      className={cn("w-full", !noPadding && "py-16 md:py-24", className)}
    >
      {children}
    </section>
  );
};

export default function Index() {
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;

  // Get country name from config
  const countryData = currentCountry ? getCountryByCode(currentCountry) : null;
  const countryName = countryData?.name || "";

  // Fetch FAQs and testimonials for home page with error handling
  const {
    data: faqs,
    isLoading: faqsLoading,
    error: faqsError,
  } = useStrapiFAQs({
    category: "home",
    sortBy: "order",
    sortOrder: "asc",
  });

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useStrapiTestimonials({
    category: "home",
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Log errors for debugging
  if (faqsError) {
    console.error("FAQs fetch error:", faqsError);
  }
  if (testimonialsError) {
    console.error("Testimonials fetch error:", testimonialsError);
  }

  // Check if we have testimonials to display
  const hasTestimonials =
    testimonials?.data?.length && testimonials?.data?.length > 0;

  return (
    <>
      <EnhancedSEO
        slug="/"
        pageType="LocalBusiness"
        defaultTitle={`CleanCraft - Professional Dry Cleaning and Laundry Services${
          countryName ? ` in ${countryName}` : ""
        }`}
        defaultDescription={`Experience premium dry cleaning and laundry services with CleanCraft${
          countryName ? ` in ${countryName}` : ""
        }. Professional cleaning, expert care, and convenient solutions for all your laundry and dry cleaning needs.`}
        customKeywords={[
          "professional laundry services",
          "dry cleaning near me",
          "wet cleaning solutions",
        ]}
      />

      <Layout>
        <div className="flex flex-col w-full">
          {/*offer section doesn't need standard padding */}
          <Offers />
          {/* Hero section doesn't need standard padding */}
          <SectionWrapper noPadding>
            <HeroSection />
          </SectionWrapper>

          {/* Services section with blue background */}
          <SectionWrapper className="bg-[#1E3A8A]">
            <ServicesSection />
          </SectionWrapper>

          {/* Process steps with light blue background */}
          <SectionWrapper className="bg-[#E8F1FD]">
            <ProcessStepsSection />
          </SectionWrapper>

          {/* First pickup essentials */}
          <SectionWrapper className="bg-white">
            <YourFirstPickupEssentials />
          </SectionWrapper>

          {/* Features with alternating background */}
          <SectionWrapper className="bg-[#F8FAFC]">
            <LaundryServiceFeatures />
          </SectionWrapper>

          {/* Guarantee section */}
          <SectionWrapper className="bg-white">
            <GuaranteeSection />
          </SectionWrapper>

          {/* Testimonials with light background */}
          <SectionWrapper className="bg-[#F8FAFC]">
            {!testimonialsLoading && hasTestimonials && testimonials && (
              <TestimonialSection testimonials={testimonials.data} />
            )}
          </SectionWrapper>

          {/* FAQ section */}
          <SectionWrapper className="bg-white">
            {!faqsLoading && faqs?.data?.length && faqs?.data?.length > 0 && (
              <FaqSection faqs={faqs} />
            )}
          </SectionWrapper>
        </div>
      </Layout>
    </>
  );
}
