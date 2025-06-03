
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import CountrySelector from "@/components/CountrySelector";

const Navbar = () => {
  const { currentCountry } = useCountry();

  // Helper function to create country-specific links
  const createLink = (path: string): string => {
    if (!currentCountry) return "/";
    return `/${currentCountry}${path}`;
  };

  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to={createLink("")}>
            <img
              alt="Clean Craft Logo"
              className="h-14 w-auto"
              src="/lovable-uploads/b9620b89-debb-4cc2-bd6b-edec70fb1bed.png"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          <Link
            to={createLink("")}
            className="text-[#0E0E0E] hover:text-blue-500 font-medium"
          >
            Service & Pricing
          </Link>
          <Link
            to={createLink("/locations")}
            className="text-[#0E0E0E] hover:text-blue-500 font-medium"
          >
            Location
          </Link>
          <Link
            to={createLink("/connect")}
            className="text-[#0E0E0E] hover:text-blue-500 font-medium"
          >
            Connect
          </Link>
          <Link
            to={createLink("/franchise")}
            className="text-[#0E0E0E] hover:text-blue-500 font-medium"
          >
            Laundry Franchise
          </Link>

          <CountrySelector />
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50"
          >
            Login
          </Button>
          <Button
            className="bg-[#1A73E8] text-white hover:bg-blue-600 rounded-md"
            style={{ borderRadius: "12px !important" }}
          >
            Book
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
