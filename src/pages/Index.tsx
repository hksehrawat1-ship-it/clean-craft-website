
import React from 'react';
import Layout from '../components/home/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import BenefitsSection from '../components/home/BenefitsSection';
import ProcessStepsSection from '../components/home/ProcessStepsSection';
import YourFirstPickupEssentials from '../components/home/YourFirstPickupEssentials';
import LaundryServiceFeatures from '../components/home/LaundryServiceFeatures';
import CustomerTestimonials from '../components/home/CustomerTestimonials';
import GuaranteeSection from '../components/home/GuaranteeSection';
import FAQSection from '../components/home/FAQSection';

interface IndexProps {
  pageContent?: any;
}

const Index: React.FC<IndexProps> = ({ pageContent }) => {
  // We can use pageContent to customize the page based on the country
  // For now, we'll just render the standard components
  return (
    <Layout>
      <HeroSection content={pageContent?.sections} />
      <ServicesSection services={pageContent?.services} />
      <BenefitsSection content={pageContent?.sections} />
      <ProcessStepsSection content={pageContent?.sections} />
      <YourFirstPickupEssentials content={pageContent?.sections} />
      <LaundryServiceFeatures content={pageContent?.sections} />
      <GuaranteeSection content={pageContent?.sections} />
      <CustomerTestimonials testimonials={pageContent?.testimonials} />
      <FAQSection content={pageContent?.sections} />
    </Layout>
  );
};

export default Index;
