
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Cta = () => {
  return (
    <section id="download-section" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Start Your Profitable Laundry Business <span className="text-laundry-gold">Today</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Complete Business Setup Guide</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Industry-Specific Financial Models</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Marketing Templates & Strategies</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Technical Know-how & Best Practices</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Operational Excellence Framework</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-laundry-gold flex items-center justify-center mt-1">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Customer Retention Strategies</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl font-bold text-black">₹999</h3>
              <div className="flex items-center">
                <span className="text-xl text-gray-500 line-through mr-2">₹1499</span>
                <span className="bg-laundry-gold text-black text-sm font-bold px-2 py-1 rounded">
                  33% OFF
                </span>
              </div>
            </div>
            
            <Button
              size="lg"
              className="bg-laundry-gold hover:bg-amber-500 text-black text-lg py-7 px-10"
            >
              <Download className="mr-2 h-5 w-5" />
              DOWNLOAD NOW
            </Button>
          </div>
          
          <div className="w-full lg:w-2/5">
            <div className="relative">
              <div className="absolute -inset-1 bg-laundry-gold/30 rounded-lg blur-md"></div>
              <img
                src="/lovable-uploads/b407647c-af87-49b9-8a60-06b9a0328332.png"
                alt="Spotless Profit in Laundry eBook Cover"
                className="relative max-h-[400px] mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
