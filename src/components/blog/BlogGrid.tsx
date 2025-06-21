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
import { Loader2 } from "lucide-react";

interface BlogGridProps {
  selectedCategory: string | null;
  pageSize?: number;
}

const BlogGrid = ({ selectedCategory, pageSize = 9 }: BlogGridProps) => {
  const [page, setPage] = useState(1);

  /* aggregated list */
  const [allBlogs, setAllBlogs] = useState<any[]>([]);

  /* 👇 featured=false सिर्फ तब, जब कोई category नहीं चुनी */
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

  /* blogs for current page */
  const currentPageBlogs = blogsResponse?.data ?? [];

  /* aggregate pages into allBlogs */
  useEffect(() => {
    if (currentPageBlogs.length) {
      setAllBlogs((prev) =>
        page === 1 ? currentPageBlogs : [...prev, ...currentPageBlogs]
      );
    }
  }, [currentPageBlogs, page]);

  /* reset when category changes */
  useEffect(() => {
    setPage(1);
    setAllBlogs([]);
  }, [selectedCategory]);

  const hasNextPage =
    (blogsResponse?.meta?.pagination?.page ?? 1) <
    (blogsResponse?.meta?.pagination?.pageCount ?? 1);

  const handleLoadMore = useCallback(() => setPage((p) => p + 1), []);

  /* ---------- UI ---------- */
  if (isLoading && page === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: Math.min(6, pageSize) }).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    console.error("Blog grid error:", error);
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {error instanceof Error
            ? error.message
            : "Failed to load blogs. Please try again later."}
        </p>
      </div>
    );
  }

  /* 🛑 No blogs case */
  if (!allBlogs.length) {
    /* category selected → show “no blogs in category” */
    if (selectedCategory) {
      return (
        <div className="text-center py-12 text-gray-600">
          No blogs found in this category.
        </div>
      );
    }
    /* default latest view → render nothing */
    return <Fragment />; // nothing
  }

  /* ✅ blogs exist */
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={{ id: blog.id, ...blog.attributes }} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
