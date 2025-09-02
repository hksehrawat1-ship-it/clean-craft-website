import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Search, Users, Star, CheckCircle } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import { useStrapiServices } from "@/hooks/useStrapi";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import Layout from "@/components/home/Layout";

interface Franchise {
  city: string;
  state: string;
  franchise_name: string;
}

const LocationsList = () => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { data: servicesData, isLoading: servicesLoading } = useStrapiServices();
  
  // Mock franchise locations data (can be replaced with API call when needed)
  const { data: locations = [], isLoading: locationsLoading } = useQuery({
    queryKey: ["franchise-locations", currentCountry],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data based on country
      const mockLocations = currentCountry === 'AU' ? [
        { city: "Sydney", state: "New South Wales", franchise_name: "CleanCraft Sydney" },
        { city: "Melbourne", state: "Victoria", franchise_name: "CleanCraft Melbourne" },
        { city: "Brisbane", state: "Queensland", franchise_name: "CleanCraft Brisbane" },
        { city: "Perth", state: "Western Australia", franchise_name: "CleanCraft Perth" },
        { city: "Adelaide", state: "South Australia", franchise_name: "CleanCraft Adelaide" },
        { city: "Canberra", state: "ACT", franchise_name: "CleanCraft Canberra" },
      ] : [
        { city: "Mumbai", state: "Maharashtra", franchise_name: "CleanCraft Mumbai" },
        { city: "Delhi", state: "Delhi", franchise_name: "CleanCraft Delhi" },
        { city: "Bangalore", state: "Karnataka", franchise_name: "CleanCraft Bangalore" },
        { city: "Chennai", state: "Tamil Nadu", franchise_name: "CleanCraft Chennai" },
        { city: "Hyderabad", state: "Telangana", franchise_name: "CleanCraft Hyderabad" },
        { city: "Pune", state: "Maharashtra", franchise_name: "CleanCraft Pune" },
        { city: "Kolkata", state: "West Bengal", franchise_name: "CleanCraft Kolkata" },
        { city: "Ahmedabad", state: "Gujarat", franchise_name: "CleanCraft Ahmedabad" },
      ];
      
      return mockLocations;
    },
  });

  const handleCityClick = (city: string) => {
    navigate(`/${currentCountry?.toLowerCase()}/locations/laundry-services-near-me-in-${city.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleServiceClick = (service: any, city?: string) => {
    const serviceSlug = service.slug || service.name.toLowerCase().replace(/\s+/g, '-');
    if (city) {
      navigate(`/${currentCountry?.toLowerCase()}/locations/${serviceSlug}-near-me-in-${city.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      // Navigate to first available city
      if (locations.length > 0) {
        navigate(`/${currentCountry?.toLowerCase()}/locations/${serviceSlug}-near-me-in-${locations[0].city.toLowerCase().replace(/\s+/g, '-')}`);
      }
    }
  };

  const statsData = [
    { label: "Cities Served", value: locations.length, icon: MapPin },
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Years of Service", value: "10+", icon: CheckCircle },
  ];

  return (
    <Layout>
      <EnhancedSEO
        slug="/locations"
        defaultTitle={`CleanCraft Locations in ${currentCountry === 'IN' ? 'India' : 'Australia'} | Professional Laundry Services`}
        defaultDescription={`Find CleanCraft professional laundry and dry cleaning services in ${locations.length}+ cities across ${currentCountry === 'IN' ? 'India' : 'Australia'}. Book pickup & delivery today!`}
        pageType="Organization"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-brand-blue-light to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-sm md:text-display-md font-bold text-gray-900 mb-6">
              CleanCraft Locations in {currentCountry === 'IN' ? 'India' : 'Australia'}
            </h1>
            <p className="text-body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Find professional laundry and dry cleaning services near you. We serve {locations.length}+ cities with pickup & delivery.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city name..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-card">
                <stat.icon className="h-8 w-8 text-brand-blue mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-sm md:text-heading-md font-semibold text-gray-900 mb-4">
              Our Service Locations
            </h2>
            <p className="text-body-md text-gray-600 max-w-2xl mx-auto">
              Choose your city to explore our premium laundry services with doorstep pickup and delivery.
            </p>
          </div>

          {locationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 hover:border-brand-blue hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleCityClick(location.city)}
                >
                  <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark h-40 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <MapPin className="h-5 w-5 mb-1" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-title-md font-semibold text-gray-900 mb-2">
                      {location.city}
                    </h3>
                    <p className="text-body-sm text-gray-600 mb-4">
                      {location.state} • All services available
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-blue font-medium">
                        View Services
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-sm md:text-heading-md font-semibold text-gray-900 mb-4">
              Our Services Available in All Locations
            </h2>
            <p className="text-body-md text-gray-600 max-w-2xl mx-auto">
              Professional laundry services with quality guarantee and convenient pickup & delivery.
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData?.data?.slice(0, 6).map((service: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-brand-blue hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <CheckCircle className="h-6 w-6 text-brand-blue group-hover:text-white" />
                  </div>
                  
                  <h3 className="text-title-sm font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-body-sm text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {service.price_from && (
                    <p className="text-sm font-medium text-cleancraft-gold mb-4">
                      Starting from ₹{service.price_from}
                    </p>
                  )}
                  
                  <button className="text-brand-blue font-medium text-sm hover:text-brand-blue-dark transition-colors">
                    Find Near Me →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-blue-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-heading-sm md:text-heading-md font-semibold mb-4">
              Don't See Your City?
            </h2>
            <p className="text-body-lg mb-8 opacity-90">
              We're rapidly expanding across {currentCountry === 'IN' ? 'India' : 'Australia'}. 
              Get in touch and we'll notify you when we launch in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate(`/${currentCountry?.toLowerCase()}/book`)}
                className="bg-white text-brand-blue px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Book Service Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-blue transition-colors">
                Request New Location
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationsList;