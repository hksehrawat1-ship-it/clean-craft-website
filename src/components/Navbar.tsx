
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold text-primary">Clean<span className="text-gray-800">Craft</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#course" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Course
            </a>
            <a 
              href="#guarantees" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Guarantees
            </a>
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <Button 
              asChild
              className="bg-primary hover:bg-primary-hover text-white w-full"
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
