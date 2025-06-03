
import React from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { Link } from 'react-router-dom';

interface PolicyLayoutProps {
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ children }) => {
  const { currentCountry } = useCountry();

  // Helper function to create country-specific links
  const createLink = (path: string): string => {
    if (!currentCountry) return '/';
    return `/${currentCountry}${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to={createLink('')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
