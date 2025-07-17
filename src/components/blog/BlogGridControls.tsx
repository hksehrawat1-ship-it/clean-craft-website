import React from "react";
import { Grid, List } from "lucide-react";
import { formatCategoryName } from "@/lib/text-utils";

interface BlogGridControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  blogCount: number;
  selectedCategory: string | null;
  searchQuery?: string;
}

const BlogGridControls = ({
  viewMode,
  onViewModeChange,
  blogCount,
  selectedCategory,
  searchQuery,
}: BlogGridControlsProps) => {
  return (
    <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-4">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{blogCount}</span> articles
        {selectedCategory && (
          <span>
            {" "}
            in{" "}
            <span className="font-semibold">
              {formatCategoryName(selectedCategory)}
            </span>
          </span>
        )}
        {searchQuery && (
          <span>
            {" "}
            for <span className="font-semibold">"{searchQuery}"</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Native button for testing */}
        <button
          onClick={() => {
            console.log("Grid button clicked");
            onViewModeChange("grid");
          }}
          className={`p-2 rounded ${
            viewMode === "grid"
              ? "bg-blue-600 text-white"
              : "border border-gray-300"
          }`}
          style={{ touchAction: "manipulation", cursor: "pointer" }}
        >
          <Grid className="h-4 w-4" />
        </button>

        <button
          onClick={() => {
            console.log("List button clicked");
            onViewModeChange("list");
          }}
          className={`p-2 rounded ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "border border-gray-300"
          }`}
          style={{ touchAction: "manipulation", cursor: "pointer" }}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BlogGridControls;
