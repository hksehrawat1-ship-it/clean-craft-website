import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Copyright } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-8 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand and Description */}
        <div className="space-y-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b9620b89-debb-4cc2-bd6b-edec70fb1bed.png" 
              alt="Clean Craft Logo" 
              className="h-14 w-auto" 
            />
          </div>
          <p className="text-neutral-600 text-sm">
            We collect, clean, and deliver your laundry to your doorstep. When and where you need us, 
            we will be there. 99.9% of all standard laundry and dry cleaning is delivered the next day.
          </p>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Facebook size={20} />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Instagram size={20} />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Company Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Company</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Discover Cleancraft
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Buy Book
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Apply for Franchise
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Support</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                Refund and return policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-600">
                Plot no 9, Police enclave, Kotla Vihar Phase 4, Tilangpur Kotla, Delhi, 11004
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-600">(91) 98765 4321 54</span>
            </li>
            <li className="flex gap-3">
              <Mail className="text-blue-500 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-600">support@cleancraft.com</span>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="my-8 bg-gray-200" />
      
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm mb-4 md:mb-0">
          <Copyright size={14} className="mr-1" />
          <span>{new Date().getFullYear()}-{new Date().getFullYear() + 1} Clean Craft | All rights reserved</span>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-gray-500">
          <Link to="/policies" className="hover:text-blue-500">All Policies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
