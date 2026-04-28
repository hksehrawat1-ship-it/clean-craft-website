import React from "react";
import { Button } from "@/components/ui/button";

const ClassModeSection = () => {
  return (
    <section className="py-10 md:py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 tracking-[0.02em]">
          Learn Your Way — <span className="text-primary">Online or Offline</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
          Choose the class mode that fits your schedule and location. Both options include the same expert training and certification.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <a href="#registration-form">Know More About Courses</a>
        </Button>
      </div>
    </section>
  );
};

export default ClassModeSection;
