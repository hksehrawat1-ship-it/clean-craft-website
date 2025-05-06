import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-[48px] md:text-[48px] font-black leading-tight mb-4">
              <span className="text-blue-500">SPOTLESS PROFIT</span> <span className="text-grey-900">IN LAUNDRY</span>
            </h1>
            <p className="text-lg md:text-xl text-grey-900 font-bold mb-4">
              India's first complete guide on <span className="font-black">how to start laundry business in India</span>
            </p>
            <p className="text-[18px] text-grey-900 mb-8">
              Learn the exact <span className="text-blue-500 font-bold">laundry business plan India</span> experts use and discover <span className="font-bold">how much to invest in laundry business</span> for maximum returns. Perfect for entrepreneurs seeking <span className="font-bold">profitable business in India 2025</span>.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-black text-grey-900">₹479</h3>
              <div className="flex items-center">
                <span className="text-lg text-grey-400 line-through mr-2">₹799</span>
                <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                  40% OFF
                </span>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <p className="text-base text-grey-700 mr-3 font-medium">
                Also available on:
              </p>
              <div className="flex items-center space-x-3">
                {/* Amazon logo */}
                <div className="flex items-center justify-center bg-white p-1 rounded-md border border-grey-200 w-24 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-auto">
                    <path fill="#FF9900" d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
                  </svg>
                </div>
                
                {/* Flipkart logo */}
                <div className="flex items-center justify-center bg-white p-1 rounded-md border border-grey-200 w-24 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 230" className="h-4 w-auto">
                    <path fill="#2874f0" d="M127 0H0v230h38.5V32.8h53.6c21.4 0 35.7 12.8 35.7 30.5 0 16.2-13.4 31.2-35.7 31.2H48.8v34.4h40.7c33.7 0 76.6-18.1 76.6-65.8C166.1 21.1 137.5 0 127 0z"/>
                    <path fill="#2874f0" d="M715.7 25.8v-9.6h-25.9V162h28.9v-82c0-22.4 16.7-34 31.8-34 2.8 0 5 .4 5 .4v-28c-.4 0-3.1-.9-5.9-.9-14.3 0-28.9 10.6-33.9 25.3zM244.4 87.1c-7.8-5.6-18.7-8.3-34.6-9.7-13.7-1.3-16-2.8-16-7 0-4.7 4.5-6.9 13-6.9 14.8 0 27.8 5.3 39.2 13.4l13-20.1c-15.8-13-35.5-17-51.6-17-30.3 0-50 15.2-50 38.7 0 24.2 16.4 33.3 45.3 36.7 15.3 1.8 18.8 3.9 18.8 7.7 0 5-5.7 7.2-16.7 7.2-17 0-32.3-6-44-16.5l-14.7 19.9c14.9 13.8 37.8 21.3 59.5 21.3 30.5 0 52.4-13.4 52.4-40.1 0-21.7-12.4-32.4-29.5-40.6h-.1zM343.8 75.7c0-8.6 6.6-15 15.6-15 8.1 0 14.5 5.3 16.5 15h-32.1zm58.2 15.4c-.2-28.9-18.9-49.4-42.8-49.4-26 0-44.4 19.8-44.4 47v.5c0 28.5 19.4 47 46.6 47 18.1 0 32.1-7.7 40.1-22.1l-18.2-11.4c-4.2 7.3-11.9 12.2-21.1 12.2-12.4 0-21.1-7-22.6-20.8h62.3c.1-1 .1-1.9.1-3zM421.5 41.8h28.9v13.8c5.7-9.4 15.6-16.8 30.8-16.8 24.2 0 38.7 17 38.7 45.6V162h-28.9V90.8c0-16.5-7.7-25-20.8-25-13 0-20.8 8.5-20.8 25V162h-28.9V41.8zM568 162h28.9v-13.8c5.7 9.4 15.6 16.8 30.8 16.8 24.2 0 38.7-17 38.7-45.6V41.8h-28.9v71.2c0 16.5-7.7 25-20.8 25-13 0-20.8-8.5-20.8-25V41.8H568V162z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white text-base py-4 px-8 font-bold rounded-lg"
                onClick={() => document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Download className="mr-2 h-5 w-5" />
                DOWNLOAD NOW
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-200 rounded-lg blur"></div>
              <img 
                src="/lovable-uploads/b407647c-af87-49b9-8a60-06b9a0328332.png" 
                alt="Spotless Profit in Laundry eBook Cover - How to Start Laundry Business in India" 
                className="relative w-auto max-h-[500px] rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
