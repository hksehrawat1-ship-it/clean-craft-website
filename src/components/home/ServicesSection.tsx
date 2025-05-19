import React from 'react';
import { ChevronRight, Shirt, Droplet, CircleOff, Box, Waves, ArrowRight } from 'lucide-react';
import { useCountry } from '@/contexts/CountryContext';
import { toast } from 'sonner';
import { useStrapiServices } from '@/hooks/useStrapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ServiceCardProps { 
  name: string; 
  description: string; 
  price_from: number;
  price_type?: string;
  icon?: React.ReactNode;
  iconUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price_from, price_type = 'kg', icon, iconUrl }) => {
  const { currentCountry } = useCountry();
  const currencySymbol = currentCountry ? currencySymbols[currentCountry.code.toLowerCase()] || '$' : '$';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {iconUrl ? (
            <img src={iconUrl} alt={name} className="w-10 h-10" />
          ) : icon}
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-gray-600 mb-4 min-h-[48px]">{description}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">From</span>
          <div className="text-lg font-semibold">
            {currencySymbol}{price_from}/{price_type}
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon map to match service names with icons
const serviceIcons: Record<string, React.ReactNode> = {
  'Wash': <Waves className="w-10 h-10 text-[#5294FF]" />,
  'Wash & Iron': <Shirt className="w-10 h-10 text-[#F06292]" />,
  'Dry Cleaning': <ArrowRight className="w-10 h-10 text-[#26A69A]" />,
  'Ironing only': <Shirt className="w-10 h-10 text-[#FFA726]" />,
  'Duvets & Bulky Items': <Box className="w-10 h-10 text-[#90CAF9]" />,
  'Wash, Dry & Fold': <Waves className="w-10 h-10 text-[#5294FF]" />
};

// Currency symbols based on country code
const currencySymbols: Record<string, string> = {
  'in': '₹',
  'us': '$',
  'uk': '£',
  'au': '$',
  'sg': 'S$',
  'my': 'RM',
  'de': '€',
  'fr': '€',
  'es': '€',
  'it': '€'
};

const ServicesSection: React.FC = () => {
  const { currentCountry } = useCountry();
  const { data: strapiServices, isLoading, error } = useStrapiServices();

  // Debug logging
  console.log('ServicesSection render:', {
    currentCountry,
    strapiServices,
    isLoading,
    error
  });

  // Show loading state while we're loading data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error('Error loading services:', error);
    toast.error('Failed to load services');
  }

  // Debug logging for services data
  console.log('Display services data:', {
    hasData: strapiServices?.data?.length > 0,
    strapiServicesData: strapiServices?.data,
    willUseFallback: !strapiServices?.data?.length
  });

  // Fallback services data
  const fallbackServices = [
    {
      id: 'wash-dry-fold',
      name: 'Wash, Dry & Fold',
      description: 'Professional laundry service charged per kilogram. Perfect for everyday clothes, bedding, and towels.',
      price_from: 6.50,
      price_type: 'kg',
      slug: 'wash-dry-fold'
    },
    {
      id: 'wash-iron',
      name: 'Wash & Iron',
      description: 'For everyday laundry that requires ironing.',
      price_from: 7.50,
      price_type: 'kg',
      slug: 'wash-iron'
    },
    {
      id: 'dry-cleaning',
      name: 'Dry Cleaning',
      description: 'For delicate items and fabrics.',
      price_from: 12.95,
      price_type: 'item',
      slug: 'dry-cleaning'
    },
    {
      id: 'ironing',
      name: 'Ironing only',
      description: 'For items that are already clean.',
      price_from: 3.95,
      price_type: 'item',
      slug: 'ironing'
    },
    {
      id: 'duvets',
      name: 'Duvets & Bulky Items',
      description: 'For larger items that require extra care.',
      price_from: 24.95,
      price_type: 'item',
      slug: 'duvets'
    }
  ];

  const displayServices = strapiServices?.data?.length > 0 ? strapiServices.data : fallbackServices;
  const countryCode = currentCountry?.code.toLowerCase() || 'in';

  return (
    <section className="w-full py-16 px-4 md:px-8">
      {/* Mobile View - Scrollable Cards */}
      <div className="lg:hidden">
        <div className="max-w-7xl mx-auto bg-[#1E3A8A] p-6 rounded-3xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore our services
            </h2>
            <p className="text-lg text-white/90">
              Your clothes are treated with the utmost care, receiving the attention they deserve.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory">
            {displayServices.map((service) => (
              <div key={service.id} className="snap-start min-w-[300px]">
                <ServiceCard
                  name={service.name}
                  description={service.description}
                  price_from={service.price_from}
                  price_type={service.price_type || 'kg'}
                  icon={serviceIcons[service.name]}
                  iconUrl={service.icon?.[0]?.url}
                />
              </div>
            ))}
          </div>

          <p className="text-sm text-white/75 mt-8">
            Our minimum order value is {currencySymbols[countryCode]}20. All orders include free delivery.
          </p>
        </div>
      </div>

      {/* Desktop View - Split Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
          {/* Left Section - Blue Background */}
          <div className="bg-[#1E3A8A] text-white p-16">
            <h2 className="text-4xl font-bold mb-6">
              Explore our services
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Your clothes are treated with the utmost care, receiving the attention they deserve.
            </p>
            <button className="flex items-center text-lg hover:underline">
              Explore pricing <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <p className="mt-auto pt-16 text-sm opacity-75">
              Our minimum order value is {currencySymbols[countryCode]}20. All orders include free delivery.
            </p>
          </div>

          {/* Right Section - Service Cards */}
          <div className="bg-gray-50 p-16">
            <div className="space-y-4 max-w-xl">
              {displayServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  description={service.description}
                  price_from={service.price_from}
                  price_type={service.price_type || 'kg'}
                  icon={serviceIcons[service.name]}
                  iconUrl={service.icon?.[0]?.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
