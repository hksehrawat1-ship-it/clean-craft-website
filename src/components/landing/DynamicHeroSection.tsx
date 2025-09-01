import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Phone, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";

interface DynamicHeroSectionProps {
  city?: string;
  service?: string;
}

export default function DynamicHeroSection({ city, service }: DynamicHeroSectionProps) {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;
  
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  
  const services = [
    "DRY CLEANING",
    "WASH & FOLD", 
    "SHIRT LAUNDRY",
    "COMFORTER CLEANING",
    "LEATHER CLEANING"
  ];

  // Rotate through services every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  const handleBookNow = () => {
    navigate(`/${currentCountry}/book`);
  };

  const benefits = [
    "Free Pickup & Delivery",
    "24/7 Customer Support", 
    "Eco-Friendly Cleaning",
    "100% Satisfaction Guarantee"
  ];

  const currentService = service || services[currentServiceIndex];

  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">Premium Quality Service</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Professional
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  {currentService}
                </span>
                {city && (
                  <span className="block text-3xl md:text-4xl lg:text-5xl text-blue-100">
                    in {city}
                  </span>
                )}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-blue-100 font-medium max-w-lg">
                Expert care for your garments with convenient pickup & delivery service
              </h2>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-blue-100 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleBookNow}
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl min-h-[60px] group"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Schedule Pickup Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm px-8 py-6 text-lg rounded-full min-h-[60px] group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Call Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-100 font-medium">5.0 Rating</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="text-blue-100 font-medium">1000+ Happy Customers</div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
              {/* Placeholder for hero image - you can replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-white/80 text-lg font-medium">Premium Service Guaranteed</div>
                </div>
              </div>
              
              {/* Floating service cards */}
              <div className="absolute top-8 left-8 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Pickup</div>
                    <div className="text-sm text-gray-600">Same Day Service</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">5.0 Rating</div>
                    <div className="text-sm text-gray-600">1000+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}