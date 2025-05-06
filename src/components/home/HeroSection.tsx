
import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-28 xl:px-32 w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">
          {/* Hero Content - Left Side */}
          <div className="flex flex-col justify-center items-start gap-6 lg:gap-8 w-full lg:w-1/2 animate-fade-in">
            <div className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium">
              #1 Laundry Business Training
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Cleancraft
            </h1>
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight">
              Master the art of laundry business
            </h2>
            
            <p className="text-lg font-medium text-gray-600">
              Learn how to start a profitable laundry business in India with our professional 5-day training program. Perfect for entrepreneurs in 2025.
            </p>
            
            {/* CTA Button */}
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg flex items-center gap-2 text-lg font-medium"
            >
              Register with Rs. 500
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mt-8 w-full">
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
                <img 
                  src="/lovable-uploads/dd929e0a-3f86-4df5-afcd-769b2020cb6a.png" 
                  alt="Indian woman with folded clothes" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Heart overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-full h-full text-red-500 opacity-20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                      fill="rgba(239, 68, 68, 0.15)" 
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Floating laundry icons */}
              <div className="absolute top-10 right-8 bg-blue-500 p-3 rounded-full shadow-lg z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v11.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8V6.2Z"/>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M14.5 7.5 12 10"/>
                </svg>
              </div>
              
              <div className="absolute top-32 -left-3 bg-white p-3 rounded-full shadow-md z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 8.5a3.5 3.5 0 0 1 7 0v5.5a3.5 3.5 0 0 1-7 0V8.5z"/>
                  <path d="M11 3v2"/>
                  <path d="M13 3v2"/>
                  <path d="M21 10l-1 1h-1"/>
                  <path d="M14 18a4 4 0 0 1-4 4"/>
                  <path d="M4 11.5a7 7 0 0 1 7-7"/>
                </svg>
              </div>
              
              <div className="absolute bottom-10 right-5 bg-white p-3 rounded-full shadow-md z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-4-4"/>
                  <path d="m6 15 4-4"/>
                  <path d="M12 11v10"/>
                  <path d="m16 19-4 4-4-4"/>
                  <path d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1 3.003 3.003 0 0 1-2 2.83V12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5.83A3.003 3.003 0 0 1 8 3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
