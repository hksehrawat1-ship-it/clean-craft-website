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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <ProcessStepsSection />
      <YourFirstPickupEssentials />
      <LaundryServiceFeatures />
      <GuaranteeSection />
      <CustomerTestimonials />
      <FAQSection />
    </Layout>
  );
};

export default Index;
