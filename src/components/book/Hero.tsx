import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-blue-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
              <span className="text-[#1A73E8]">SPOTLESS PROFIT</span>{" "}
              <span className="text-gray-900">IN LAUNDRY</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-900 font-bold mb-4">
              India's first complete guide on{" "}
              <span className="font-black">
                how to start a laundry business in India
              </span>
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Learn the exact{" "}
              <span className="text-[#1A73E8] font-bold">
                laundry business plan India
              </span>{" "}
              experts use and discover{" "}
              <span className="font-bold">
                how much to invest in laundry business
              </span>{" "}
              for maximum returns. Perfect for entrepreneurs seeking{" "}
              <span className="font-bold">
                profitable businesses in India by 2025
              </span>
              .
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <h3 className="text-2xl font-black text-gray-900">₹479</h3>
              <div className="flex items-center">
                <span className="text-lg text-gray-400 line-through mr-2">
                  ₹799
                </span>
                <span className="bg-[#1A73E8] text-white text-sm font-bold px-2 py-1 rounded">
                  40% OFF
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start mb-6">
              <p className="text-base text-gray-700 mr-3 font-medium">
                Also available on:
              </p>
              <div className="flex items-center space-x-3">
                {/* Amazon logo */}
                <div className="flex items-center justify-center bg-white p-1 rounded-md border border-gray-200 w-24 h-8">
                  <a
                    href="https://www.amazon.in/Spotless-Profit-Laundry-Guide-Cleaning/dp/B0DDXCYRJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-7 w-auto"
                    >
                      <path
                        fill="#FF9900"
                        d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"
                      />
                    </svg>
                  </a>
                </div>

                {/* Flipkart logo */}
                <div className="flex items-center justify-center bg-white p-1 rounded-md border border-gray-200 w-24 h-8">
                  <a
                    href="https://www.flipkart.com/spotless-profit-laundry-guide-dry-cleaning/p/itm5c4b077a534d4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png"
                      alt="Flipkart"
                      // className="h-6 w-auto mx-auto"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-base py-4 px-8 font-bold rounded-lg flex items-center justify-center"
                onClick={() =>
                  document
                    .getElementById("download-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Download className="mr-2 h-5 w-5" />
                <a
                  href="https://cleancraft.mojo.page/online-laundry-training-in-india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  DOWNLOAD NOW
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur"></div>
              <img
                src="/lovable-uploads/HimanshuSir.webp"
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
