import React from 'react';
import { Star, StarHalf, ArrowRight } from "lucide-react";
const HeroSection = () => {
  return <section className="flex flex-col items-center py-24 px-6 md:px-12 lg:px-28 xl:px-32 w-full">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-start gap-8 lg:gap-10 w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-product-sans-black text-[#1869D3] leading-tight text-center">
              DRY CLEANING
            </h1>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#0E0E0E] leading-snug">
              at your fingertips
            </h2>
            <p className="text-base font-product-sans-light text-[#212121] capitalize">
              "30-MINUTE PICKUP, SAME-DAY CLEAN & DELIVERY!"
            </p>
            
            {/* CTA Button */}
            <div className="bg-[#E8F1FD] border border-[#488FED] rounded-full flex items-center justify-between p-1 pl-6 w-full max-w-[320px] shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#0E0E0E]">Pickup</span>
                  <span className="text-xs text-[#999999]">Tomorrow</span>
                </div>
                <div className="w-px h-8 bg-[#E9E9E9] mx-2"></div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#0E0E0E]">Where</span>
                  <span className="text-xs text-[#999999]">Add address</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#1355A3] flex items-center justify-center text-white">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                <Star className="w-5 h-5 text-[#FFB400]" />
                <Star className="w-5 h-5 text-[#FFB400]" />
                <Star className="w-5 h-5 text-[#FFB400]" />
                <Star className="w-5 h-5 text-[#FFB400]" />
                <StarHalf className="w-5 h-5 text-[#FFB400]" />
              </div>
              <span className="text-[#171717] text-base">4.8/5 G2 Rating</span>
            </div>
          </div>
          
          {/* Phone Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src="/lovable-uploads/7d652b3e-f996-4aa4-978d-e311436d329f.png" alt="Dry Cleaning App" className="w-full max-w-[350px] h-auto" />
          </div>
        </div>
        
        {/* Stats Section - Modified to stay horizontal on all screens */}
        <div className="flex flex-row justify-center items-center gap-6 md:gap-20 lg:gap-32 py-12 mt-8 overflow-x-auto w-full">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5294FF] to-[#003E8F] bg-clip-text text-transparent">
                10k+
              </h3>
              <p className="text-sm md:text-base font-medium text-[#0E0E0E]">
                Items Dry Cleaned
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5395FF] to-[#003E8F] bg-clip-text text-transparent">
                100+
              </h3>
              <p className="text-sm md:text-base font-medium text-[#0E0E0E]">
                Kgs Laundry Processed
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5294FF] to-[#003E8F] bg-clip-text text-transparent">
                10k+
              </h3>
              <p className="text-sm md:text-base font-medium text-[#0E0E0E]">
                Shirts Laundered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;