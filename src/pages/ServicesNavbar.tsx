import React, { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCountry } from "@/contexts/CountryContext";
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
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { useNavigate } from "react-router-dom";

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
}) => {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";
  const currencySymbol = currentCountry
    ? currencySymbols[countryCode] || "$"
    : "$";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={CleanCraftIcon}
            alt="CleanCraft"
            className="w-7 h-7 object-contain rounded-full"
          />
          <h3 className="text-lg font-semibold ml-2">{name}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-gray-600 mb-4 min-h-[48px]">{description}</p>
      <div>
        <span className="text-sm text-gray-500">From</span>
        <div className="text-lg font-semibold">
          {currencySymbol}
          {price_from}/{price_type}
        </div>
      </div>
    </div>
  );
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

const serviceIcons: Record<string, IconType> = {
  Wash: FaSoap,
  "Wash & Iron": FaTshirt,
  "Dry Cleaning": FaRegSnowflake,
  "Ironing only": FaBroom,
  "Duvets & Bulky Items": FaBoxOpen,
  "Wash, Dry & Fold": FaTshirt,
};

const fallbackServices = [
  {
    id: "wash-dry-fold",
    name: "Wash, Dry & Fold",
    description: "Perfect for everyday clothes, bedding, and towels.",
    price_from: 6.5,
    price_type: "",
    slug: "wash-dry-fold",
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    description: "For everyday laundry that requires ironing.",
    price_from: 7.5,
    price_type: "",
    slug: "wash-iron",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "For delicate items and fabrics.",
    price_from: 12.95,
    price_type: "",
    slug: "dry-cleaning",
  },
  {
    id: "ironing",
    name: "Ironing only",
    description: "For items that are already clean.",
    price_from: 3.95,
    price_type: "",
    slug: "ironing",
  },
  {
    id: "duvets",
    name: "Duvets & Bulky Items",
    description: "For larger items that require extra care.",
    price_from: 24.95,
    price_type: "",
    slug: "duvets",
  },
];

const ServicesPage: React.FC = () => {
  const { currentCountry } = useCountry();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const createLink = (path: string) =>
    currentCountry ? `/${currentCountry.toLowerCase()}${path}` : path;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error("Error loading services:", error);
    toast.error("Failed to load services");
  }

  const displayServicesRaw =
    strapiServices?.data && strapiServices.data.length > 0
      ? strapiServices.data
      : fallbackServices;

  const displayServices = displayServicesRaw.map((service) => {
    let priceType = service.price_type?.trim();
    const slug = service.slug?.toLowerCase() || "";
    if (!priceType) {
      priceType =
        slug.includes("wash") || slug.includes("laundry") ? "kg" : "item";
    }
    return { ...service, price_type: priceType };
  });

  const visibleServicesDesktop = showAll
    ? displayServices
    : displayServices.slice(0, 2);

  const visibleServicesMobile = displayServices;
  const countryCode = currentCountry?.toLowerCase() || "in";

  return (
    <>
      <EnhancedSEO
        slug="/services"
        pageType="LocalBusiness"
        defaultTitle="Professional Dry Cleaning & Wet Cleaning Services | CleanCraft"
        defaultDescription="Comprehensive dry cleaning, wet cleaning, and garment care services. Expert fabric treatment with modern cleaning technology and eco-friendly solutions."
        customKeywords={[
          "dry cleaning services",
          "wet cleaning solutions",
          "professional garment care",
          "fabric cleaning specialists",
        ]}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />

        <main className="flex-grow w-full py-16 px-2 md:px-4">
          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="max-w-7xl mx-auto bg-[#1E3A8A] p-6 rounded-3xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Explore our services
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Wide range of laundry service with free home pickup & delivery
              </p>
              <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory">
                {visibleServicesMobile.map((service) => (
                  <div key={service.id} className="snap-start min-w-[300px]">
                    <ServiceCard
                      {...service}
                      icon={serviceIcons[service.name]}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/75 mt-4 mb-4">
                Our minimum order value is {currencySymbols[countryCode]}350.
                All orders include free delivery.
              </p>
              <button
                onClick={() => {
                  if (countryCode === "au") {
                    window.open("https://cleancloudapp.com/s3/27145", "_blank");
                  } else {
                    navigate(createLink("/book"));
                  }
                }}
                className="w-full text-center px-6 py-3 bg-white text-[#1E3A8A] font-semibold rounded-full text-sm hover:bg-gray-100 transition"
              >
                Pickup address
              </button>
            </div>
          </div>

          {/* Desktop View */}
          <div
            className="hidden lg:flex max-w-7xl mx-auto rounded-3xl overflow-hidden"
            style={{ height: "calc(100vh - 200px)" }}
          >
            {/* Left Panel */}
            <div className="w-1/2 bg-[#1E3A8A] text-white p-14 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Explore our services
                </h2>
                <p className="text-lg mb-8 text-white">
                  Wide range of laundry service with free home pickup & delivery
                </p>
                <button className="flex items-center text-lg hover:underline">
                  Explore pricing <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-white">
                  Our minimum order value is {currencySymbols[countryCode]}350.
                  All orders include free delivery.
                </p>
                <button
                  onClick={() => {
                    if (countryCode === "au") {
                      window.open(
                        "https://cleancloudapp.com/s3/27145",
                        "_blank"
                      );
                    } else {
                      navigate(createLink("/book"));
                    }
                  }}
                  className="inline-block bg-white text-[#1E3A8A] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Schedule Pickup
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 bg-gray-50 p-14 overflow-y-auto hide-scrollbar">
              <div className="space-y-4 max-w-xl">
                {visibleServicesDesktop.map((service) => (
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
