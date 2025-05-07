
import React, { useEffect, useState } from 'react';
import { Droplet, ArrowRight, ShowerHead, Shirt, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useCountry } from '@/contexts/CountryContext';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  icon_url: string | null;
  order: number;
}

interface ServiceCardProps { 
  title: string; 
  description: string; 
  price: string; 
  icon: React.ReactNode; 
  iconBgColor: string; 
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  icon, 
  iconBgColor 
}) => {
  return (
    <Card className="w-full border border-[#E9E9E9] rounded-lg hover:shadow-md transition-shadow">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-[#0E0E0E]">{title}</h3>
            <p className="text-[#212121] text-sm">{description}</p>
            <p className="text-[#0E0E0E] text-sm font-medium mt-1">{price}</p>
          </div>
        </div>
        <ArrowRight className="text-[#1869D3]" />
      </CardContent>
    </Card>
  );
};

// Icon map to match service names with icons
const serviceIcons: Record<string, { icon: React.ReactNode; bgColor: string }> = {
  'Wash': { 
    icon: <ShowerHead className="text-white w-6 h-6" />, 
    bgColor: 'bg-[#5294FF]' 
  },
  'Wash & Iron': { 
    icon: <Droplet className="text-white w-6 h-6" />, 
    bgColor: 'bg-[#F06292]' 
  },
  'Dry Cleaning': { 
    icon: <Ticket className="text-white w-6 h-6" />, 
    bgColor: 'bg-[#26A69A]' 
  },
  'Ironing only': { 
    icon: <Shirt className="text-white w-6 h-6" />, 
    bgColor: 'bg-[#FFA726]' 
  },
  'Duvets & Bulky Items': { 
    icon: <Droplet className="text-white w-6 h-6" />, 
    bgColor: 'bg-[#90CAF9]' 
  }
};

// Default fallback service data
const fallbackServices = [
  {
    id: 'wash',
    name: 'Wash',
    description: 'For everyday laundry, bedsheets and towels.',
    price: 'from £17.95/6kg',
    icon: <ShowerHead className="text-white w-6 h-6" />,
    iconBgColor: 'bg-[#5294FF]'
  },
  {
    id: 'wash-iron',
    name: 'Wash & Iron',
    description: 'For everyday laundry that requires ironing.',
    price: 'from £1.95/item',
    icon: <Droplet className="text-white w-6 h-6" />,
    iconBgColor: 'bg-[#F06292]'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    description: 'For delicate items and fabrics.',
    price: 'from £1.95/item',
    icon: <Ticket className="text-white w-6 h-6" />,
    iconBgColor: 'bg-[#26A69A]'
  },
  {
    id: 'ironing',
    name: 'Ironing only',
    description: 'For items that are already clean.',
    price: 'from £1.45/item',
    icon: <Shirt className="text-white w-6 h-6" />,
    iconBgColor: 'bg-[#FFA726]'
  },
  {
    id: 'duvets',
    name: 'Duvets & Bulky Items',
    description: 'For larger items that require extra care.',
    price: 'from £11.95/item',
    icon: <Droplet className="text-white w-6 h-6" />,
    iconBgColor: 'bg-[#90CAF9]'
  }
];

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<any[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const { currentCountry } = useCountry();

  useEffect(() => {
    const fetchServices = async () => {
      if (!currentCountry) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('country_code', currentCountry.code)
          .eq('is_active', true)
          .order('order');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          const formattedServices = data.map(service => {
            // Find matching icon or use default
            const iconConfig = serviceIcons[service.name] || {
              icon: <Droplet className="text-white w-6 h-6" />,
              bgColor: 'bg-[#5294FF]'
            };
            
            return {
              id: service.id,
              name: service.name,
              description: service.description || 'Service description',
              price: 'from £1.95/item', // This would come from a pricing table in a real app
              icon: iconConfig.icon,
              iconBgColor: iconConfig.bgColor
            };
          });
          
          setServices(formattedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use fallback services if fetch fails
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentCountry]);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-28 xl:px-32 flex flex-col md:flex-row gap-8 lg:gap-16">
      {/* Left Column */}
      <div className="w-full md:w-1/3 bg-[#1869D3] rounded-lg p-10 text-white flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-product-sans-black">Explore our services</h2>
          <p className="text-white/90">
            Your clothes are treated with the utmost care, receiving the attention they deserve.
          </p>
          <button className="flex items-center gap-2 text-white mt-4 hover:underline">
            Explore pricing <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-white/80 mt-10">
          Our minimum order value is £20. All orders include free delivery.
        </p>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-2/3 space-y-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-24 bg-gray-100 animate-pulse rounded-lg"></div>
          ))
        ) : (
          // Render services
          services.map((service) => (
            <ServiceCard 
              key={service.id}
              title={service.name}
              description={service.description}
              price={service.price}
              icon={service.icon}
              iconBgColor={service.iconBgColor}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
