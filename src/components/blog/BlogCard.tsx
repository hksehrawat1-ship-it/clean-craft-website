import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";

interface BlogCardProps {
  blog: StrapiBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  const getPlainText = (richText: string) => {
    if (!richText) return "";
    return richText.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
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

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
      onClick={handleClick}
    >
      {blog.image?.url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={blog.image.url}
            alt={blog.image.alternativeText || blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <CardContent className="p-6 flex flex-col h-full">
        {blog.blog_category?.name && (
          <Badge variant="outline" className="mb-3">
            {blog.blog_category.name}
          </Badge>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {getPlainText(blog.content)}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
          {getFormattedDate() && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{getFormattedDate()}</span>
            </div>
          )}
          {blog.author?.name && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
