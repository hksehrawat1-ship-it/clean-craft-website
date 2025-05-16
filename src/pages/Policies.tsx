import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStrapiPolicies } from '@/hooks/useStrapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useCountry } from '@/contexts/CountryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { SEO } from '@/components/SEO';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';

export default function Policies() {
  const { data: policies, isLoading } = useStrapiPolicies();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  if (isLoading) {
    return (
      <>
        <EnhancedNavbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <LoadingSpinner />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        slug="policies"
        defaultTitle="Legal Policies & Terms | CleanCraft"
        defaultDescription="Learn about CleanCraft's policies, terms of service, and guidelines to ensure a smooth experience with our professional laundry services."
      />
      <EnhancedNavbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Our <span className="text-[#1869D3]">Policies</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about our policies and guidelines to ensure a smooth experience with our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies?.map((policy) => (
              <Card 
                key={policy.id}
                className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/${currentCountry?.code.toLowerCase()}/policies/${policy.attributes.policy_type.data.attributes.slug}`)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">
                    {policy.attributes.policy_type.data.attributes.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {policy.attributes.policy_type.data.attributes.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>
                      Effective: {format(new Date(policy.attributes.effective_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 