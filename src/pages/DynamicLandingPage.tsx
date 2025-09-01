import { useParams } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import Layout from "../components/home/Layout";
import DynamicHeroSection from "../components/landing/DynamicHeroSection";
import WhyChooseUsSection from "../components/landing/WhyChooseUsSection";
import DynamicServicesSection from "../components/landing/DynamicServicesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import DynamicTestimonialsSection from "../components/landing/DynamicTestimonialsSection";
import DynamicFAQSection from "../components/landing/DynamicFAQSection";
import FinalCTASection from "../components/landing/FinalCTASection";
import { useStrapiServices, useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";

interface DynamicLandingPageProps {
  city?: string;
  service?: string;
}

export default function DynamicLandingPage() {
  const { city, service } = useParams<{ city?: string; service?: string }>();
  const { currentCountry } = useCountry();

  // Fetch dynamic content
  const { data: services, isLoading: servicesLoading } = useStrapiServices();
  const { data: faqs, isLoading: faqsLoading } = useStrapiFAQs({
    category: "home",
    sortBy: "order",
    sortOrder: "asc",
  });
  const { data: testimonials, isLoading: testimonialsLoading } = useStrapiTestimonials({
    category: "home",
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Format city and service names for display
  const displayCity = city ? city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ') : '';
  const displayService = service ? service.charAt(0).toUpperCase() + service.slice(1).replace(/-/g, ' ') : '';

  // Generate SEO content
  const generateSEOTitle = () => {
    const baseTitle = "CleanCraft - Professional Laundry & Dry Cleaning Services";
    if (displayCity && displayService) {
      return `${displayService} in ${displayCity} | ${baseTitle}`;
    } else if (displayCity) {
      return `Laundry Services in ${displayCity} | ${baseTitle}`;
    } else if (displayService) {
      return `${displayService} Services | ${baseTitle}`;
    }
    return baseTitle;
  };

  const generateSEODescription = () => {
    const baseDesc = "Professional laundry and dry cleaning services with expert care, convenient pickup & delivery.";
    if (displayCity && displayService) {
      return `Get premium ${displayService.toLowerCase()} services in ${displayCity}. ${baseDesc} Book your service today!`;
    } else if (displayCity) {
      return `Premium laundry services in ${displayCity}. ${baseDesc} Serving your neighborhood with quality and care.`;
    } else if (displayService) {
      return `Professional ${displayService.toLowerCase()} services. ${baseDesc} Quality cleaning you can trust.`;
    }
    return baseDesc;
  };

  const generateKeywords = () => {
    const baseKeywords = ["professional laundry services", "dry cleaning", "expert care"];
    if (displayCity) {
      baseKeywords.push(`laundry services ${displayCity.toLowerCase()}`, `dry cleaning ${displayCity.toLowerCase()}`);
    }
    if (displayService) {
      baseKeywords.push(`${displayService.toLowerCase()} services`, `professional ${displayService.toLowerCase()}`);
    }
    return baseKeywords;
  };

  return (
    <>
      <EnhancedSEO
        slug={`${city ? `/${city}` : ''}${service ? `/${service}` : ''}`}
        pageType="LocalBusiness"
        defaultTitle={generateSEOTitle()}
        defaultDescription={generateSEODescription()}
        customKeywords={generateKeywords()}
      />

      <Layout>
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <section className="relative">
            <DynamicHeroSection city={displayCity} service={displayService} />
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
            <WhyChooseUsSection />
          </section>

          {/* Services Section */}
          <section className="py-16 md:py-24 bg-white">
            <DynamicServicesSection 
              services={services} 
              isLoading={servicesLoading}
              city={displayCity}
              featuredService={displayService}
            />
          </section>

          {/* How It Works Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
            <HowItWorksSection city={displayCity} />
          </section>

          {/* Testimonials Section */}
          <section className="py-16 md:py-24 bg-white">
            <DynamicTestimonialsSection 
              testimonials={testimonials} 
              isLoading={testimonialsLoading}
              city={displayCity}
            />
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
            <DynamicFAQSection 
              faqs={faqs} 
              isLoading={faqsLoading}
              city={displayCity}
              service={displayService}
            />
          </section>

          {/* Final CTA Section */}
          <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
            <FinalCTASection city={displayCity} service={displayService} />
          </section>
        </div>
      </Layout>
    </>
  );
}