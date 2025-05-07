
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const isMobile = useIsMobile();
  const { countryCode } = useParams();
  
  // Fetch available pages for the current country
  const { data: availablePages } = useQuery({
    queryKey: ['available-pages', countryCode],
    queryFn: async () => {
      if (!countryCode) return [];
      
      const { data, error } = await supabase
        .from('country_pages')
        .select('page_path, is_available')
        .eq('country_id', (await supabase
          .from('countries')
          .select('id')
          .eq('code', countryCode.toLowerCase())
          .single()).data?.id);
        
      if (error) {
        console.error('Error fetching available pages:', error);
        return [];
      }
      
      return data || [];
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

  // Check if any learning pages are available
  const hasLearningPages = isPageAvailable('/learning/courses') || isPageAvailable('/learning/book');

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
    
    const handleBodyClick = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu-container') && !e.target.closest('.menu-toggle-btn')) {
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={createLink('')} className="flex items-center z-20">
          <span className="text-xl sm:text-2xl font-bold text-primary">Clean<span className="text-gray-800">Craft</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to={createLink('')} className="text-gray-700 hover:text-primary font-medium">Home</Link>
          
          {hasLearningPages && (
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
                className={`absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50 transition-opacity duration-200 ${learningOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} group-hover:opacity-100 group-hover:pointer-events-auto`}
                onMouseEnter={() => setLearningOpen(true)}
                onMouseLeave={() => setLearningOpen(false)}
              >
                {isPageAvailable('/learning/courses') && (
                  <Link to={createLink('/learning/courses')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Courses</Link>
                )}
                {isPageAvailable('/learning/book') && (
                  <Link to={createLink('/learning/book')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Book</Link>
                )}
              </div>
            </div>
          )}
          
          {isPageAvailable('/policies') && (
            <Link to={createLink('/policies')} className="text-gray-700 hover:text-primary font-medium">Policies</Link>
          )}
          
          <Button 
            asChild
            className="bg-primary hover:bg-primary-hover text-white"
            size="sm"
          >
            <a href="#register">Register Now</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="md:hidden text-gray-700 z-20 menu-toggle-btn"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Improved with sliding animation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white/95 z-10 animate-fade-in mobile-menu-container">
          <div className="container mx-auto px-4 pt-20 flex flex-col space-y-6">
            <Link 
              to={createLink('')} 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {hasLearningPages && (
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
                      <Link to={createLink('/learning/courses')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Courses</Link>
                    )}
                    {isPageAvailable('/learning/book') && (
                      <Link to={createLink('/learning/book')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Book</Link>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {isPageAvailable('/policies') && (
              <Link 
                to={createLink('/policies')} 
                className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Policies
              </Link>
            )}
            
            <Button 
              asChild
              className="bg-primary hover:bg-primary-hover text-white w-full mt-4"
              size="lg"
            >
              <a href="#register" onClick={() => setIsMenuOpen(false)}>Register Now</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
