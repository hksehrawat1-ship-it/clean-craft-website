
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/home/Layout";
import { useCountry } from '@/contexts/CountryContext';

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  children,
  title,
  description,
}) => {
  const { currentCountry } = useCountry();
  
  // Helper function to create country-specific links
  const createLink = (path: string): string => {
    if (!currentCountry) return '/policies';
    return `/${currentCountry.code}/policies`;
  };
  
  return (
    <Layout showOfferCarousel={false}>
      {/* Main content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to={createLink('')} className="flex items-center text-google-blue hover:text-google-blue-dark">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to policies
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-google-blue-dark mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
          <Separator className="my-4" />
          <div className="prose max-w-none">
            {children}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              For any query: <a href="mailto:Hello@cleanraftapp.com" className="text-google-blue hover:underline">
                Hello@cleanraftapp.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PolicyLayout;
