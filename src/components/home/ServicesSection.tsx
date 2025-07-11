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
import { Link } from "react-router-dom";

interface ServiceCardProps {
  name: string;
  description: string;
  price_from: number;
  price_type: string;
  icon?: IconType;
}

const CleanCraftIcon = "/lovable-uploads/cleancraft-icon.png";

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  price_from,
  price_type,
  icon,
}) => {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";
  const currencySymbol = currentCountry
    ? currencySymbols[countryCode] || "$"
    : "$";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={CleanCraftIcon}
            alt="CleanCraft"
            className="w-7 h-7 object-contain rounded-full"
          />
          <h3 className="text-lg font-semibold ml-2">{name}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[60px]">
        {description}
      </p>
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {currencySymbol}
                {price_from}
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
  const { isConnected, isInitializing, error, retryConnection } =
    useStrapiConnection();

  React.useEffect(() => {
    if (isInitializing) {
      console.log("🔄 Strapi: Connecting to services...");
    } else if (!isConnected && error) {
      console.warn("❌ Strapi: Connection issue -", error);
    } else if (isConnected) {
      console.log("✅ Strapi: Live content loaded");
    }
  }, [isInitializing, isConnected, error]);

  if (!import.meta.env.DEV) return null;

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

  return <div className="flex items-center gap-2 text-white/75 text-sm"></div>;
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

const ServicesSection: React.FC = () => {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const [showAll, setShowAll] = useState(false);

  const countryCode = currentCountry?.toLowerCase() || "in";
  const currencySymbol = currencySymbols[countryCode] || "₹";

  const displayServices = (strapiServices?.data || []).map((service: any) => {
    const priceType =
      service.price_type || (service.slug?.includes("wash") ? "kg" : "item");
    return { ...service, price_type: priceType };
  });

  const visibleServices = showAll
    ? displayServices
    : displayServices.slice(0, 2);

  return (
    <div className="w-full px-2 md:px-4">
      <div className="lg:hidden">
        <div className=" mx-auto bg-[#1E3A8A]  rounded-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-white">
                Explore our services
              </h2>
              <ConnectionStatus />
            </div>
            <p className="text-lg text-white">
              Wide range of laundry service with free home pickup & delivery
            </p>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory">
            {displayServices.map((service: any) => (
              <div key={service.id} className="snap-start min-w-[320px]">
                <ServiceCard {...service} icon={serviceIcons[service.name]} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-white/75 mb-4">
              Our minimum order value is {currencySymbol}350. All orders include
              free delivery.
            </p>
            <Link to="/book-now">
              <button className="bg-white text-[#1E3A8A] px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-gray-100 transition">
                Schedule Pickup
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:flex max-w-7xl mx-auto rounded-3xl overflow-hidden"
        style={{ height: "calc(100vh - 260px)" }}
      >
        <div className="w-1/2 bg-[#1E3A8A] text-white px-16 ">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold">Explore our services</h2>
              <ConnectionStatus />
            </div>
            <p className="text-lg text-white">
              Wide range of laundry service with free home pickup & delivery
            </p>
            <button className="flex items-center text-lg text-white  hover:no-underline">
              Explore pricing <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-sm text-white mb-6">
              Our minimum order value is {currencySymbol}350. All orders include
              free delivery.
            </p>
            <Link to="/book-now">
              <button className="bg-white text-[#1E3A8A] px-6 py-3 rounded-full font-semibold text-base shadow-md hover:bg-gray-100 transition">
                Schedule Pickup
              </button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 bg-gray-50 p-16 overflow-y-auto hide-scrollbar">
          <div className="space-y-6 max-w-xl">
            {visibleServices.map((service: any) => (
              <ServiceCard
                key={service.id}
                {...service}
                icon={serviceIcons[service.name]}
              />
            ))}
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
  );
};

export default ServicesSection;
