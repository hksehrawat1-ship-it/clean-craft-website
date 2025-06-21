
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Fragment,
} from "react";
import { useBlogs } from "@/hooks/useBlog";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle } from "lucide-react";

interface BlogGridProps {
  selectedCategory: string | null;
  pageSize?: number;
}

const BlogGrid = ({ selectedCategory, pageSize = 9 }: BlogGridProps) => {
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);

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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {Array.from({ length: Math.min(6, pageSize) }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/10] w-full rounded-lg" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
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
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Unable to load blogs
        </h3>
        <p className="text-gray-600 mb-4">
          {error instanceof Error
            ? error.message
            : "Failed to load blogs. Please try again later."}
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // No blogs case
  if (!allBlogs.length) {
    if (selectedCategory) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600">
            No blogs found in this category. Try selecting a different category.
          </p>
        </div>
      );
    }
    return <Fragment />;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {allBlogs.map((blog) => (
          <BlogCard 
            key={`${blog.id}-${blog.slug}`} 
            blog={blog} 
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="min-w-32 bg-white hover:bg-gray-50 border-gray-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
