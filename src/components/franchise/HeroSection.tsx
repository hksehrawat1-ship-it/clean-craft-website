import { useState } from "react";
import { Button } from "@/components/ui/button";
import FranchiseFormModal from "./FranchiseFormModal";

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRequestInfo = () => {
    setIsFormOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cleancraft-light via-white to-white pt-0 pb-0"
      aria-label="Top Laundry Franchise Opportunity in India"
    >
      <div className="container">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between py-5">
            {/* Left Content */}
            <div className="flex-1 lg:pr-12 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-orange-50 rounded-full text-orange-600 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                #No. 1 Laundry Franchise opportunity in India
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-6">
                Start Profitable
                <br />
                <span className="text-blue-600 font-normal">
                  Laundry and Dry
                </span>
                <br />
                <span className="text-blue-600 font-normal">Cleaning</span>{" "}
                Store with
                <br />
                <span className="font-medium">Clean Craft Guarantee</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Join CleanCraft's all India laundry and dry cleaning franchise
                business opportunity with 100% growth potential. Low investment,
                high returns, and full training support included.
              </p>

              {/* CTA Button (open modal) */}
              <div className="flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleRequestInfo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Apply for Franchise
                </Button>
              </div>

              {/* Industry Growth Message */}
              <div className="mt-12 text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Be a Part of the ₹7,000 Cr Fastest-Growing Industry!
                </h3>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 lg:pl-12 mt-12 lg:mt-0">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/lovable-uploads/8063ac1a-50bd-4822-8682-f789a3038092.png"
                    alt="Clean Craft Store"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl py-2 px-3 shadow-xl border border-gray-100 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Zero Risk Guarantees
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Get 9 guarantees from Clean Craft to get profitable with
                        security
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorations */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Franchise Modal */}
      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Get Your Franchise Information Package"
        sourceCta="Apply for Franchise"
      />
    </section>
  );
};

export default HeroSection;
