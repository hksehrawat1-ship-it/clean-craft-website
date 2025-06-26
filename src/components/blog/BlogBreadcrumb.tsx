
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/contexts/CountryContext";

interface BlogBreadcrumbProps {
  title?: string;
  category?: string;
  showBackButton?: boolean;
}

const BlogBreadcrumb = ({ title, category, showBackButton = false }: BlogBreadcrumbProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const createLink = (path: string) => 
    currentCountry ? `/${currentCountry.toLowerCase()}${path}` : path;

  const handleGoBack = () => {
    navigate(createLink("/blog"));
  };

  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to={createLink("/")}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            
            <ChevronRight className="h-4 w-4 text-gray-400" />
            
            <Link 
              to={createLink("/blog")}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Blog
            </Link>

            {category && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">{category}</span>
              </>
            )}

            {title && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900 font-medium line-clamp-1 max-w-xs">
                  {title}
                </span>
              </>
            )}
          </nav>

          {/* Back Button */}
          {showBackButton && (
            <Button 
              onClick={handleGoBack} 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogBreadcrumb;
