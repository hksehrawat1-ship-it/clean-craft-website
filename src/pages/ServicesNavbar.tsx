
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCountry } from '@/contexts/CountryContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ServicesNavbar = () => {
  const { currentCountry } = useCountry();

  const { data: strapiServices, isLoading } = useQuery({
    queryKey: ['services', currentCountry],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          services_country_lnk!inner(country_id)
        `)
        .eq('services_country_lnk.country_id', 1); // Default country ID

      if (error) throw error;
      return { data };
    },
    enabled: !!currentCountry,
  });

  // Helper function to create country-specific links
  const createLink = (path: string): string => {
    if (!currentCountry) return '/';
    return `/${currentCountry}${path}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600">Professional laundry and dry cleaning services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strapiServices?.data && strapiServices.data.length > 0 ? (
          strapiServices.data.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  {service.type && (
                    <Badge variant="secondary">{service.type}</Badge>
                  )}
                </div>
                
                {service.description && (
                  <p className="text-gray-600 mb-4">{service.description}</p>
                )}
                
                {service.price_from && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      From ${service.price_from}
                    </span>
                  </div>
                )}
                
                <Button className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No services available for your region.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesNavbar;
