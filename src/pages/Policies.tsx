
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PolicyLayout from '@/components/policies/PolicyLayout';
import { useCountry } from '@/contexts/CountryContext';

const Policies = () => {
  const { currentCountry } = useCountry();
  
  const { data: policies, isLoading } = useQuery({
    queryKey: ['policies', currentCountry],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('policies')
        .select(`
          *,
          policies_country_lnk!inner(country_id)
        `)
        .eq('policies_country_lnk.country_id', 1); // Default country ID

      if (error) throw error;
      return data;
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
      <PolicyLayout>
        <div className="text-center py-8">Loading policies...</div>
      </PolicyLayout>
    );
  }

  return (
    <PolicyLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Policies</h1>
        
        <div className="grid gap-6">
          {policies?.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                <Link 
                  to={createLink(`/policies/${policy.slug}`)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {policy.name}
                </Link>
              </h2>
              
              {policy.description && (
                <p className="text-gray-600 mb-4">{policy.description}</p>
              )}
              
              <Link 
                to={createLink(`/policies/${policy.slug}`)}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read Policy
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        {(!policies || policies.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No policies available for your region.
          </div>
        )}
      </div>
    </PolicyLayout>
  );
};

export default Policies;
