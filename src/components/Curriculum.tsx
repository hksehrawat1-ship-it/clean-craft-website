import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BriefcaseBusiness } from "lucide-react";

const Curriculum = () => {
  const theoreticalTopics = [
    "Introduction to Laundry Industry",
    "Fabric Types and Care",
    "Detergents and Chemicals",
    "Stain Removal Techniques",
    "Dry Cleaning Processes",
    "Equipment Operation",
    "Quality Control Standards",
    "Customer Service Excellence",
    "Business Management Basics",
  ];

  const practicalTopics = [
    "Machine Operation",
    "Stain Treatment Practical",
    "Fabric Sorting and Processing",
    "Ironing and Finishing",
    "Quality Assessment",
    "Store Management Simulation",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Curriculum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our carefully crafted course covers everything you need to know to
            become a laundry expert
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Theoretical Topics Card - Optimized for Desktop */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-[#1A73E8] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                38
              </span>
              Theoretical Topics
            </h3>
            <p className="text-gray-600 mb-6">
              Master the fundamentals with our comprehensive theoretical
              curriculum that covers all aspects of laundry operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {theoreticalTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg flex items-center shadow-sm hover:shadow transition-all"
                >
                  <div className="bg-[#1A73E8] w-6 h-6 rounded-full text-white flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
              <div className="bg-white p-3 rounded-lg flex items-center shadow-sm hover:shadow transition-all">
                <div className="bg-[#1A73E8] w-6 h-6 rounded-full text-white flex items-center justify-center mr-2 text-xs">
                  +
                </div>
                <span className="text-gray-700">
                  29 more specialized topics
                </span>
              </div>
            </div>
          </div>

          {/* Practical Sessions Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-[#1A73E8] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                6
              </span>
              Practical Sessions
            </h3>
            <p className="text-gray-600 mb-6">
              Get hands-on experience with real equipment and materials to
              develop practical skills needed for professional laundry services.
            </p>
            <div className="space-y-4">
              {practicalTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <h4 className="font-medium text-gray-800 flex items-center">
                    <span className="bg-[#1A73E8] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </span>
                    {topic}
                  </h4>
                  <p className="text-gray-600 mt-2 pl-8">
                    Hands-on training with professional equipment and expert
                    supervision.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Setup Module - Dialog trigger */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl text-center cursor-pointer hover:shadow-lg transition-all duration-300 border border-blue-200">
                <div className="flex items-center justify-center mb-3">
                  <BriefcaseBusiness className="h-10 w-10 text-[#1A73E8]" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Business Setup Module Included
                </h3>
                <p className="text-gray-700 mb-2">
                  Learn how to start your own profitable laundry business
                </p>
                <span className="inline-block px-4 py-2 bg-[#1A73E8] text-white rounded-full text-sm font-medium">
                  Click to learn more
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  Complete Business Setup Guide
                </DialogTitle>
              </DialogHeader>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg space-y-4 mt-4">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                    <h4 className="font-bold text-lg text-primary mb-2">
                      Location Selection
                    </h4>
                    <p className="text-gray-600">
                      Learn how to identify prime locations for your laundry
                      business, analyze competition, and estimate foot traffic
                      for maximum profitability.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                    <h4 className="font-bold text-lg text-primary mb-2">
                      Equipment Sourcing
                    </h4>
                    <p className="text-gray-600">
                      Get insider knowledge on sourcing quality equipment at
                      wholesale rates, with direct contacts to suppliers across
                      India.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                    <h4 className="font-bold text-lg text-primary mb-2">
                      Marketing Strategies
                    </h4>
                    <p className="text-gray-600">
                      Discover proven marketing techniques specifically designed
                      for laundry businesses to attract and retain customers.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                    <h4 className="font-bold text-lg text-primary mb-2">
                      Operational Best Practices
                    </h4>
                    <p className="text-gray-600">
                      Master the day-to-day operations with efficient workflows,
                      inventory management, and staff training protocols.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg mt-4">
                  <h4 className="font-bold text-center">
                    One-on-One Business Consultation Included
                  </h4>
                  <p className="text-center text-gray-700 mt-2">
                    After completing the training, you'll receive personalized
                    guidance to launch your business successfully.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
