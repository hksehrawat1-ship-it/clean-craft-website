
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ROICalculator from "./ROICalculator";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#fffdf5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-8">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
                Premium Laundry Franchise Opportunity
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Own a <span className="text-blue-500">Thriving</span>{" "}
                <span className="text-blue-500">Laundry</span>
                <br />
                <span className="text-green-600">&amp; Dry Cleaning</span>
                <br />
                <span className="text-gray-900">Franchise</span>
              </h1>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-blue-600 font-bold">Zero Risk Promise:</h3>
                  <p className="text-gray-700">
                    Assured Break Even in 7 Months or Get 100% Royalty Free for
                    Life Time
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-600 font-bold">
                    India's Best Laundry Franchise:
                  </h3>
                  <p className="text-gray-700">
                    Revolutionary Laundry Business Solutions With Global
                    Recognition
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-800">
              Partner with India's Most Trusted Laundry Industry Leader –
              Recognized and Respected Internationally.
            </p>

            <div className="space-y-6">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                Request Information
              </Button>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  <span className="text-lg font-bold">9.5/10</span>
                  <span className="text-yellow-500 ml-1">★</span>
                </div>
                <span className="text-gray-600 text-sm">
                  <span className="font-semibold">99%</span> of happy store
                  owners recommend us
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <ROICalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
