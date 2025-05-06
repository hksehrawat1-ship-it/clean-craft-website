
import React from 'react';
import { Star, StarHalf, ArrowRight, Heart } from "lucide-react";

const HeroSection = () => {
  return <section className="flex flex-col items-center py-24 px-6 md:px-12 lg:px-28 xl:px-32 w-full bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-start gap-6 lg:gap-8 w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-[#002554] leading-tight">
              Cleancraft
            </h1>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#002554] leading-tight">
              Where all your laundry needs are met
            </h2>
            <p className="text-lg font-medium text-[#212121]">
              "Learn how to start a laundry business in India with our professional 5-day training program. Perfect for entrepreneurs seeking to open a profitable business in India 2025."
            </p>
            
            {/* CTA Button */}
            <div className="bg-[#1A73E8] text-white rounded-full flex items-center justify-center p-4 px-10 w-full max-w-[320px] shadow-md hover:bg-[#1355A3] transition-all cursor-pointer">
              <span className="text-xl font-medium">Register with Rs. 500</span>
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
              <span className="text-[#171717] text-base">4.8/5 Rating</span>
            </div>
          </div>
          
          {/* Image with Heart */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/dd929e0a-3f86-4df5-afcd-769b2020cb6a.png" 
                alt="Indian woman with folded clothes" 
                className="w-full max-w-[500px] h-auto rounded-full bg-white"
              />
              
              {/* Heart around the image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart 
                  className="w-full h-full text-red-500 opacity-20 scale-125" 
                  fill="rgba(239, 68, 68, 0.15)"
                />
              </div>
              
              {/* Floating laundry icons */}
              <div className="absolute top-10 right-10 bg-blue-500 p-3 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v11.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8V6.2Z"/>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M14.5 7.5 12 10"/>
                </svg>
              </div>
              
              <div className="absolute top-60 right-0 bg-blue-100 p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1 3.003 3.003 0 0 1-2 2.83V12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5.83A3.003 3.003 0 0 1 8 3z"/>
                  <path d="m18 15-4-4"/>
                  <path d="m6 15 4-4"/>
                  <path d="M12 11v10"/>
                  <path d="m16 19-4 4-4-4"/>
                </svg>
              </div>
              
              <div className="absolute top-20 left-0 bg-blue-100 p-3 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 8.5a3.5 3.5 0 0 1 7 0v5.5a3.5 3.5 0 0 1-7 0V8.5z"/>
                  <path d="M11 3v2"/>
                  <path d="M13 3v2"/>
                  <path d="M21 10l-1 1h-1"/>
                  <path d="M14 18a4 4 0 0 1-4 4"/>
                  <path d="M4 11.5a7 7 0 0 1 7-7"/>
                </svg>
              </div>
            </div>
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
