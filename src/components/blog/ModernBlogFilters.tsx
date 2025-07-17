import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogCategories } from "@/hooks/useBlog";
import { Filter, X, TrendingUp, Sparkles } from "lucide-react";
import { formatCategoryName } from "@/lib/text-utils";

interface ModernBlogFiltersProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const ModernBlogFilters = ({
  selectedCategory,
  onCategorySelect,
}: ModernBlogFiltersProps) => {
  const { data: categoriesResponse, isLoading, isError } = useBlogCategories();
  const categories = categoriesResponse?.data ?? [];

  // Popular topics list
  const popularTopics = [
    "Dry Cleaning",
    "Stain Removal",
    "Fabric Care",
    "Business Tips",
    "Eco-Friendly",
  ];

  // Helper: convert popular topic to slug (match your backend category slugs)
  const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

  if (isLoading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !categories.length) {
    return null;
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Filter className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Filter by Category</h2>
        {selectedCategory && (
          <Badge variant="secondary" className="text-xs">
            1 filter active
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* All Categories Button */}
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategorySelect(null)}
          className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
              : "border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          All Articles
        </Button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;
          const categoryName = formatCategoryName(category.name);

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() =>
                onCategorySelect(isSelected ? null : category.slug)
              }
              className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
                  : "border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {categoryName}
              {isSelected && <X className="h-4 w-4 ml-2" />}
            </Button>
          );
        })}
      </div>

      {/* Popular Topics */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            Popular Topics
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((tag) => {
            const slug = toSlug(tag);
            const isSelected = selectedCategory === slug;

            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className="text-xs px-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => onCategorySelect(isSelected ? null : slug)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernBlogFilters;
