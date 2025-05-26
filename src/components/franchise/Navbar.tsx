
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container-custom flex justify-between items-center py-4">
        <a href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-laundry-primary to-laundry-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <span className="font-display font-semibold text-xl text-laundry-dark">
            LaundryChain
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            <a href="#features" className="text-gray-700 hover:text-laundry-primary transition-colors">
              Why Us
            </a>
            <a href="#process" className="text-gray-700 hover:text-laundry-primary transition-colors">
              Process
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-laundry-primary transition-colors">
              Success Stories
            </a>
            <a href="#faq" className="text-gray-700 hover:text-laundry-primary transition-colors">
              FAQ
            </a>
          </div>
          <Button className="bg-laundry-primary hover:bg-laundry-accent text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 py-2 hover:text-laundry-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Us
            </a>
            <a 
              href="#process" 
              className="text-gray-700 py-2 hover:text-laundry-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 py-2 hover:text-laundry-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </a>
            <a 
              href="#faq" 
              className="text-gray-700 py-2 hover:text-laundry-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <Button 
              className="bg-laundry-primary hover:bg-laundry-accent text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
