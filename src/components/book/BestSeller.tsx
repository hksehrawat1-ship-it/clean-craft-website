import React from "react";
import { Award, Star } from "lucide-react";

const BestSeller = () => {
  return (
    <section className="md:py-6 py-4 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-blue-200 rounded-2xl shadow p-6 md:p-5 relative overflow-hidden">
            {/* Best Seller Badge */}
            <div className="flex justify-center mb-4">
              <div className="bg-[#1A73E8] text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-base font-bold shadow-sm">
                <Award className="h-5 w-5" />
                BEST SELLER
              </div>
            </div>
            {/* Heading */}
            <h2 className="text-[32px] md:text-[36px] font-black text-center mb-2 leading-[40px]">
              #1 in the{" "}
              <span className="text-[#1A73E8]">Laundry Business </span> Category
            </h2>

            {/* Stars */}
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-[#1A73E8] fill-[#1A73E8]"
                  />
                ))}
              </div>
            </div>
            {/* Supporting Text */}
            <p className="text-center text-lg md:text-xl text-grey-900 mb-6">
              Join thousands of satisfied entrepreneurs who have transformed
              their laundry business using the strategies in this book
            </p>
            {/* Stats */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg flex flex-col items-center py-4 px-6">
                <div className="text-[28px] font-black text-blue-500 leading-tight">
                  1200+
                </div>
                <div className="text-base text-grey-700 font-medium">
                  Copies Sold
                </div>
              </div>
              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg flex flex-col items-center py-4 px-6">
                <div className="text-[28px] font-black text-blue-500 leading-tight">
                  4.8/5
                </div>
                <div className="text-base text-grey-700 font-medium">
                  Average Rating
                </div>
              </div>
              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg flex flex-col items-center py-4 px-6">
                <div className="text-[28px] font-black text-blue-500 leading-tight">
                  95%
                </div>
                <div className="text-base text-grey-700 font-medium">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
