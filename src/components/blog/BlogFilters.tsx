import React from "react";
import { useBlogCategories } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const BlogFilters = ({
  selectedCategory,
  onCategorySelect,
}: BlogFiltersProps) => {
  const { data, isLoading } = useBlogCategories();
  const categories = data?.data ?? [];

  /* ---------- Loader ---------- */
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-full animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* All posts */}
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategorySelect(null)}
        className={cn(
          "flex-shrink-0 rounded-full",
          selectedCategory === null && "bg-primary text-white"
        )}
      >
        All Posts
      </Button>

      {/* Each category */}
      {categories.map((cat) => {
        const attr = (cat as any).attributes ?? cat;
        const slug = attr.slug ?? attr.key ?? null;
        const name = attr.name ?? attr.title ?? null;

        if (!slug || !name) return null; // skip if missing

        const active = selectedCategory === slug;

        return (
          <Button
            key={cat.id}
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(slug)}
            className={cn(
              "flex-shrink-0 rounded-full",
              active && "bg-primary text-white"
            )}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export default BlogFilters;
