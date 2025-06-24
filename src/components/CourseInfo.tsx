import { Calendar, Clock, MapPin, Users, IndianRupee } from "lucide-react";
import FileText from "@/components/FileText";

const CourseInfo = () => {
  return (
    <section id="course" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Course Details
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The best course to open a laundry business with comprehensive
            training on dry cleaning techniques and business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Schedule</h3>
                <p className="text-gray-700">
                  5 Days Intensive Training | 10:00 AM to 6:00 PM daily.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Location</h3>
                <p className="text-gray-700">
                  Clean Craft Training Center | Delhi, India.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Investment</h3>
                <p className="text-gray-700">
                  Learn the laundry business cost in India & setup strategies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Limited Spots</h3>
                <p className="text-gray-700">
                  50 students per batch | Small groups for hands-on training.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Comprehensive</h3>
                <p className="text-gray-700">
                  Covers everything on how to run a successful laundry business.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#1A73E8]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1A73E8] rounded-full p-3 inline-flex">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Online Access</h3>
                <p className="text-gray-700">
                  Online laundry business course India resources included.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-3 text-[#1A73E8]">
              Why Choose Our Dry Cleaning Training Course India?
            </h3>
            <p className="text-gray-700">
              We'll compare laundry franchise vs own setup options, explore
              diverse laundry business ideas in India, and provide dry cleaning
              business training online resources to complement the in-person
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
