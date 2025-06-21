
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { useBlogBySlug } from "@/hooks/useBlog";
import { useCountry } from "@/contexts/CountryContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug || '');

  const handleGoBack = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog`);
  };

  const renderContent = (content: any) => {
    if (!content) return "";
    
    // Handle if content is already a string (HTML)
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-lg max-w-none" />;
    }
    
    // Handle JSON content from Strapi rich text
    if (typeof content === 'object' && Array.isArray(content)) {
      return (
        <div className="prose prose-lg max-w-none">
          {content.map((block: any, index: number) => {
            if (block.type === 'paragraph' && block.children) {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {block.children.map((child: any, childIndex: number) => (
                    <span key={childIndex}>{child.text || ""}</span>
                  ))}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    
    return <p>Content format not supported</p>;
  };

  const getFormattedDate = () => {
    if (!blog) return null;
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return null;
    return format(date, "MMMM dd, yyyy");
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout showOfferCarousel={false}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (isError || !blog) {
    return (
      <Layout showOfferCarousel={false}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error instanceof Error ? error.message : "The blog post you're looking for doesn't exist or has been moved."}
            </p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const imageUrl = getStrapiImageUrl(blog.image);
  const imageAlt = getStrapiImageAlt(blog.image, blog.title);

  return (
    <Layout showOfferCarousel={false}>
      <EnhancedSEO
        slug={`/blog/${blog.slug}`}
        pageType="Organization"
        defaultTitle={blog.seo_title || blog.title}
        defaultDescription={blog.seo_description || `Read our latest article: ${blog.title}`}
        customKeywords={blog.seo_keywords ? blog.seo_keywords.split(',').map(k => k.trim()) : undefined}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={handleGoBack}
                  className="cursor-pointer"
                >
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Back Button */}
        <Button 
          onClick={handleGoBack} 
          variant="ghost" 
          className="mb-6 p-0 h-auto font-normal text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {blog.blog_category?.name && (
              <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                {blog.blog_category.name}
              </Badge>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
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
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {imageUrl && (
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 mb-8">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none">
          {renderContent(blog.content)}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Published on {getFormattedDate()}
              {blog.author?.name && ` by ${blog.author.name}`}
            </div>
            <Button onClick={handleGoBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </footer>
      </article>
    </Layout>
  );
};

export default BlogDetail;
