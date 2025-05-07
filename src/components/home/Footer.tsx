
import React from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import CountrySelector from '@/components/CountrySelector';
import CookiePreferencesButton from '@/components/CookiePreferencesButton';

const Footer = () => {
  const { currentCountry } = useCountry();
  
  // Helper function to create country-specific links
  const createLink = (path: string): string => {
    if (!currentCountry) return '/';
    return `/${currentCountry.code}${path}`;
  };
  
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-medium mb-6">Clean Craft</h3>
            <p className="text-gray-400 mb-4">
              Professional laundry and dry cleaning services at your convenience.
            </p>
            <div className="flex items-center mt-6">
              <CountrySelector />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createLink('')} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={createLink('/learning/courses')} className="text-gray-400 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to={createLink('/learning/book')} className="text-gray-400 hover:text-white transition-colors">
                  Book
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h3 className="text-xl font-medium mb-6">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createLink('/policies/privacy')} className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={createLink('/policies/terms-conditions')} className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to={createLink('/policies/refund')} className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <CookiePreferencesButton className="text-gray-400 hover:text-white transition-colors p-0 h-auto justify-start" />
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-800 text-center md:text-left">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Clean Craft Laundry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
