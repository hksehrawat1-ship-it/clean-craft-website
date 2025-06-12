
import React from 'react';
import { useBlogCategories } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogFiltersProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const BlogFilters = ({ selectedCategory, onCategorySelect }: BlogFiltersProps) => {
  const { data: categoriesResponse, isLoading } = useBlogCategories();
  const categories = categoriesResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(category.slug)}
          className={cn(
            "flex-shrink-0 rounded-full",
            selectedCategory === category.slug && "bg-primary text-white"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default BlogFilters;
