
import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, Eye } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";

interface ModernBlogCardProps {
  blog: StrapiBlog;
  variant?: "default" | "featured" | "compact";
}

const ModernBlogCard = ({ blog, variant = "default" }: ModernBlogCardProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  const getPlainText = (content: any) => {
    if (!content) return "";
    
    if (typeof content === 'string') {
      return content.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
    }
    
    if (typeof content === 'object' && Array.isArray(content)) {
      const text = content.map(block => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      }).join(" ");
      
      return text.substring(0, 150) + (text.length > 150 ? "..." : "");
    }
    
    return "";
  };

  const getFormattedDate = () => {
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return "Recently";
    return format(date, "MMM dd, yyyy");
  };

  const imageUrl = getStrapiImageUrl(blog.image);
  const imageAlt = getStrapiImageAlt(blog.image, blog.title);

  if (variant === "featured") {
    return (
      <Card
        className="group overflow-hidden cursor-pointer bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl border-0 shadow-lg"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden">
          {imageUrl && (
            <div className="aspect-[21/9] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
          
          {/* Floating Category Badge */}
          {blog.blog_category?.name && (
            <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-blue-700 hover:bg-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
              {blog.blog_category.name}
            </Badge>
          )}
          
          {/* Featured Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              FEATURED
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{getFormattedDate()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>2.1k views</span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {blog.title}
          </h3>

          <p className="text-gray-600 mb-8 line-clamp-3 text-lg leading-relaxed">
            {getPlainText(blog.content)}
          </p>

          <div className="flex items-center justify-between">
            {blog.author?.name && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {blog.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{blog.author.name}</div>
                  <div className="text-sm text-gray-500">Expert Writer</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
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
      className="group overflow-hidden cursor-pointer bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full rounded-xl border-0 shadow-md"
      onClick={handleClick}
    >
      {imageUrl && (
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          {blog.blog_category?.name && (
            <Badge 
              variant="outline" 
              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 font-medium"
            >
              {blog.blog_category.name}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>5 min</span>
          </div>
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3 text-sm lg:text-base leading-relaxed flex-grow">
          {getPlainText(blog.content)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 text-xs text-gray-500">
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
