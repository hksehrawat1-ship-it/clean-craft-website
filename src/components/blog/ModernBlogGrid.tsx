import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlog";
import BlogGridControls from "./BlogGridControls";
import BlogLoadingState from "./BlogLoadingState";
import BlogEmptyState from "./BlogEmptyState";
import BlogGridContent from "./BlogGridContent";
import BlogLoadMoreButton from "./BlogLoadMoreButton";

interface ModernBlogGridProps {
  selectedCategory: string | null;
  searchQuery?: string;
  pageSize?: number;
}

const ModernBlogGrid = ({
  selectedCategory,
  searchQuery = "",
  pageSize = 9,
}: ModernBlogGridProps) => {
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const queryOptions = useMemo(
    () => ({
      category: selectedCategory || undefined,
      featured: selectedCategory || searchQuery ? undefined : false,
      search: searchQuery || undefined,
      page,
      pageSize,
    }),
    [selectedCategory, searchQuery, page, pageSize]
  );

  const {
    data: blogsResponse,
    isLoading,
    isError,
    error,
  } = useBlogs(queryOptions);

  const currentPageBlogs = blogsResponse?.data ?? [];

  // Reset page on category or search change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  // Replace or append blogs based on page
  useEffect(() => {
    if (page === 1 && currentPageBlogs.length) {
      setAllBlogs(currentPageBlogs);
    } else if (page > 1 && currentPageBlogs.length) {
      setAllBlogs((prev) => [...prev, ...currentPageBlogs]);
    }
  }, [currentPageBlogs, page]);

  const hasNextPage =
    (blogsResponse?.meta?.pagination?.page ?? 1) <
    (blogsResponse?.meta?.pagination?.pageCount ?? 1);

  const handleLoadMore = useCallback(() => setPage((p) => p + 1), []);
  const handleViewModeChange = useCallback(
    (mode: "grid" | "list") => setViewMode(mode),
    []
  );

  // Loading state for first load
  if (isLoading && page === 1) {
    return <BlogLoadingState pageSize={pageSize} />;
  }

  // Error state
  if (isError) {
    console.error("Blog grid error:", error);
    return (
      <BlogEmptyState
        selectedCategory={selectedCategory}
        isError={true}
        error={error}
      />
    );
  }

  // No blogs case
  if (!allBlogs.length) {
    return (
      <BlogEmptyState
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    );
  }

  return (
    <div className="space-y-8">
      <BlogGridControls
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        blogCount={allBlogs.length}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      <BlogGridContent blogs={allBlogs} viewMode={viewMode} />

      <BlogLoadMoreButton
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default ModernBlogGrid;
