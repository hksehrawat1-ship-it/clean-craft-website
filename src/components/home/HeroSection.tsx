import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="py-24 px-6 md:px-12 lg:px-28 xl:px-32 w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">
          {/* Hero Content - Left Side */}
          <div className="flex flex-col justify-center items-start gap-6 lg:gap-8 w-full lg:w-1/2 animate-fade-in">
            <div className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium">#</div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Cleancraft
            </h1>
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight">
          </h2>
            
            <p className="text-lg font-medium text-gray-600">
              Learn how to start a profitable laundry business in India with our professional 5-day training program. Perfect for entrepreneurs in 2025.
            </p>
            
            {/* CTA Button */}
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg flex items-center gap-2 text-lg font-medium">
              Register with Rs. 500
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mt-8 w-full px-[2px] mx-[184px] my-[33px]">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  10k+
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Items Dry Cleaned
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  100+
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Kgs Laundry Processed
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  10k+
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Shirts Laundered
                </p>
              </div>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative z-10">
                <img src="/lovable-uploads/dd929e0a-3f86-4df5-afcd-769b2020cb6a.png" alt="Indian woman with folded clothes" className="w-full h-auto object-cover" />
                
                {/* Heart overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-red-500 opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="rgba(239, 68, 68, 0.15)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* Floating laundry icons */}
              
              
              
              
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;