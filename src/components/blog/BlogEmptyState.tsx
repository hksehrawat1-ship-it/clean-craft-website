
import React from "react";
import { AlertCircle, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogEmptyStateProps {
  selectedCategory: string | null;
  isError?: boolean;
  error?: Error | null;
}

const BlogEmptyState = ({ selectedCategory, isError = false, error = null }: BlogEmptyStateProps) => {
  if (isError) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Unable to load articles
          </h3>
          <p className="text-gray-600 mb-6">
            {error instanceof Error
              ? error.message
              : "We're having trouble loading the blog articles. Please try again."}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Grid className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            No articles found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any articles in this category. Try selecting a different category or browse all articles.
          </p>
        </div>
      </div>
    );
  }

  return <div />;
};

export default BlogEmptyState;
