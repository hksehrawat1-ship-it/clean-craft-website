
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BlogLoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

const BlogLoadMoreButton = ({ onLoadMore, isLoading, hasNextPage }: BlogLoadMoreButtonProps) => {
  if (!hasNextPage) return null;

  return (
    <div className="text-center pt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        disabled={isLoading}
        className="min-w-48 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-3 animate-spin" />
            Loading More...
          </>
        ) : (
          <>
            Load More Articles
            <div className="ml-3 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          </>
        )}
      </Button>
    </div>
  );
};

export default BlogLoadMoreButton;
