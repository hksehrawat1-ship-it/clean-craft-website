
import React from "react";
import { Clock, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WhyBuyNowSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="bg-amber-50 p-2 rounded-full mr-3">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Buy Now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Don't Miss Market Opportunities */}
          <div className="bg-white rounded-lg p-8 border-l-4 border-blue-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold py-1 px-3">
              LIMITED TIME
            </div>
            <div className="flex items-start mb-6 mt-8">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Don't Miss Market Opportunities
              </h3>
            </div>
            <p className="text-gray-600">
              The laundry industry is consolidating fast, and early movers are
              locking in premium territories. Every month you delay, someone else
              takes a lead in your area.
            </p>
          </div>

          {/* Best Support Package Available Now */}
          <div className="bg-white rounded-lg p-8 border-l-4 border-red-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-3">
              THIS QUARTER ONLY
            </div>
            <div className="flex items-start mb-6 mt-8">
              <div className="bg-red-50 p-2 rounded-full mr-3">
                <Calendar className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Best Support Package Available Now
              </h3>
            </div>
            <p className="text-gray-600">
              The investment will never be this low again, and our most powerful
              support guarantees are for this quarter only. The longer you wait,
              the more you'll wonder "what if...".
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white font-medium text-lg px-10 py-6 h-auto rounded-md shadow-md"
            onClick={() => toast.success("Franchise consultation request submitted!")}
          >
            Schedule Your Franchise Consultation Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyNowSection;
