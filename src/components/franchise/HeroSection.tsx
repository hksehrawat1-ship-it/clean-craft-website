import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star, Award } from "lucide-react";
import LaundryRoiCalculator from "./LaundryRoiCalculator";
import { useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRequestInfo = () => {
    setIsFormOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cleancraft-light via-white to-white pt-32 pb-20"
      aria-label="Top Laundry Franchise Opportunity in India"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 franchise-fade-in">
            <Badge
              variant="outline"
              className="bg-cleancraft-light text-cleancraft-darkgold px-6 py-2 text-base font-medium"
            >
              Premium Laundry Franchise Opportunity
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Own a Thriving{" "}
              <span className="gradient-text">Laundry &amp; Dry Cleaning</span>{" "}
              Franchise
            </h1>

            <div className="franchise-card hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className="franchise-icon-container franchise-icon-green">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-google-blue mb-2">
                    Zero Risk Promise:
                  </h3>
                  <p className="text-gray-700">
                    Assured Break Even in 7 Months or Get 100% Royalty Free for
                    Life Time
                  </p>
                </div>
              </div>
            </div>

            <div className="franchise-card hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className="franchise-icon-container franchise-icon-blue">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-google-blue mb-2">
                    India's Best Laundry Franchise:
                  </h3>
                  <p className="text-gray-700">
                    Revolutionary Laundry Business Solutions With Global
                    Recognition
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Partner with India's Most Trusted Laundry Industry Leader –
              Recognized and Respected Internationally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                onClick={handleRequestInfo}
                className="bg-google-blue hover:bg-google-blue/90 text-white font-medium text-base"
              >
                Request Information
              </Button>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <div className="rating-badge">
                <Star className="h-5 w-5 mr-1.5 fill-white" />
                <span className="font-semibold">9.5/10</span>
              </div>
              <p className="text-base md:text-lg text-gray-600">
                <span className="font-semibold">99% of happy store owners</span>{" "}
                recommend us
              </p>
            </div>
          </div>

          <div
            className="relative franchise-fade-in hidden md:block"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cleancraft-light/40 to-cleancraft-light/20 rounded-2xl"></div>
            <div className="relative h-full flex items-center justify-center p-8">
              <LaundryRoiCalculator />
            </div>
          </div>

          {/* Mobile version of calculator - shows below content */}
          <div
            className="md:hidden franchise-fade-in mt-6"
            style={{ animationDelay: "0.3s" }}
          >
            <LaundryRoiCalculator />
          </div>
        </div>
      </div>

      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Get Your Franchise Information Package"
        sourceCta="Request Information"
      />

      {/* Background elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-cleancraft-light rounded-full opacity-40 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cleancraft-light rounded-full opacity-30 blur-3xl -z-10"></div>
    </section>
  );
};

export default HeroSection;
