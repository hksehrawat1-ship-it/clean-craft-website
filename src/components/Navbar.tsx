
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center z-20">
          <span className="text-xl sm:text-2xl font-bold text-primary">Clean<span className="text-gray-800">Craft</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#about" className="text-gray-700 hover:text-primary font-medium">About</a>
          <a href="#course" className="text-gray-700 hover:text-primary font-medium">Course</a>
          <a href="#guarantees" className="text-gray-700 hover:text-primary font-medium">Guarantees</a>
          <a href="#faq" className="text-gray-700 hover:text-primary font-medium">FAQ</a>
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
            <a 
              href="#about" 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#course" 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Course
            </a>
            <a 
              href="#guarantees" 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Guarantees
            </a>
            <a 
              href="#faq" 
              className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
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
