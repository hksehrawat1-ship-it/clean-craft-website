import React from 'react';
import { useParams } from 'react-router-dom';
import { useStrapiPolicies } from '@/hooks/useStrapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { stripHtml, sanitizeHtml } from '@/lib/utils';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';

export default function PolicyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: policies, isLoading } = useStrapiPolicies();

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

  const policy = policies?.find(p => p.attributes.policy_type.data.attributes.slug === slug);

  if (!policy) {
    return (
      <>
        <EnhancedNavbar />
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-12 md:py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Policy not found</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const policyName = policy.attributes.policy_type.data.attributes.name;
  const policyDescription = policy.attributes.policy_type.data.attributes.description;
  const policyContent = stripHtml(policy.attributes.body).slice(0, 160); // First 160 chars for meta description

  return (
    <>
      <SEO 
        slug={`policies/${slug}`}
        defaultTitle={`${policyName} | CleanCraft Legal Policies`}
        defaultDescription={`${policyDescription}. ${policyContent}...`}
      />
      <EnhancedNavbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              {policy.attributes.policy_type.data.attributes.name}
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>
                Effective: {format(new Date(policy.attributes.effective_date), 'MMMM d, yyyy')}
              </span>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(policy.attributes.body) }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 