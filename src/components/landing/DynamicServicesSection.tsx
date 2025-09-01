import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";

interface Service {
  id: number;
  name: string;
  description: string;
  price_from: number;
  slug: string;
  icon?: any;
}

interface DynamicServicesSectionProps {
  services?: { data: Service[] };
  isLoading: boolean;
  city?: string;
  featuredService?: string;
}

// Default services in case API fails
const defaultServices = [
  {
    id: 1,
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate fabrics, suits, dresses, and specialty garments.",
    price_from: 15,
    slug: "dry-cleaning",
    icon: "👔"
  },
  {
    id: 2,
    name: "Wash & Fold",
    description: "Convenient wash and fold service for everyday clothes. Clean, fresh, and neatly folded.",
    price_from: 12,
    slug: "wash-fold",
    icon: "👕"
  },
  {
    id: 3,
    name: "Shirt Laundry",
    description: "Professional shirt cleaning and pressing. Crisp, clean shirts ready for work or special occasions.",
    price_from: 8,
    slug: "shirt-laundry",
    icon: "👔"
  },
  {
    id: 4,
    name: "Comforter Cleaning",
    description: "Deep cleaning for comforters, blankets, and bulky items. Fresh and sanitized bedding.",
    price_from: 25,
    slug: "comforter-cleaning",
    icon: "🛏️"
  },
  {
    id: 5,
    name: "Leather & Suede",
    description: "Specialized cleaning for leather jackets, suede items, and premium materials.",
    price_from: 35,
    slug: "leather-suede",
    icon: "🧥"
  },
  {
    id: 6,
    name: "Shoe Cleaning",
    description: "Professional shoe cleaning and restoration. Bring your favorite shoes back to life.",
    price_from: 20,
    slug: "shoe-cleaning",
    icon: "👟"
  }
];

export default function DynamicServicesSection({ 
  services, 
  isLoading, 
  city, 
  featuredService 
}: DynamicServicesSectionProps) {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;
  const [viewAll, setViewAll] = useState(false);

  const handleBookService = () => {
    navigate(`/${currentCountry}/book`);
  };

  // Use API data if available, otherwise use default services
  const displayServices = services?.data?.length ? services.data : defaultServices;
  const visibleServices = viewAll ? displayServices : displayServices.slice(0, 6);

  // Check if a service is featured
  const isFeatured = (serviceName: string) => {
    return featuredService && serviceName.toLowerCase().includes(featuredService.toLowerCase());
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg max-w-2xl mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Premium Services
          {city && (
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">in {city}</span>
          )}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Professional cleaning services tailored to your needs. From everyday laundry to specialty care, 
          we handle it all with expert precision and care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleServices.map((service, index) => (
          <div
            key={service.id}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 ${
              isFeatured(service.name) 
                ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
                : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            {/* Featured Badge */}
            {isFeatured(service.name) && (
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 text-xs font-bold border-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  FEATURED
                </Badge>
              </div>
            )}

            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="space-y-4">
                <div className="text-4xl">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="text-3xl font-bold text-gray-900">
                    ${service.price_from}
                    <span className="text-base font-normal text-gray-500">/item</span>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">4.9</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleBookService}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl py-6 font-semibold text-lg group-hover:scale-105 transition-transform duration-300"
              >
                Book This Service
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Hover accent border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {!viewAll && displayServices.length > 6 && (
        <div className="text-center mt-12">
          <Button
            onClick={() => setViewAll(true)}
            variant="outline"
            size="lg"
            className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-full font-semibold"
          >
            View All Services
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We handle all types of garments and specialty cleaning. Contact us for a custom quote 
          on your specific needs.
        </p>
        <Button
          onClick={handleBookService}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-full font-semibold hover:scale-105 transition-transform duration-300"
        >
          Get Custom Quote
        </Button>
      </div>
    </div>
  );
}