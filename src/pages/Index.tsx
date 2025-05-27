import React from "react";
import { useParams } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import Layout from "../components/home/Layout";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import BenefitsSection from "../components/home/BenefitsSection";
import ProcessStepsSection from "../components/home/ProcessStepsSection";
import YourFirstPickupEssentials from "../components/home/YourFirstPickupEssentials";
import LaundryServiceFeatures from "../components/home/LaundryServiceFeatures";
import CustomerTestimonials from "../components/home/CustomerTestimonials";
import GuaranteeSection from "../components/home/GuaranteeSection";
import FaqSection from "../components/home/FAQSection";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import {
  useStrapiPage,
  useStrapiFAQs,
  useStrapiTestimonials,
} from "@/hooks/useStrapi";
import TestimonialSection from "@/components/home/TestimonialSection";
import { StrapiFAQ, StrapiTestimonial } from "@/types/strapi";

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

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
  const { countryCode } = useParams<{ countryCode: string }>();
  const { currentCountry, setCurrentCountry } = useCountry();
  const { data: pageData } = useStrapiPage("/");

  // Fetch FAQs and testimonials for home page
  const { data: faqs, isLoading: faqsLoading } = useStrapiFAQs({
    category: "home",
    sortBy: "order",
    sortOrder: "asc",
  });

  const { data: testimonials, isLoading: testimonialsLoading } =
    useStrapiTestimonials({
      category: "home",
      sortBy: "rating",
      sortOrder: "desc",
    });

  // Check if we have testimonials to display
  const hasTestimonials = testimonials?.data?.length > 0;

  return (
    <>
      <SEO
        slug="home"
        defaultTitle={`CleanCraft - Professional Laundry Services${
          currentCountry ? ` in ${currentCountry.name}` : ""
        }`}
        defaultDescription={`Experience premium laundry services with CleanCraft${
          currentCountry ? ` in ${currentCountry.name}` : ""
        }. Professional cleaning, expert care, and convenient solutions for all your laundry needs.`}
      />

      <Layout>
        <div className="flex flex-col w-full">
          {/* Hero section doesn't need standard padding */}
          <SectionWrapper noPadding>
            <HeroSection />
          </SectionWrapper>

          {/* Services section with blue background */}
          <SectionWrapper className="bg-[#1E3A8A]">
            <ServicesSection />
          </SectionWrapper>

          {/* Benefits section */}
          {/* <SectionWrapper className="bg-white">
            <BenefitsSection />
          </SectionWrapper> */}

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
            {!faqsLoading && faqs?.data?.length > 0 && (
              <FaqSection faqs={faqs} />
            )}
          </SectionWrapper>
        </div>
      </Layout>
    </>
  );
}
