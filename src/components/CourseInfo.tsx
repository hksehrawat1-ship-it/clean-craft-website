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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course Info Cards */}
          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Duration & Schedule</h3>
            <p className="text-gray-600 mb-4">5 Days Intensive Training</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Training dates: One batch every month
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                10:00 AM to 6:00 PM daily
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Includes lunch and tea breaks
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600 mb-4">Delhi, India</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Clean Craft Training Center
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Central location with easy access
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Modern facilities with practical labs
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <IndianRupee className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fee Structure</h3>
            <p className="text-gray-600 mb-4">Affordable Investment</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                ₹500 for registration (now)
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Remaining amount on first day
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Includes all materials and equipment
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Batch Size</h3>
            <p className="text-gray-600 mb-4">Limited Seats Available</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Maximum 50 students per batch
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Small groups for practical sessions
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Personal attention from trainers
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Course Curriculum</h3>
            <p className="text-gray-600 mb-4">Comprehensive Coverage</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                38 Theoretical topics
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                6 Hands-on practical sessions
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Business setup guidance included
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-primary rounded-full p-3 inline-flex mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Language Requirement</h3>
            <p className="text-gray-600 mb-4">Important Information</p>
            <ul className="text-left w-full space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Understanding of Hindi is mandatory
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Training conducted primarily in Hindi
              </li>
              <li className="flex items-center text-gray-700">
                <span className="mr-2 text-primary">•</span>
                Materials provided in Hindi & English
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
