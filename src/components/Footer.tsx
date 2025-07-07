import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Copyright,
  Youtube,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCountry } from "@/contexts/CountryContext";
import CountrySelector from "@/components/CountrySelector";

const Footer: React.FC = () => {
  const { currentCountry } = useCountry();

  const createLink = (path: string): string => {
    if (!currentCountry) return "/";
    return `/${currentCountry.toLowerCase()}${path}`;
  };

  return (
    <footer className="bg-white py-12 px-8 md:px-16 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand and Description */}
        <div className="space-y-2">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/cleancraft-full-logo.png"
              alt="CleanCraft Laundry and Dry Cleaning Logo"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-neutral-600 text-sm">
            We collect, clean, and deliver your laundry and dry cleaning to your
            doorstep. When and where you need us, we will be there.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.youtube.com/@thecleancraft"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all duration-200 flex justify-center items-center text-center"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.instagram.com/clean.craft?igsh=MWxxYTYzdnZtZ2ludA=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-100 transition-all duration-200 flex justify-center text-center items-center"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/share/1CJKTFbd2S/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 flex justify-center text-center items-center rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-100 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-sehrawat-3b1227319/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 flex justify-center items-center text-center rounded-full text-gray-500 hover:text-blue-700 hover:bg-blue-100 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Company</h3>
          <ul className="space-y-4">
            <li style={{ textDecoration: "none" }}>
              <Link
                to={createLink("/discover-cleancraft")}
                style={{ textDecoration: "none" }}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Discover Clean Craft
              </Link>
            </li>
            <li>
              <Link
                to={createLink("/learning/laundry-training-book")}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Buy Laundry Book
              </Link>
            </li>
            <li>
              <Link
                to={createLink("/laundry-franchise")}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Open My Store
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Support</h3>
          <ul className="space-y-4">
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to={createLink("/blog")}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to={createLink("/faq")}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to={createLink("/policies")}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                All Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-600">
                Plot NO. 9 & Police enclave, Kotla Vihar Phase 4, Tilangpur
                Kotla, Delhi, 110043
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <a
                href="tel:+918800771349"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                (+91) 88-00-77-1349
              </a>
            </li>

            <li className="flex gap-3">
              <Mail className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <a
                href="mailto:hello@cleancraftapp.com"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                hello@cleancraftapp.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="my-8 bg-gray-200" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center text-gray-500 text-sm">
          <Copyright size={14} className="mr-1" />
          <span>
            {new Date().getFullYear()}-{new Date().getFullYear() + 1} Clean
            Craft | All rights reserved
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to={createLink("/policies")}
            className="inline-flex h-8 items-center text-sm text-gray-500
             hover:text-blue-500 transition-colors"
          >
            All Policies
          </Link>
          <CountrySelector />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
