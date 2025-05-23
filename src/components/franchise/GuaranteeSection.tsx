
import React from "react";
import { Check } from "lucide-react";

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clean Craft Partner <span className="text-primary">Guarantee</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to your success and stand behind our franchise system
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Money Back</h3>
              <p className="text-gray-600">
                100% refund of franchise fee if requirements not met in 30 days
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Revenue Guarantee</h3>
              <p className="text-gray-600">
                Minimum revenue guarantee for first 6 months
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Territory Protection</h3>
              <p className="text-gray-600">
                Exclusive rights within your operating area
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
