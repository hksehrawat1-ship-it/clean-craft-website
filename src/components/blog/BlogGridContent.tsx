import React from "react";
import ModernBlogCard from "./ModernBlogCard";
import { StrapiBlog } from "@/types/strapi";

interface BlogGridContentProps {
  blogs: StrapiBlog[];
  viewMode: "grid" | "list";
}

const BlogGridContent = ({ blogs, viewMode }: BlogGridContentProps) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          : "flex flex-col space-y-4"
      }
    >
      {blogs.map((blog) => (
        <ModernBlogCard key={blog.id} blog={blog} variant="default" />
      ))}
    </div>
  );
};

export default BlogGridContent;
