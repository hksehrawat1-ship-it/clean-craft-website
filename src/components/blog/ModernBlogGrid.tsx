
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlog";
import ModernBlogCard from "./ModernBlogCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle, Grid, List } from "lucide-react";

interface ModernBlogGridProps {
  selectedCategory: string | null;
  pageSize?: number;
}

const ModernBlogGrid = ({ selectedCategory, pageSize = 9 }: ModernBlogGridProps) => {
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const queryOptions = useMemo(
    () => ({
      category: selectedCategory || undefined,
      featured: selectedCategory ? undefined : false,
      page,
      pageSize,
    }),
    [selectedCategory, page, pageSize]
  );

  const {
    data: blogsResponse,
    isLoading,
    isError,
    error,
  } = useBlogs(queryOptions);

  const currentPageBlogs = blogsResponse?.data ?? [];

  useEffect(() => {
    if (currentPageBlogs.length) {
      setAllBlogs((prev) =>
        page === 1 ? currentPageBlogs : [...prev, ...currentPageBlogs]
      );
    }
  }, [currentPageBlogs, page]);

  useEffect(() => {
    setPage(1);
    setAllBlogs([]);
  }, [selectedCategory]);

  const hasNextPage =
    (blogsResponse?.meta?.pagination?.page ?? 1) <
    (blogsResponse?.meta?.pagination?.pageCount ?? 1);

  const handleLoadMore = useCallback(() => setPage((p) => p + 1), []);

  // Loading skeleton for first load
  if (isLoading && page === 1) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: Math.min(6, pageSize) }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <Skeleton className="aspect-[16/10] w-full" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    console.error("Blog grid error:", error);
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

  // No blogs case
  if (!allBlogs.length) {
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
            <Button 
              variant="outline"
              onClick={() => setSelectedCategory && setSelectedCategory(null)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              View All Articles
            </Button>
          </div>
        </div>
      );
    }
    return <div />;
  }

  return (
    <div className="space-y-8">
      {/* View Toggle */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{allBlogs.length}</span> articles
          {selectedCategory && (
            <span> in <span className="font-semibold">{selectedCategory}</span></span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="p-2"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="p-2"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className={`grid gap-6 lg:gap-8 ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {allBlogs.map((blog, index) => (
          <ModernBlogCard 
            key={`${blog.id}-${blog.slug}`} 
            blog={blog}
            variant={viewMode === "list" ? "compact" : "default"}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
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
      )}
    </div>
  );
};

export default ModernBlogGrid;
