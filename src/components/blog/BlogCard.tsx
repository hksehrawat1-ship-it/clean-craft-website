
import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";

interface BlogCardProps {
  blog: StrapiBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  const getPlainText = (content: any) => {
    if (!content) return "";
    
    // Handle if content is already a string
    if (typeof content === 'string') {
      return content.replace(/<[^>]*>/g, "").substring(0, 120) + "...";
    }
    
    // Handle JSON content from Strapi rich text
    if (typeof content === 'object') {
      // Extract text from rich text JSON structure
      const extractText = (blocks: any[]): string => {
        if (!Array.isArray(blocks)) return "";
        
        return blocks.map(block => {
          if (block.type === 'paragraph' && block.children) {
            return block.children.map((child: any) => child.text || "").join("");
          }
          return "";
        }).join(" ");
      };
      
      const text = extractText(content);
      return text.substring(0, 120) + (text.length > 120 ? "..." : "");
    }
    
    return "";
  };

  const getFormattedDate = () => {
    const raw =
      blog.publishedDate ||
      (blog as any)?.createdAt ||
      (blog as any)?.updatedAt ||
      "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return null;
    return format(date, "MMM dd, yyyy");
  };

  const imageUrl = getStrapiImageUrl(blog.image);
  const imageAlt = getStrapiImageAlt(blog.image, blog.title);

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full group bg-white"
      onClick={handleClick}
    >
      {imageUrl && (
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <CardContent className="p-4 lg:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          {blog.blog_category?.name && (
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
            >
              {blog.blog_category.name}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>5 min read</span>
          </div>
        </div>

        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm lg:text-base leading-relaxed flex-grow">
          {getPlainText(blog.content)}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          {getFormattedDate() && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{getFormattedDate()}</span>
            </div>
          )}
          {blog.author?.name && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{blog.author.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
