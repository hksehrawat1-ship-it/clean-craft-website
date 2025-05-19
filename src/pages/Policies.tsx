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
  const { data: policies, isLoading, error } = useStrapiPolicies();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  console.log('Policies data:', policies);
  console.log('Current country:', currentCountry);

  // Helper function to format date safely
  const formatDate = (policy: { effective_date?: string; publishedAt: string }) => {
    try {
      // First try effective_date
      if (policy.effective_date) {
        return format(new Date(policy.effective_date), 'MMM d, yyyy');
      }
      // Fallback to publishedAt date
      return format(new Date(policy.publishedAt), 'MMM d, yyyy');
    } catch (err) {
      console.warn('Invalid date for policy:', policy);
      return 'Date not available';
    }
  };

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

  if (error) {
    return (
      <>
        <EnhancedNavbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading policies</h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!policies || policies.length === 0) {
    return (
      <>
        <EnhancedNavbar />
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">No Policies Available</h2>
              <p className="text-gray-600 mt-2">
                {currentCountry ? 
                  `There are currently no policies available for ${currentCountry.name}.` :
                  'Please select a country to view available policies.'}
              </p>
              <p className="text-gray-600 mt-2">
                Please check back later or contact our support team for assistance.
              </p>
            </div>
          </div>
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
                onClick={() => navigate(`/${currentCountry?.code.toLowerCase()}/policies/${policy.slug}`)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">
                    {policy.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {policy.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>
                      Last Updated: {formatDate(policy)}
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