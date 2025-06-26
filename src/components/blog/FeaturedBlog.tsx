
import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";

interface FeaturedBlogProps {
  blog: StrapiBlog;
}

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  const getPlainText = (content: any) => {
    if (!content) return "";
    
    // Handle if content is already a string
    if (typeof content === 'string') {
      return content.replace(/<[^>]*>/g, "").substring(0, 180) + "...";
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
      return text.substring(0, 180) + (text.length > 180 ? "..." : "");
    }
    
    return "";
  };

  const getFormattedDate = () => {
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return null;
    return format(date, "MMM dd, yyyy");
  };

  const imageUrl = getStrapiImageUrl(blog.image);
  const imageAlt = getStrapiImageAlt(blog.image, blog.title);

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white group"
      onClick={handleClick}
    >
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <CardContent className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          {blog.blog_category?.name && (
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1">
              {blog.blog_category.name}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3 text-base lg:text-lg leading-relaxed">
          {getPlainText(blog.content)}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
          {getFormattedDate() && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{getFormattedDate()}</span>
            </div>
          )}
          {blog.author?.name && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedBlog;
