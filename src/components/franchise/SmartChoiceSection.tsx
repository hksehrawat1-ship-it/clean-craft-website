
import React from "react";
import { Trophy, ShirtIcon, BarChart2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const SmartChoiceSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            Our Value Proposition
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Smart Choice For Your Franchise Investment
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make an informed decision with our industry-leading guarantees and
            exceptional profit potential
          </p>
        </div>

        <div className="mt-16 text-center mb-12">
          <div className="inline-flex items-center justify-center bg-blue-50 rounded-full p-3 mb-2">
            <Trophy className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Why Buy This?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Always In Demand */}
          <div className="relative p-8 border-l-4 border-blue-400 rounded-r-lg bg-white shadow-sm">
            <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
              <ShirtIcon className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4 mt-2">Always In Demand</h4>
            <p className="text-gray-600">
              Unlike food or fashion, laundry is a non-optional, weekly need –
              everyone wears clothes and needs them cleaned. You're solving a
              daily life problem, not chasing trends.
            </p>
          </div>

          {/* High Profit Margins */}
          <div className="relative p-8 border-l-4 border-green-400 rounded-r-lg bg-white shadow-sm">
            <div className="absolute -left-4 top-8 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4 mt-2">High Profit Margins</h4>
            <p className="text-gray-600">
              With 60%+ profit margins, low manpower, and zero dependency on
              seasons, this is one of the safest, steadiest and smartest
              franchises you can start in India today.
            </p>
          </div>

          {/* No Technical Background Needed */}
          <div className="relative p-8 border-l-4 border-red-400 rounded-r-lg bg-white shadow-sm">
            <div className="absolute -left-4 top-8 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4 mt-2">
              No Technical Background Needed
            </h4>
            <p className="text-gray-600">
              No perishables, no cooking licenses, no wastage. Just pure service
              + system + scale. If you can manage a small team and follow simple
              systems, this business will work for you.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
            Request Franchise Information
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SmartChoiceSection;
