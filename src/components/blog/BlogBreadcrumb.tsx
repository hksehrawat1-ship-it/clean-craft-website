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

const BlogBreadcrumb = ({
  title,
  category,
  showBackButton = false,
}: BlogBreadcrumbProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const createLink = (path: string) =>
    currentCountry ? `/${currentCountry.toLowerCase()}${path}` : path;

  const handleGoBack = () => {
    navigate(createLink("/blog"));
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center relative">
          {/* 🔙 Back Button - Only visible on sm+ */}
          {showBackButton && (
            <div className="absolute left-0 hidden sm:block">
              <Button
                onClick={handleGoBack}
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </div>
          )}

          {/* 🔗 Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to={createLink("/")}
              className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-white/60" />

            <Link
              to={createLink("/blog")}
              className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
            >
              Blog
            </Link>

            {/* 🏷️ Category - hidden on mobile */}
            {category && (
              <>
                <ChevronRight className="h-4 w-4 text-white/60 hidden sm:inline" />
                <span className="text-white/80 capitalize hidden sm:inline">
                  {category}
                </span>
              </>
            )}

            {/* 📝 Title - hidden on mobile */}
            {title && (
              <>
                <ChevronRight className="h-4 w-4 text-white/60 hidden sm:inline" />
                <span className="text-white font-medium line-clamp-1 max-w-xs sm:max-w-md hidden">
                  {title}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BlogBreadcrumb;
