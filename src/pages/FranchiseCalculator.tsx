
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import LaundryRoiCalculator from "@/components/franchise/LaundryRoiCalculator";
import LaundryBusinessGuide from "@/components/franchise/LaundryBusinessGuide";
import LaundryBusinessCost from "@/components/franchise/LaundryBusinessCost";
import SuccessStrategies from "@/components/franchise/SuccessStrategies";
import FranchiseComparison from "@/components/franchise/FranchiseComparison";
import TestimonialsSection from "@/components/franchise/TestimonialsSection";

const FranchiseCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cleancraft-light/30 via-white to-white">
      <Helmet>
        <title>Laundry Franchise ROI Calculator | Top Franchise Opportunity in India 2025</title>
        <meta name="description" content="Explore the best franchise business in India with Clean Craft laundry. Calculate ROI, compare franchise vs own setup costs and discover profitable business opportunities in India for 2025." />
        <meta name="keywords" content="laundry franchise, franchise opportunity in India, franchise business, business opportunity in India, how to start a laundry business in India, laundry business cost in India, profitable business in India 2025, dry cleaning training course India" />
        <link rel="canonical" href="https://cleancraft.com/franchise-calculator" />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        <section className="container-custom py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="bg-cleancraft-gold text-white mb-4 hover:bg-cleancraft-darkgold px-4 py-1.5">
                Premium Franchise Opportunity in India
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-google-gray">
                Laundry Franchise <span className="text-google-blue">ROI Calculator</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Discover your potential return on investment with India's top laundry & dry cleaning franchise opportunity. Plan your successful franchise business journey with our detailed analysis.
              </p>
            </div>
            
            {/* ROI Calculator Component */}
            <LaundryRoiCalculator />
            
            {/* Business Guide Component */}
            <LaundryBusinessGuide />
            
            {/* Business Cost Component */}
            <LaundryBusinessCost />
            
            {/* Success Strategies Component */}
            <SuccessStrategies />
            
            {/* New Franchise Comparison Component */}
            <FranchiseComparison />
            
            {/* Testimonials Section */}
            <TestimonialsSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FranchiseCalculator;
