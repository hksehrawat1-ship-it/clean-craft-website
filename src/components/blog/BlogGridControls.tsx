
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

interface BlogGridControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  blogCount: number;
  selectedCategory: string | null;
}

const BlogGridControls = ({ 
  viewMode, 
  onViewModeChange, 
  blogCount, 
  selectedCategory 
}: BlogGridControlsProps) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{blogCount}</span> articles
        {selectedCategory && (
          <span> in <span className="font-semibold">{selectedCategory}</span></span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className="p-2"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="p-2"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BlogGridControls;
