
import { Calendar, Clock, MapPin, Users, IndianRupee } from 'lucide-react';
import FileText from '@/components/FileText';

const CourseInfo = () => {
  return (
    <section id="course" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Details</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our comprehensive laundry training program
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Duration & Schedule</h3>
                <p className="text-gray-700">5 Days Intensive Training | One batch every month | 10:00 AM to 6:00 PM daily</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Location</h3>
                <p className="text-gray-700">Clean Craft Training Center | Delhi, India | Modern facilities with practical labs</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Fee Structure</h3>
                <p className="text-gray-700">₹500 registration fee | ₹14,500 balance on first day | All materials included</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Batch Size</h3>
                <p className="text-gray-700">Limited to 50 students per batch | Small groups for practical sessions | Personal attention</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Course Curriculum</h3>
                <p className="text-gray-700">38 Theoretical topics | 6 Hands-on practical sessions | Business setup guidance</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 inline-flex">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Language Requirement</h3>
                <p className="text-gray-700">Understanding of Hindi is mandatory | Training in Hindi | Materials in Hindi & English</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
