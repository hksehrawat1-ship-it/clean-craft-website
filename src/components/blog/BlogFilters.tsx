
import React from "react";
import { useBlogCategories } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 lg:hidden">Filter by category</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-9 w-20 rounded-full flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 lg:hidden">Filter by category</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(null)}
          className={cn(
            "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
            selectedCategory === null 
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          All Posts
        </Button>

        {categories.map((cat) => {
          const attr = (cat as any).attributes ?? cat;
          const slug = attr.slug ?? attr.key ?? null;
          const name = attr.name ?? attr.title ?? null;

          if (!slug || !name) return null;

          const active = selectedCategory === slug;

          return (
            <Button
              key={cat.id}
              variant={active ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(slug)}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
                active 
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogFilters;
