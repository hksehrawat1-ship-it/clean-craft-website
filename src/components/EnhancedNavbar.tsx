
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { useCountry } from "@/contexts/CountryContext";
import { usePagesConfig } from "@/hooks/use-pages-config";

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const { currentCountry } = useCountry();
  const { getNavbarItems } = usePagesConfig();

  const navItems = getNavbarItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }

    const handleBodyClick = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        !(e.target as HTMLElement).closest(".mobile-menu-container") &&
        !(e.target as HTMLElement).closest(".menu-toggle-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [isMenuOpen, isMobile]);

  const createLink = (path: string) => {
    return currentCountry ? `/${currentCountry.toLowerCase()}${path}` : "/";
  };

  const handleDropdownEnter = (path: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(path);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={createLink("")} className="flex items-center z-20">
          <img
            alt="Clean Craft Logo"
            className="h-8 w-8 md:hidden"
            src="/lovable-uploads/cleancraft-icon.png"
          />
          <img
            alt="Clean Craft Logo"
            className="hidden md:block h-12 w-auto"
            src="/lovable-uploads/cleancraft-full-logo.png"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.path)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 font-medium focus:outline-none"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.path ? null : item.path
                    )
                  }
                  type="button"
                >
                  {item.title}{" "}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      openDropdown === item.path ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === item.path && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={createLink(child.path)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={createLink(item.path)}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="text-[#1A73E8] hover:bg-[#1A73E8]/10 transition-colors duration-200"
            style={{ border: "2px solid #1A73E8" }}
          >
            Login
          </Button>

          <Button className="bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-colors duration-200 rounded-[12px] px-6 py-2 text-sm font-medium whitespace-nowrap min-w-[90px]">
            Book Now
          </Button>
        </div>

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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-10 animate-fade-in mobile-menu-container">
          <div className="container mx-auto px-4 pt-20 flex flex-col space-y-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.path} className="relative">
                  <button
                    className="flex items-center justify-between text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100 w-full focus:outline-none transition-colors duration-200"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.path ? null : item.path
                      )
                    }
                    type="button"
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === item.path ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openDropdown === item.path
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="py-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={createLink(child.path)}
                          className="block py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={createLink(item.path)}
                  className="text-lg text-gray-700 hover:text-primary font-medium py-3 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )
            )}

            {/* Action buttons - Mobile */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant="outline"
                className="border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8]/10 transition-colors duration-200 w-full"
              >
                Login
              </Button>

              <Button className="bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-colors duration-200 w-full rounded-[12px] px-4 py-3 text-sm font-medium">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedNavbar;
