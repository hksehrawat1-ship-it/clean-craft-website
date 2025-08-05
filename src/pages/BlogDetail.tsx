import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { useBlogBySlug } from "@/hooks/useBlog";
import { useCountry } from "@/contexts/CountryContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import {
  getStrapiImageUrl,
  getStrapiImageAlt,
} from "@/lib/strapi/utils/imageUtils";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const customRenderers = {
  paragraph: ({ children }: any) => (
    <p className="mb-6 text-gray-700">{children}</p>
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

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const [copySuccess, setCopySuccess] = useState(false);

  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug || "");

  const handleGoBack = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const getFormattedDate = () => {
    if (!blog) return null;
    const raw = blog.publishedDate || blog.createdAt || "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return null;
    return format(date, "MMMM dd, yyyy");
  };

  const imageUrl = getStrapiImageUrl((blog as any)?.featured_image);
  const imageAlt = getStrapiImageAlt((blog as any)?.featured_image, blog?.title || "");

  if (isLoading) {
    return (
      <Layout showOfferCarousel={false}>
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
          <BlogBreadcrumb />
          <div className="max-w-4xl mx-auto px-4 py-8">
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
        </div>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout showOfferCarousel={false}>
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
          <BlogBreadcrumb />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <h1 className="heading-secondary mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">
                {error instanceof Error
                  ? error.message
                  : "The article you're looking for doesn't exist or has been moved."}
              </p>
              <Button
                onClick={handleGoBack}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showOfferCarousel={false}>
      <EnhancedSEO
        slug={`/blog/${blog.slug}`}
        pageType="Organization"
        defaultTitle={blog.seo_title || blog.title}
        defaultDescription={
          blog.seo_description || `Read our latest article: ${blog.title}`
        }
        customKeywords={
          blog.seo_keywords?.split(",").map((k) => k.trim()) ?? undefined
        }
      />

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
        <BlogBreadcrumb
          title={blog.title}
          category={blog.blog_category?.name}
          showBackButton={true}
        />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gray-200" />

          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                {blog.blog_category?.name && (
                  <Badge className="bg-white/90 text-blue-700 px-4 py-2 font-semibold">
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
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>2.3K views</span>
                  </div>
                </div>
              </div>

              <h1 className="heading-primary md:text-4xl text-xl text-white mb-6 leading-tight drop-shadow-lg">
                {blog.title}
              </h1>

              {blog.author?.name && (
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-lg">
                      {blog.author.name}
                    </div>
                    <div className="text-white/80">Expert Writer</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 pb-16">
          <article className="bg-white rounded-t-3xl shadow-2xl -mt-8 relative z-10">
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Article
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem
                        onClick={handleCopyLink}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        {copySuccess ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            Link Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  onClick={handleGoBack}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </div>

              {imageUrl && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="article-content prose max-w-none">
                <BlocksRenderer
                  content={blog.content || [] as any}
                  blocks={customRenderers}
                />
              </div>

              <footer className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-gray-500">
                    <p className="mb-2">
                      Published on {getFormattedDate()}
                      {blog.author?.name && ` by ${blog.author.name}`}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        2.3K views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />5 min read
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleGoBack}
                    className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
