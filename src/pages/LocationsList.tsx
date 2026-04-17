import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Users, Star, Search, CheckCircle, ArrowRight, Award } from 'lucide-react';
import Layout from '@/components/home/Layout';
import { EnhancedSEO } from '@/components/EnhancedSEO';
import { useCountry } from '@/contexts/CountryContext';
import { useStrapiServices } from '@/hooks/useStrapi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Franchise {
  city: string;
  state: string;
  franchise_name: string;
}

const LocationsList: React.FC = () => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { data: services, isLoading: servicesLoading } = useStrapiServices();
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock franchise data - Enhanced with more cities
  const { data: franchises, isLoading } = useQuery<Franchise[]>({
    queryKey: ['franchises', currentCountry],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockFranchises: Franchise[] = currentCountry?.toLowerCase() === 'au' ? [
        { city: 'Sydney', state: 'New South Wales', franchise_name: 'CleanCraft Sydney Central' },
        { city: 'Melbourne', state: 'Victoria', franchise_name: 'CleanCraft Melbourne Premium' },
        { city: 'Brisbane', state: 'Queensland', franchise_name: 'CleanCraft Brisbane Express' },
        { city: 'Perth', state: 'Western Australia', franchise_name: 'CleanCraft Perth Elite' },
        { city: 'Adelaide', state: 'South Australia', franchise_name: 'CleanCraft Adelaide Pride' },
        { city: 'Canberra', state: 'Australian Capital Territory', franchise_name: 'CleanCraft Canberra' },
        { city: 'Darwin', state: 'Northern Territory', franchise_name: 'CleanCraft Darwin' },
      ] : [
        { city: 'Mumbai', state: 'Maharashtra', franchise_name: 'CleanCraft Mumbai Central' },
        { city: 'Delhi', state: 'Delhi', franchise_name: 'CleanCraft Delhi North' },
        { city: 'Bangalore', state: 'Karnataka', franchise_name: 'CleanCraft Bangalore Tech City' },
        { city: 'Chennai', state: 'Tamil Nadu', franchise_name: 'CleanCraft Chennai Express' },
        { city: 'Hyderabad', state: 'Telangana', franchise_name: 'CleanCraft Hyderabad Premium' },
        { city: 'Pune', state: 'Maharashtra', franchise_name: 'CleanCraft Pune Elite' },
        { city: 'Kolkata', state: 'West Bengal', franchise_name: 'CleanCraft Kolkata Heritage' },
        { city: 'Ahmedabad', state: 'Gujarat', franchise_name: 'CleanCraft Ahmedabad Pride' },
        { city: 'Jaipur', state: 'Rajasthan', franchise_name: 'CleanCraft Jaipur Royal' },
        { city: 'Lucknow', state: 'Uttar Pradesh', franchise_name: 'CleanCraft Lucknow Heritage' },
        { city: 'Indore', state: 'Madhya Pradesh', franchise_name: 'CleanCraft Indore Central' },
        { city: 'Bhopal', state: 'Madhya Pradesh', franchise_name: 'CleanCraft Bhopal Elite' },
        { city: 'Nagpur', state: 'Maharashtra', franchise_name: 'CleanCraft Nagpur Express' },
        { city: 'Coimbatore', state: 'Tamil Nadu', franchise_name: 'CleanCraft Coimbatore Premium' },
        { city: 'Kochi', state: 'Kerala', franchise_name: 'CleanCraft Kochi Marine' },
        { city: 'Visakhapatnam', state: 'Andhra Pradesh', franchise_name: 'CleanCraft Vizag Coastal' },
      ];
      return mockFranchises;
    },
    enabled: !!currentCountry,
  });

  // Get unique states and sort alphabetically
  const states = useMemo(() => {
    if (!franchises) return [];
    const uniqueStates = [...new Set(franchises.map(f => f.state))];
    return uniqueStates.sort();
  }, [franchises]);

  // Filter franchises based on selected state and search term
  const filteredFranchises = useMemo(() => {
    if (!franchises) return [];
    
    let filtered = franchises;
    
    // Filter by state
    if (selectedState !== 'All States') {
      filtered = filtered.filter(f => f.state === selectedState);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [franchises, selectedState, searchTerm]);

  const handleCityClick = (city: string) => {
    const path = `/${currentCountry?.toLowerCase()}/locations/laundry-and-dry-cleaning-near-me-in-${city.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path);
  };

  // Statistics data
  const statsData = [
    { label: 'Cities Served', value: franchises?.length || 0, icon: MapPin },
    { label: 'Happy Customers', value: '25,000+', icon: Users },
    { label: 'Average Rating', value: '4.9', icon: Star },
    { label: 'Years of Excellence', value: '8+', icon: Award },
  ];

  return (
    <Layout>
      <EnhancedSEO 
        slug="/locations"
        defaultTitle={`CleanCraft Locations in ${currentCountry?.toLowerCase() === 'in' ? 'India' : 'Australia'} | Professional Laundry Services`}
        defaultDescription={`Find CleanCraft laundry and dry cleaning services near you. Professional pickup and delivery available in ${franchises?.length || 0} cities across ${currentCountry?.toLowerCase() === 'in' ? 'India' : 'Australia'}.`}
        pageType="Organization"
      />
      
      {/* Hero Section - Sabri Suby Style */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tired of Poor Laundry Service?
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 text-blue-100">
            Experience Premium Care in {currentCountry?.toLowerCase() === 'in' ? 'India' : 'Australia'}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 25,000+ satisfied customers across {franchises?.length || 0} cities
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by city name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg text-gray-800 border-0"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm flex-wrap gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-cleancraft-gold mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-200 mr-1" />
              <span>25,000+ Happy Customers</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-cleancraft-gold mr-1" />
              <span>Premium Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* State Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedState === 'All States' ? 'default' : 'outline'}
              onClick={() => setSelectedState('All States')}
              className="mb-2"
            >
              All States ({franchises?.length || 0})
            </Button>
            {states.map((state) => {
              const stateCount = franchises?.filter(f => f.state === state).length || 0;
              return (
                <Button
                  key={state}
                  variant={selectedState === state ? 'default' : 'outline'}
                  onClick={() => setSelectedState(state)}
                  className="mb-2"
                >
                  {state} ({stateCount})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust-Building Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose CleanCraft?
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by families across {currentCountry?.toLowerCase() === 'in' ? 'India' : 'Australia'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className="w-10 h-10 text-brand-blue mx-auto mb-3" />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Grid Section - Scalable Design */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Premium Laundry Service in Your City
            </h2>
            <p className="text-lg text-gray-600">
              {selectedState === 'All States' 
                ? `Available in ${filteredFranchises.length} cities` 
                : `${filteredFranchises.length} cities in ${selectedState}`}
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
              ))}
            </div>
          ) : filteredFranchises.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No cities found</h3>
              <p className="text-gray-500">Try adjusting your search or state filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredFranchises.map((franchise, index) => (
                <div
                  key={index}
                  onClick={() => handleCityClick(franchise.city)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-6 border border-gray-100 hover:border-brand-blue/20 transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {franchise.city}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{franchise.state}</p>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center justify-center text-xs text-gray-600">
                        <Star className="w-3 h-3 mr-1 text-cleancraft-gold" />
                        <span>4.9 Rating</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Same-day service
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full group-hover:bg-brand-blue-dark transition-colors"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guarantee & Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              The CleanCraft Guarantee
            </h2>
            <p className="text-lg text-gray-600">
              Premium service you can trust, delivered to your door
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Satisfaction</h3>
              <p className="text-gray-600">Not happy? We'll re-clean for free or money back</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-cleancraft-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-cleancraft-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Same-Day Service</h3>
              <p className="text-gray-600">Book before 10 AM for same-day pickup & delivery</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Trusted by 25,000+</h3>
              <p className="text-gray-600">Join thousands of satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop Wasting Time on Laundry!
          </h2>
          <p className="text-xl mb-2 text-blue-100">
            Get your clothes professionally cleaned and delivered
          </p>
          <p className="text-lg mb-8 text-blue-200">
            <strong>Book within 2 hours for same-day pickup</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate(`/${currentCountry?.toLowerCase()}/book`)}
              className="bg-white text-brand-blue hover:bg-gray-100 font-semibold px-8 py-4"
            >
              Book Free Pickup Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-semibold px-8 py-4"
            >
              Call Us Now
            </Button>
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-blue-200 flex-wrap gap-2">
            <span>✓ Free pickup & delivery</span>
            <span>✓ Same-day service</span>
            <span>✓ 100% guarantee</span>
          </div>
          
          <p className="mt-8 text-blue-200 text-sm">
            Don't see your city? We're rapidly expanding! Contact us to request service in your area.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default LocationsList;