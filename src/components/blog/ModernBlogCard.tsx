import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, Eye } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import {
  getStrapiImageUrl,
  getStrapiImageAlt,
} from "@/lib/strapi/utils/imageUtils";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface ModernBlogCardProps {
  blog: StrapiBlog;
  variant?: "default" | "featured" | "compact";
}

const customBlocks = {
  paragraph: ({ children }: any) => (
    <p className="mb-1 line-clamp-2 text-sm">{children}</p>
  ),
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

const getPreviewContent = (content: BlocksContent, limit = 2) => {
  if (!Array.isArray(content)) return [];
  return content.filter((block) => block.type === "paragraph").slice(0, limit);
};

const ModernBlogCard = ({ blog, variant = "default" }: ModernBlogCardProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  const getFormattedDate = () => {
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    return isNaN(date.getTime()) ? "Recently" : format(date, "MMM dd, yyyy");
  };

  const primaryImage = (blog as any).featured_image || (blog as any).image;
  const imageUrl = getStrapiImageUrl(primaryImage);
  const imageAlt = getStrapiImageAlt(primaryImage, blog.title || "Blog Image");
  const blogContentPreview = getPreviewContent(blog.content || [] as any);

  if (variant === "featured") {
    return (
      <Card
        className="group overflow-hidden cursor-pointer bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl border-0 shadow-lg"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden">
          <div className="absolute z-10 top-4 left-1/2 -translate-x-1/2 text-xs bg-white px-3 py-1 rounded-full shadow text-gray-700 font-medium">
            5 min read
          </div>

          {imageUrl && (
            <div className="aspect-[21/9] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}

          {blog.blog_category?.name && (
            <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-blue-700 border-0 px-4 py-2 text-sm font-semibold shadow-lg">
              {blog.blog_category.name}
            </Badge>
          )}

          <div className="absolute top-6 right-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              FEATURED
            </div>
          </div>
        </div>

        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{getFormattedDate()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>2.1k views</span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
            {blog.title}
          </h3>

          <div className="prose max-w-none mb-4 text-base leading-normal line-clamp-3">
            <BlocksRenderer
              content={blogContentPreview}
              blocks={customBlocks}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            {blog.author?.name && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {blog.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {blog.author.name}
                  </div>
                  <div className="text-xs text-gray-500">Expert Writer</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300 text-sm">
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group overflow-hidden cursor-pointer bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl border border-gray-200"
      onClick={handleClick}
    >
      {/* Reading Time */}
      <div className="px-4 pt-2 text-[11px] text-gray-500 font-medium">
        5 min
      </div>

      {/* Blog Image */}
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Card Content */}
      <CardContent className="px-4 py-3 flex flex-col justify-between">
        <div>
          {/* Category Badge */}
          {blog.blog_category?.name && (
            <Badge
              variant="outline"
              className="text-[10px] px-2 py-[2px] bg-blue-50 text-blue-700 border-blue-200 font-medium mb-1"
            >
              {blog.blog_category.name}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-300">
            {blog.title}
          </h3>

          {/* Content preview */}
          <div className="prose max-w-none mb-3 text-sm leading-tight line-clamp-3 text-gray-700">
            <BlocksRenderer
              content={blogContentPreview}
              blocks={customBlocks}
            />
          </div>
        </div>

        {/* Footer: Date + Author */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{getFormattedDate()}</span>
            {blog.author?.name && (
              <>
                <span>•</span>
                <User className="h-3 w-3" />
                <span>{blog.author.name}</span>
              </>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernBlogCard;
