
import React from "react";
import { Shield, Check } from "lucide-react";

const WhyBuyFromUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="bg-green-50 p-2 rounded-full mr-3">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Buy From Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Built For Your Success */}
          <div className="bg-[#FEFDF5] rounded-lg p-8">
            <div className="flex items-start mb-5">
              <div className="bg-white border-2 border-green-100 rounded-full p-2 mr-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Built For Your Success
              </h3>
            </div>
            <p className="text-gray-600">
              We've built Clean Craft to make you win – not just us. 100+
              franchise owners have already joined, and over 94% break even
              within 7 months.
            </p>
          </div>

          {/* Real Guarantees in Legal Documents */}
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-start mb-6">
              <div className="bg-blue-50 rounded-full p-2 mr-3">
                <Check className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Real Guarantees in Legal Documents
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  1000 customers in your first year – or we fund your next 6
                  months of marketing
                </p>
              </div>

              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Store not ready in 30 days? We pay your rent
                </p>
              </div>

              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Don't break even? Get 100% royalty-free for life
                </p>
              </div>
            </div>
          </div>

          {/* Everything You Need to Succeed */}
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-start mb-6">
              <div className="bg-red-50 rounded-full p-2 mr-3">
                <Check className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Everything You Need to Succeed
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Complete store setup done for you</p>
              </div>

              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Training that reveals every secret we've learned
                </p>
              </div>

              <div className="flex items-start">
                <Check className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Tech and branding designed to convert footfall into loyalty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyFromUsSection;
