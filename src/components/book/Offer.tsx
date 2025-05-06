import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Offer = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl border-2 border-blue-500">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/10 p-4 rounded-full">
              <Gift className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            EXCLUSIVE <span className="text-blue-500">OFFER</span>
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-2xl mb-2">
              Learn <span className="font-semibold">How to Start Laundry Business in India</span> from <span className="font-bold">Himanshu Sir</span>
            </p>
            <p className="text-xl text-blue-500 font-bold mb-6">
              25% OFF on Premium Training Program
            </p>
            <p className="text-grey-900 max-w-2xl mx-auto mb-8">
              Master your <span className="font-semibold">laundry business plan India</span> with personalized guidance,
              strategy sessions on <span className="font-semibold">how to run laundry business successfully</span>, and insider knowledge on
              <span className="font-semibold"> laundry setup cost India</span> directly from India's top laundry business expert.
            </p>
            
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-500/90 text-white text-lg py-6 px-8"
            >
              KNOW MORE
            </Button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-grey-900">
              <span className="font-semibold">Limited time offer:</span> Only available for the first 50 bookings each month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
