import { Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrainerSection = () => {
  return (
    <section id="trainer" className="md:py-10 py-2 bg-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your Trainer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from India's leading expert in laundry and dry cleaning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/lovable-uploads/himanshusir.jpg"
              alt="Mr. Himanshu Sehrawat"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Mr. Himanshu Sehrawat
            </h3>
            <p className="text-xl text-[#1A73E8] font-medium">
              Founder, Clean Craft Institute of Laundry and Dry Cleaning
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#1A73E8] rounded-full p-2 inline-flex mt-1">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-700">
                  Founded the first and only professional institute of laundry
                  in India, dedicated to training entrepreneurs for success in
                  the laundry business.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#1A73E8] rounded-full p-2 inline-flex mt-1">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-700">
                  Author of India's first book on laundry and dry cleaning -{" "}
                  <span className="font-semibold">
                    "Spotless Profit in Laundry"
                  </span>
                  , a comprehensive guide for laundry entrepreneurs.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#1A73E8] rounded-full p-2 inline-flex mt-1">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-700">
                  Mentored over 1000+ students across India and abroad who are
                  now running profitable laundry businesses.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://cleancraft.mojo.page/best-laundry-training-institute-in-india"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#1A73E8] text-white"
                  style={{
                    backgroundColor: "#1A73E8",
                    padding: "0 27px",
                    borderRadius: "11px",
                  }}
                >
                  Learn From The Expert
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerSection;
