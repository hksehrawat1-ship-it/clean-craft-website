import React from "react";
import { EnhancedSEO } from "@/components/EnhancedSEO"; // ✅ SEO component import
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Store, Package } from "lucide-react";

export default function DiscoverCleanCraft() {
  return (
    <>
      <EnhancedSEO
        slug="/discover-cleancraft"
        pageType="Organization"
        defaultTitle="Laundry Franchise Opportunity | Clean Craft"
        defaultDescription="Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available."
        customKeywords={[
          "dry cleaning franchise",
          "wet cleaning business opportunity",
          "profitable laundry franchise",
        ]}
      />

      <EnhancedNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              Discover Clean Craft
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-blue-600 mb-8">
              India's Fastest Growing and most preferred Laundry & Dry Cleaning
              Franchise Brand
            </p>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg md:text-xl leading-relaxed">
                Welcome to Clean Craft, where technology meets trust in the
                world of laundry and dry cleaning. Whether you're a customer
                looking for premium garment care or a business enthusiast
                dreaming of starting your own successful franchise, Clean Craft
                is built to serve you.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mt-6">
                With a commitment to quality, consistency, and customer
                satisfaction, we're transforming how India experiences
                laundry—one spotless garment at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">COACHING</h3>
                <p className="text-gray-600">
                  Professional training and mentorship for laundry and dry
                  cleaning excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">FRANCHISE</h3>
                <p className="text-gray-600">
                  Proven business model and ongoing support for your
                  entrepreneurial journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">PRODUCTS</h3>
                <p className="text-gray-600">
                  Premium cleaning solutions and equipment for superior garment
                  care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900">
              Our Vision
            </h2>
            <p className="text-2xl font-semibold text-blue-600 mb-8">
              We want to make this world a better place—whatever it takes.
            </p>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed">
                At Clean Craft, we believe that everyone deserves the confidence
                of a spotless personality. A clean appearance has the power to
                shape perceptions, boost self-esteem, and open doors. Our vision
                is to be the driving force behind this transformation—one
                pristine garment and one confident individual at a time.
              </p>
              <p className="text-xl font-semibold text-gray-900 mt-8">
                We honour spotless personalities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center text-gray-900">
              Our Mission
            </h2>
            <p className="text-lg text-center text-gray-700 mb-12">
              To transform lives through the power of cleanliness and
              presentation by:
            </p>

            <div className="space-y-8">
              {[
                "Delivering pristine, professionally cleaned garments that enhance personal image and confidence.",
                "Providing accessible, reliable, and eco-conscious laundry solutions that make self-care effortless.",
                "Empowering individuals to build strong, respectable businesses through our trusted franchise model.",
              ].map((text, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-gray-900">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "1. Spotless Excellence",
                  desc: "We deliver nothing but perfection—because we understand the value of a flawless first impression.",
                },
                {
                  title: "2. Dignity Through Cleanliness",
                  desc: "We believe that cleanliness uplifts, empowers, and dignifies people from all walks of life.",
                },
                {
                  title: "3. Commitment Without Compromise",
                  desc: "We go the extra mile—whatever it takes—to ensure quality, customer satisfaction, and long-term trust.",
                },
                {
                  title: "4. Empowerment Through Opportunity",
                  desc: "We enable aspiring entrepreneurs to create successful futures with a scalable, profitable business.",
                },
                {
                  title: "5. Sustainable Impact",
                  desc: "We serve not just individuals but the planet—by using eco-friendly processes and responsible practices.",
                },
              ].map((val, i) => (
                <Card key={i} className="p-6 bg-white">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {val.title}
                    </h3>
                    <p className="text-gray-700">{val.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
