import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountry } from "@/contexts/CountryContext";
import { getNavbarItems } from "@/hooks/use-pages-config";
import type { PageData } from "@/types/config";

const EnhancedNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const isMobile = useIsMobile();
  const { currentCountry } = useCountry();
  const navItems = getNavbarItems(currentCountry);
  const location = useLocation();

  const createLink = (path: string) =>
    currentCountry ? `/${currentCountry.toLowerCase()}${path}` : "/";

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (location.pathname === createLink("")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnBodyClick = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest(".mobile-menu-container") &&
        !(e.target as HTMLElement).closest(".menu-toggle-btn")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeOnBodyClick);
    return () => document.body.removeEventListener("click", closeOnBodyClick);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const openDD = (path: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(path);
  };
  const closeDD = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const commonLink =
    "inline-flex items-center font-medium text-gray-700 hover:text-primary transition-colors duration-200";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* ─── Logo ─── */}
        <Link
          to={createLink("")}
          onClick={handleLogoClick}
          className="z-20 flex items-center"
        >
          <img
            src="/lovable-uploads/Clean Craft logo (688x144)-01.svg"
            alt="CleanCraft Icon"
            className="h-10 w-auto md:hidden"
          />
          <img
            src="/lovable-uploads/Clean Craft logo (688x144)-01.svg"
            alt="CleanCraft Logo"
            className="hidden h-12 w-auto md:block"
          />
        </Link>

        {/* ─── Desktop Nav ─── */}
        <nav className="hidden items-center space-x-6 lg:space-x-8 md:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => openDD(item.path)}
                onMouseLeave={closeDD}
              >
                <button
                  type="button"
                  className={commonLink}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.path ? null : item.path
                    )
                  }
                >
                  {item.title}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      openDropdown === item.path ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === item.path && (
                  <div className="absolute left-0 mt-2 w-48 rounded-lg border bg-white py-2 shadow-xl z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={createLink(child.path)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
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
                className={commonLink}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* ─── Desktop actions ─── */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8]/10"
          >
            Login
          </Button>
          <Button className="rounded-[12px] bg-[#1A73E8] px-6 py-2 text-sm font-medium text-white hover:bg-[#1557B0]">
            Book Now
          </Button>
        </div>

        {/* ─── Mobile burger / close ─── */}
        <button
          aria-label="Toggle menu"
          className="menu-toggle-btn z-50 text-gray-800 md:hidden p-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── Mobile menu ─── */}
      {isMenuOpen && (
        <div className="mobile-menu-container fixed inset-0 z-40 bg-white md:hidden animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-4 px-4 pt-20">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.path}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-100 py-3 text-lg font-medium text-gray-700 hover:text-primary"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.path ? null : item.path
                      )
                    }
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
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={createLink(child.path)}
                          className="block py-2 text-gray-700 hover:text-primary"
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
                  className="border-b border-gray-100 py-3 text-lg font-medium text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )
            )}

            {/* ── Mobile actions ── */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8]/10"
              >
                Login
              </Button>
              <Button className="w-full rounded-[12px] bg-[#1A73E8] px-4 py-3 text-sm font-medium text-white hover:bg-[#1557B0]">
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
