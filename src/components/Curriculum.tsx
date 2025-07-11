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
    <section className="py-0 md:py-10  bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Curriculum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our carefully crafted course covers everything you need to know to
            become a laundry expert.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Theoretical Topics */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-[#1A73E8] text-white rounded-full w-12 h-12 inline-flex items-center justify-center mr-3">
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
                  className="bg-white p-4 rounded-lg flex items-center shadow-sm hover:shadow transition-all"
                >
                  <div className="w-8 aspect-square bg-[#1A73E8] rounded-full text-white flex items-center justify-center text-[10px] font-medium leading-none mr-2 font-mono">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm">{topic}</span>
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

          {/* Practical Sessions */}
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

        {/* Business Setup Info (no dialog) */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200">
            <div className="flex items-center justify-center mb-3">
              <BriefcaseBusiness className="h-10 w-10 text-[#1A73E8]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Business Setup Module Included
            </h3>
            <p className="text-gray-700 mb-4">
              Learn how to start your own profitable laundry business
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="https://cleancraft.mojo.page/best-laundry-training-institute-in-india"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1A73E8] text-white text-sm font-semibold hover:bg-[#1666c1] transition min-h-[20px] min-w-[105px] px-4 py-2 text-center rounded-full"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
