
import React from 'react';
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const OfferCarousel = () => {
  return (
    <section className="w-full bg-[#E8F1FD] py-6">
      <div className="container mx-auto flex flex-row justify-center items-center px-4 md:px-28 lg:px-30 gap-6">
        <div className="text-center md:text-left">
          <p className="text-[#0E0E0E] text-base md:text-lg font-normal leading-tight">
            Schedule your first order & get a 100 Rs. 
            <span className="text-blue-500 font-semibold">credit instantly</span>.
            <span className="block text-sm text-gray-600 mt-1">
              No strings attached. Click button to see services.
            </span>
          </p>
        </div>
        
        <Button 
          className="bg-[#1A73E8] hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2"
        >
          <Gift className="h-6 w-6" />
          <span className="font-bold text-base">Claim Your $50</span>
        </Button>
      </div>
    </section>
  );
};

export default OfferCarousel;
