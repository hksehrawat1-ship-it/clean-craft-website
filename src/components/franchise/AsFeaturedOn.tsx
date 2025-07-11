import React from "react";
import { Award, Star, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AsFeaturedOn = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            As Featured On
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Award Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12  border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Award Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src="/lovable-uploads/award.png"
                  alt="Economic Times Business Excellence Award Ceremony"
                  className="w-full max-w-md h-auto rounded-xl shadow-lg"
                />
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Award Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-current" />
                Award Winner
              </div>

              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                Excellence in Laundry Franchise Model
              </h3>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Awarded by{" "}
                <a
                  href="https://m.economictimes.com/news/company/corporate-trends/et-business-excellence-innovation-summit-2025-a-power-packed-evening-of-ideas-impact-and-inspiration/articleshow/122298649.cms?utm_source=whatsapp_pwa&utm_medium=social&utm_campaign=socialsharebuttons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Economic Times
                </a>{" "}
                for our outstanding innovation and leadership in the laundry
                franchise industry.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">2025</div>
                  <div className="text-sm text-gray-500">Award Year</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">ET</div>
                  <div className="text-sm text-gray-500">Economic Times</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">#1</div>
                  <div className="text-sm text-gray-500">Franchise Model</div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <div className=" flex justify-center text-center gap-3 bg-blue-50 text-blue-700 py-0 rounded-full px-3 items-center">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <a href="tel:8800771349" className="mt-4 text-lg font-bold">
                    8800771349
                  </a>
                </div>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300"
                  onClick={() => window.open("tel:8800771349", "_self")}
                >
                  Join Clean Craft
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500 text-center lg:text-left">
                Speak with our franchise experts today
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsFeaturedOn;
