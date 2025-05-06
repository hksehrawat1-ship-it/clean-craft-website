import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/policies" className="flex items-center text-google-blue hover:text-google-blue-dark">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to policies
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-google-blue-dark mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
          <Separator className="my-4" />
          <div className="prose max-w-none">
            {children}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              For any query: <a href="mailto:Hello@cleanraftapp.com" className="text-google-blue hover:underline">
                Hello@cleanraftapp.com
              </a>
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Clean Craft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PolicyLayout;
