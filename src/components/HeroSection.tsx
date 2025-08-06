import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  // 🔁 Dynamic next 25th batch date with suffix (e.g., 25th July 2025)
  const getNextBatchDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const batchDate =
      today.getDate() < 25
        ? new Date(currentYear, currentMonth, 25)
        : new Date(currentYear, currentMonth + 1, 25);

    const day = batchDate.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const month = batchDate.toLocaleString("default", { month: "long" });
    const year = batchDate.getFullYear();

    return `${day}${suffix} ${month} ${year}`;
  };

  return (
    <section className="pt-16 pb-0 md:pt-24 md:pb-2">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium mb-4">
              #1 Laundry and Dry cleaning Training in India
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Laundry and Dry cleaning
              <span className="text-primary"> Certificate</span> training course
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-lg">
              Learn how to start a laundry business in India with our
              professional 5-day training program. Perfect for entrepreneurs
              seeking to open a profitable business in India 2025.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-lg text-gray-800 font-medium">
                Special Offer:
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xl md:text-2xl text-gray-500 line-through">
                  ₹20,000
                </span>
                <span className="text-2xl md:text-3xl text-primary font-bold">
                  ₹14,500
                </span>
                <span className="bg-[#1A73E8] text-white px-2 py-1 rounded text-sm">
                  27.5% OFF
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-base md:text-lg px-4 md:px-8 w-full sm:w-auto"
              >
                <a
                  href="https://cleancraft.mojo.page/best-laundry-training-institute-in-india"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register with ₹500
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-gray-500">Next Batch:</span>
              <span className="py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium">
                {getNextBatchDate()}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100/50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-50/50"></div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/lovable-uploads/CourseHero.webp"
                  alt="Clean Craft Laundry Training Facility"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-black">
                  <p className="text-xl font-bold text-white">
                    Hands-on Training
                  </p>
                  <p className="text-white">
                    Learn from industry experts in Delhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
