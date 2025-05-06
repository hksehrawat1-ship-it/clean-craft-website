
import React from 'react';
import { Droplet, ArrowRight, ShowerHead, Shirt, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCard = ({ 
  title, 
  description, 
  price, 
  icon, 
  iconBgColor 
}: { 
  title: string; 
  description: string; 
  price: string; 
  icon: React.ReactNode; 
  iconBgColor: string; 
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

const ServicesSection = () => {
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
        <ServiceCard 
          title="Wash" 
          description="For everyday laundry, bedsheets and towels." 
          price="from £17.95/6kg"
          icon={<ShowerHead className="text-white w-6 h-6" />}
          iconBgColor="bg-[#5294FF]"
        />
        
        <ServiceCard 
          title="Wash & Iron" 
          description="For everyday laundry that requires ironing." 
          price="from £1.95/item"
          icon={<Droplet className="text-white w-6 h-6" />}
          iconBgColor="bg-[#F06292]"
        />
        
        <ServiceCard 
          title="Dry Cleaning" 
          description="For delicate items and fabrics." 
          price="from £1.95/item"
          icon={<Ticket className="text-white w-6 h-6" />}
          iconBgColor="bg-[#26A69A]"
        />
        
        <ServiceCard 
          title="Ironing only" 
          description="For items that are already clean." 
          price="from £1.45/item"
          icon={<Shirt className="text-white w-6 h-6" />}
          iconBgColor="bg-[#FFA726]"
        />
        
        <ServiceCard 
          title="Duvets & Bulky Items" 
          description="For larger items that require extra care." 
          price="from £11.95/item"
          icon={<Droplet className="text-white w-6 h-6" />}
          iconBgColor="bg-[#90CAF9]"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
