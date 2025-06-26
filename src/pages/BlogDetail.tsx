import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { useBlogBySlug } from "@/hooks/useBlog";
import { useCountry } from "@/contexts/CountryContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock, Share2, BookmarkPlus } from "lucide-react";
import { format } from "date-fns";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";

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
    
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-lg prose-blue max-w-none" />;
    }
    
    if (typeof content === 'object' && Array.isArray(content)) {
      return (
        <div className="prose prose-lg prose-blue max-w-none">
          {content.map((block: any, index: number) => {
            if (block.type === 'paragraph' && block.children) {
              return (
                <p key={index} className="mb-6 text-lg leading-relaxed text-gray-700">
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
    
    return <p className="text-gray-600">Content format not supported</p>;
  };

  const getFormattedDate = () => {
    if (!blog) return null;
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return null;
    return format(date, "MMMM dd, yyyy");
  };

  if (isLoading) {
    return (
      <Layout showOfferCarousel={false}>
        <BlogBreadcrumb />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <div className="p-8">
              <Skeleton className="h-8 w-3/4 mb-6" />
              <div className="flex gap-4 mb-8">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout showOfferCarousel={false}>
        <BlogBreadcrumb />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8 text-lg">
              {error instanceof Error ? error.message : "The article you're looking for doesn't exist or has been moved."}
            </p>
            <Button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700">
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

      <BlogBreadcrumb 
        title={blog.title}
        category={blog.blog_category?.name}
        showBackButton={true}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="relative">
            {imageUrl && (
              <div className="aspect-[21/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}

            {/* Floating Article Meta */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-4">
                {blog.blog_category?.name && (
                  <Badge className="bg-white/90 backdrop-blur-sm text-blue-700 hover:bg-white border-0 px-4 py-2 font-semibold">
                    {blog.blog_category.name}
                  </Badge>
                )}
                <div className="flex items-center gap-4 text-sm text-white/90">
                  {getFormattedDate() && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{getFormattedDate()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {blog.title}
              </h1>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 lg:p-12">
            {/* Author Info */}
            {blog.author?.name && (
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{blog.author.name}</div>
                    <div className="text-gray-500">Expert Writer</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg prose-blue max-w-none">
              {renderContent(blog.content)}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-gray-500">
                  Published on {getFormattedDate()}
                  {blog.author?.name && ` by ${blog.author.name}`}
                </div>
                <Button onClick={handleGoBack} variant="outline" className="rounded-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
