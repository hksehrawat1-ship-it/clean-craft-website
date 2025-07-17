import React from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/utils/imageUtils";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: BlocksContent;
  publishedDate: string;
  featured_image?: any;
  author: {
    firstname: string;
    lastname: string;
  };
};

const customRenderers = {
  paragraph: ({ children }: any) => <p className="mb-4">{children}</p>,
  link: ({ children, url }: any) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {children}
    </a>
  ),
};

const BlogCard = ({ blog }: { blog: Blog }) => {
  const imageUrl = getStrapiImageUrl(blog.featured_image) || "/fallback.jpg";
  const imageAlt = getStrapiImageAlt(blog.featured_image, blog.title);

  return (
    <div className="p-4 border rounded shadow-sm space-y-2">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-gray-500 text-sm">
        Published: {new Date(blog.publishedDate).toLocaleDateString()} by{" "}
        {blog.author.firstname} {blog.author.lastname}
      </p>

      {/* ✅ Image with fallback */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="w-full h-auto rounded-lg object-cover"
      />

      <p className="text-gray-700 italic">{blog.excerpt}</p>

      <div className="prose max-w-none">
        <BlocksRenderer content={blog.content} blocks={customRenderers} />
      </div>
    </div>
  );
};

export default BlogCard;
