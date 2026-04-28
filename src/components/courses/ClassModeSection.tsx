import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Users } from "lucide-react";

const ClassModeSection = () => {
  return (
    <section className="py-10 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 tracking-[0.02em]">
            Learn Your Way — <span className="text-primary">Online or Offline</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the class mode that fits your schedule and location. Both options include the same expert training and certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Online */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-[0.02em]">
              Online Classes
            </h3>
            <p className="text-gray-600 mb-5 text-sm md:text-base flex-1">
              Join from anywhere in India. Live interactive sessions with our expert trainers, recorded videos & lifetime support.
            </p>
            <Button
              asChild
              className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white"
            >
              <a href="#registration-form">Know More</a>
            </Button>
          </div>

          {/* Offline */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-[#FF5A3C]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-[0.02em]">
              Offline Classes
            </h3>
            <p className="text-gray-600 mb-5 text-sm md:text-base flex-1">
              Hands-on training at our Delhi facility. Work directly with industrial machines, chemicals & real garments.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <a href="#registration-form">Know More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassModeSection;
