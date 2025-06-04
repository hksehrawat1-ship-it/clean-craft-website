
import React, { useState } from "react";
import { ChevronRight, ArrowRight, Wifi, WifiOff } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import { useStrapiConnection } from "@/contexts/StrapiConnectionContext";
import { toast } from "sonner";
import { useStrapiServices } from "@/hooks/useStrapi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  FaTshirt,
  FaSoap,
  FaBoxOpen,
  FaRegSnowflake,
  FaBroom,
} from "react-icons/fa";
import { IconType } from "react-icons";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";

interface ServiceCardProps {
  name: string;
  description: string;
  price_from: number;
  price_type?: string;
  icon?: IconType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  price_from,
  price_type = "kg",
  icon: Icon,
}) => {
  const { currentCountry } = useCountry();
  const currencySymbol = currentCountry
    ? currencySymbols[currentCountry.toLowerCase()] || "$"
    : "$";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
      {/* Icon with circular background */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-[#5294FF]/10 rounded-full flex items-center justify-center">
          {Icon &&
            React.createElement(Icon as any, {
              className: "w-6 h-6 text-[#5294FF]",
            })}
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{name}</h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[60px]">
        {description}
      </p>
      
      {/* Pricing */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {currencySymbol}{price_from}
              </span>
              <span className="text-sm text-gray-500">/{price_type}</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-[#5294FF] rounded-full flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectionStatus: React.FC = () => {
  const { isConnected, isInitializing, error, retryConnection } = useStrapiConnection();

  if (isInitializing) {
    return (
      <div className="flex items-center gap-2 text-white/75 text-sm">
        <LoadingSpinner size="sm" />
        <span>Connecting to services...</span>
      </div>
    );
  }

  if (!isConnected && error) {
    return (
      <div className="flex items-center gap-2 text-white/75 text-sm">
        <WifiOff className="w-4 h-4" />
        <span>Connection issue - showing cached content</span>
        <button 
          onClick={retryConnection}
          className="text-white underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-white/75 text-sm">
      <Wifi className="w-4 h-4" />
      <span>Live content</span>
    </div>
  );
};

const serviceIcons: Record<string, IconType> = {
  Wash: FaSoap,
  "Wash & Iron": FaTshirt,
  "Dry Cleaning": FaRegSnowflake,
  "Ironing only": FaBroom,
  "Duvets & Bulky Items": FaBoxOpen,
  "Wash, Dry & Fold": FaTshirt,
};

const currencySymbols: Record<string, string> = {
  in: "₹",
  us: "$",
  uk: "£",
  au: "$",
  sg: "S$",
  my: "RM",
  de: "€",
  fr: "€",
  es: "€",
  it: "€",
};

const ServicesPage: React.FC = () => {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const [showAll, setShowAll] = useState(false);

  // Show loading spinner if Strapi is initializing or data is loading
  if (isInitializing || (isLoading && isConnected)) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && isConnected) {
    console.error("Error loading services:", error);
    toast.error("Failed to load services");
  }

  const fallbackServices = [
    {
      id: "wash-dry-fold",
      name: "Wash, Dry & Fold",
      description:
        "Professional laundry service charged per kilogram. Perfect for everyday clothes, bedding, and towels.",
      price_from: 6.5,
      price_type: "kg",
      slug: "wash-dry-fold",
    },
    {
      id: "wash-iron",
      name: "Wash & Iron",
      description: "For everyday laundry that requires ironing.",
      price_from: 7.5,
      price_type: "kg",
      slug: "wash-iron",
    },
    {
      id: "dry-cleaning",
      name: "Dry Cleaning",
      description: "For delicate items and fabrics.",
      price_from: 12.95,
      price_type: "item",
      slug: "dry-cleaning",
    },
    {
      id: "ironing",
      name: "Ironing only",
      description: "For items that are already clean.",
      price_from: 3.95,
      price_type: "item",
      slug: "ironing",
    },
    {
      id: "duvets",
      name: "Duvets & Bulky Items",
      description: "For larger items that require extra care.",
      price_from: 24.95,
      price_type: "item",
      slug: "duvets",
    },
  ];

  const displayServices =
    strapiServices?.data?.length && strapiServices?.data?.length > 0
      ? strapiServices.data
      : fallbackServices;

  const visibleServicesDesktop = showAll
    ? displayServices
    : displayServices.slice(0, 2);

  const visibleServicesMobile = displayServices;

  const countryCode = currentCountry?.toLowerCase() || "in";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <EnhancedNavbar />

      <main className="flex-grow w-full py-16 px-2 md:px-4">
        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="max-w-7xl mx-auto bg-[#1E3A8A] p-6 rounded-3xl">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">
                  Explore our services
                </h2>
                <ConnectionStatus />
              </div>
              <p className="text-lg text-white">
                Your clothes are treated with the utmost care, receiving the
                attention they deserve.
              </p>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory">
              {visibleServicesMobile.map((service) => (
                <div key={service.id} className="snap-start min-w-[320px]">
                  <ServiceCard {...service} icon={serviceIcons[service.name]} />
                </div>
              ))}
            </div>
            <p className="text-sm text-white/75 mt-4">
              Our minimum order value is {currencySymbols[countryCode]}350. All
              orders include free delivery.
            </p>
          </div>
        </div>

        {/* Desktop View */}
        <div
          className="hidden lg:flex max-w-7xl mx-auto rounded-3xl overflow-hidden"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {/* Static Left */}
          <div className="w-1/2 bg-[#1E3A8A] text-white p-16 flex flex-col">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold">Explore our services</h2>
                <ConnectionStatus />
              </div>
              <p className="text-lg mb-8 text-white">
                Your clothes are treated with the utmost care, receiving the
                attention they deserve.
              </p>
              <button className="flex items-center text-lg hover:underline">
                Explore pricing <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white mt-16">
              Our minimum order value is {currencySymbols[countryCode]}350. All
              orders include free delivery.
            </p>
          </div>

          {/* Dynamic Right */}
          <div className="w-1/2 bg-gray-50 p-16 overflow-y-auto hide-scrollbar">
            <div className="space-y-6 max-w-xl">
              {visibleServicesDesktop.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  icon={serviceIcons[service.name]}
                />
              ))}

              <div className="hidden lg:block">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-blue-600 underline text-sm mt-4"
                >
                  {showAll ? "Show less" : "Show more"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
