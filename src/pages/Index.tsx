
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
import PropTypes from 'prop-types';

interface IndexProps {
  pageContent?: {
    services?: any[];
    testimonials?: any[];
    [key: string]: any;
  };
}

const Index: React.FC<IndexProps> = ({ pageContent }) => {
  return (
    <Layout>
      <HeroSection />
      {/* Pass the services prop correctly to ServicesSection */}
      <ServicesSection services={pageContent?.services || []} />
      <BenefitsSection />
      <ProcessStepsSection />
      <YourFirstPickupEssentials />
      <LaundryServiceFeatures />
      <GuaranteeSection />
      <CustomerTestimonials testimonials={pageContent?.testimonials || []} />
      <FAQSection />
    </Layout>
  );
};

// Update propTypes definition for the component
Index.propTypes = {
  pageContent: PropTypes.shape({
    services: PropTypes.array,
    testimonials: PropTypes.array
  })
};

export default Index;
