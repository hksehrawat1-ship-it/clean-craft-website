
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our network of successful franchise owners today and build a
          profitable business with our support.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Download Brochure
          </Button>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
