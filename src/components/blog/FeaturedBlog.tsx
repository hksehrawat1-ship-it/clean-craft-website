import React from "react";
import { StrapiBlog } from "@/types/strapi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { cn } from "@/lib/utils";

interface FeaturedBlogProps {
  blog: StrapiBlog;
}

const getPlainText = (richText: unknown) => {
  if (!richText) return "";
  if (typeof richText === "string")
    return (
      richText
        .replace(/<[^>]*>/g, "")
        .substring(0, 200)
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
    return text.substring(0, 200) + "…";
  }
  return "";
};

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const handleClick = () =>
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);

  const imgObj: any = React.useMemo(() => {
    if (!blog.image) return null;
    if (Array.isArray(blog.image)) return blog.image[0];
    return (blog.image as any)?.data?.attributes ?? blog.image;
  }, [blog.image]);

  const imgUrl =
    imgObj?.url &&
    (imgObj.url.startsWith("http")
      ? imgObj.url
      : `${import.meta.env.VITE_STRAPI_URL?.replace("/api", "") ?? ""}${
          imgObj.url
        }`);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        onClick={handleClick}
      >
        <div className="flex flex-col md:flex-row">
          {imgUrl && (
            <div className="md:w-1/2 w-full aspect-video md:aspect-auto md:h-auto">
              <img
                src={imgUrl}
                alt={imgObj?.alternativeText || blog.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <CardContent className={cn("p-8", imgUrl ? "md:w-1/2" : "w-full")}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Featured
              </Badge>
              {blog.blog_category && (
                <Badge variant="outline">{blog.blog_category.name}</Badge>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              {blog.title}
            </h2>

            <p className="text-gray-700 mb-4 text-base line-clamp-3">
              {getPlainText(blog.content)}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
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
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedBlog;
