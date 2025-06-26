
import React from "react";
import ModernBlogCard from "./ModernBlogCard";
import { StrapiBlog } from "@/types/strapi";

interface BlogGridContentProps {
  blogs: StrapiBlog[];
  viewMode: "grid" | "list";
}

const BlogGridContent = ({ blogs, viewMode }: BlogGridContentProps) => {
  return (
    <div className={`grid gap-6 lg:gap-8 ${
      viewMode === "grid" 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1"
    }`}>
      {blogs.map((blog) => (
        <ModernBlogCard 
          key={`${blog.id}-${blog.slug}`} 
          blog={blog}
          variant={viewMode === "list" ? "compact" : "default"}
        />
      ))}
    </div>
  );
};

export default BlogGridContent;
