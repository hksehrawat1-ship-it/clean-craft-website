
import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { cn } from "@/lib/utils";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";

interface FeaturedBlogProps {
  blog: StrapiBlog;
}

const getPlainText = (richText: unknown) => {
  if (!richText) return "";
  if (typeof richText === "string")
    return (
      richText
        .replace(/<[^>]*>/g, "")
        .substring(0, 150)
        .trim() + "…"
    );

  if (Array.isArray(richText)) {
    const text = richText
      .map(
        (block: any) =>
          block.children?.map((c: any) => c.text ?? "").join("") ?? ""
      )
      .join(" ")
      .trim();
    return text.substring(0, 150) + "…";
  }
  return "";
};

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () =>
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);

  const imageUrl = getStrapiImageUrl(blog.image);
  const imageAlt = getStrapiImageAlt(blog.image, blog.title);

  return (
    <div className="w-full">
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group bg-white"
        onClick={handleClick}
      >
        <div className="flex flex-col lg:flex-row">
          {imageUrl && (
            <div className="lg:w-1/2 w-full aspect-[16/10] lg:aspect-auto lg:h-auto">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}

          <CardContent className={cn("p-6 lg:p-8", imageUrl ? "lg:w-1/2" : "w-full")}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                Featured
              </Badge>
              {blog.blog_category && (
                <Badge variant="outline" className="border-gray-300 text-gray-700">
                  {blog.blog_category.name}
                </Badge>
              )}
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {blog.title}
            </h2>

            <p className="text-gray-700 mb-4 text-sm lg:text-base line-clamp-3 leading-relaxed">
              {getPlainText(blog.content)}
            </p>

            <div className="flex items-center gap-4 lg:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(blog.publishedDate), "MMM dd, yyyy")}
                </span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blog.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedBlog;
