
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import CountrySelector from '@/components/CountrySelector';

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const isMobile = useIsMobile();
  const { countryCode } = useParams();
  
  // Fetch available pages for the current country
  const { data: availablePages, isLoading } = useQuery({
    queryKey: ['available-pages', countryCode],
    queryFn: async () => {
      if (!countryCode) return [];
      
      // Define the pages to check
      const pagesToCheck = [
        '/learning/courses',
        '/learning/book',
        '/policies'
      ];
      
      // Create an array to store results
      const results = [];
      
      // Check each page
      for (const page of pagesToCheck) {
        const { data, error } = await supabase
          .rpc('is_page_available', {
            country_code: countryCode.toLowerCase(),
            page_path: page
          });
          
        if (!error) {
          results.push({
            page_path: page,
            is_available: !!data
          });
        }
      }
      
      return results;
    },
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Helper function to check if a path is available
  const isPageAvailable = (path: string): boolean => {
    if (!availablePages || !availablePages.length) {
      return true; // Default to showing all links if data isn't loaded yet
    }
    
    const page = availablePages.find(p => p.page_path === path);
    return page ? page.is_available : false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
    
    const handleBodyClick = (e: MouseEvent) => {
      if (isMenuOpen && 
          !(e.target as HTMLElement).closest('.mobile-menu-container') && 
          !(e.target as HTMLElement).closest('.menu-toggle-btn')) {
        setIsMenuOpen(false);
      }
    };
    
    document.body.addEventListener('click', handleBodyClick);
    return () => document.body.removeEventListener('click', handleBodyClick);
  }, [isMenuOpen, isMobile]);

  // Helper function to create links with the country code
  const createLink = (path: string) => {
    return countryCode ? `/${countryCode}${path}` : '/';
  };
  
  // Determine if Learning section should be shown (if any of its sub-pages are available)
  const showLearningSection = isPageAvailable('/learning/courses') || isPageAvailable('/learning/book');
  
  // Determine if Policies section should be shown
  const showPoliciesSection = isPageAvailable('/policies');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={createLink('')} className="flex items-center z-20">
          <img alt="Clean Craft Logo" className="h-12 w-auto" src="/lovable-uploads/b9620b89-debb-4cc2-bd6b-edec70fb1bed.png" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* Fixed navigation links from Header */}
          <Link to={createLink('')} className="text-gray-700 hover:text-primary font-medium">
            Service & Pricing
          </Link>
          
          <Link to={createLink('/locations')} className="text-gray-700 hover:text-primary font-medium">
            Location
          </Link>
          
          <Link to={createLink('/connect')} className="text-gray-700 hover:text-primary font-medium">
            Connect
          </Link>
          
          <Link to={createLink('/franchise')} className="text-gray-700 hover:text-primary font-medium">
            Laundry Franchise
          </Link>
          
          {/* Dynamic sections based on country availability */}
          {showLearningSection && (
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-primary font-medium focus:outline-none"
                onMouseEnter={() => setLearningOpen(true)}
                onMouseLeave={() => setLearningOpen(false)}
                onClick={() => setLearningOpen((open) => !open)}
                type="button"
              >
                Learning <ChevronDown size={16} className="ml-1" />
              </button>
              <div
                className={`absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50 transition-opacity duration-200 ${
                  learningOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } group-hover:opacity-100 group-hover:pointer-events-auto`}
                onMouseEnter={() => setLearningOpen(true)}
                onMouseLeave={() => setLearningOpen(false)}
              >
                {isPageAvailable('/learning/courses') && (
                  <Link to={createLink('/learning/courses')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Courses
                  </Link>
                )}
                {isPageAvailable('/learning/book') && (
                  <Link to={createLink('/learning/book')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Book
                  </Link>
                )}
              </div>
            </div>
          )}
          
          {showPoliciesSection && (
            <Link to={createLink('/policies')} className="text-gray-700 hover:text-primary font-medium">
              Policies
            </Link>
          )}
          
          {/* Country Selector */}
          <div className="ml-4">
            <CountrySelector />
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50">
            Login
          </Button>
          <Button className="bg-[#1A73E8] text-white hover:bg-blue-600">
            Book
          </Button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden text-gray-700 z-20 menu-toggle-btn ml-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved with sliding animation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white/95 z-10 animate-fade-in mobile-menu-container">
          <div className="container mx-auto px-4 pt-20 flex flex-col space-y-6">
            {/* Fixed navigation links */}
            <Link 
              to={createLink('')} 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Service & Pricing
            </Link>
            
            <Link 
              to={createLink('/locations')} 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Location
            </Link>
            
            <Link 
              to={createLink('/connect')} 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Connect
            </Link>
            
            <Link 
              to={createLink('/franchise')} 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Laundry Franchise
            </Link>
            
            {/* Dynamic sections based on country availability */}
            {showLearningSection && (
              <div className="relative">
                <button
                  className="flex items-center text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100 w-full focus:outline-none"
                  onClick={() => setLearningOpen((open) => !open)}
                  type="button"
                >
                  Learning <ChevronDown size={16} className="ml-1" />
                </button>
                {learningOpen && (
                  <div className="ml-4 mt-2 w-36 bg-white border rounded shadow-lg py-2 z-50">
                    {isPageAvailable('/learning/courses') && (
                      <Link to={createLink('/learning/courses')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                        Courses
                      </Link>
                    )}
                    {isPageAvailable('/learning/book') && (
                      <Link to={createLink('/learning/book')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                        Book
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {showPoliciesSection && (
              <Link 
                to={createLink('/policies')} 
                className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Policies
              </Link>
            )}
            
            {/* Country selector in mobile menu */}
            <div className="py-4">
              <CountrySelector />
            </div>
            
            {/* Action buttons in mobile menu */}
            <div className="flex flex-col gap-3 mt-4">
              <Button 
                variant="outline"
                className="border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50 w-full"
              >
                Login
              </Button>
              <Button 
                className="bg-[#1A73E8] text-white hover:bg-blue-600 w-full"
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedNavbar;
