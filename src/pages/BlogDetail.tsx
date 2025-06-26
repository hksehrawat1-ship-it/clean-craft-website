
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { useBlogBySlug } from "@/hooks/useBlog";
import { useCountry } from "@/contexts/CountryContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock, Share2, Eye, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/strapi/utils/imageUtils";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const [copySuccess, setCopySuccess] = useState(false);
  
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug || '');

  const handleGoBack = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const renderContent = (content: any) => {
    if (!content) return "";
    
    if (typeof content === 'string') {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          className="prose prose-lg prose-blue max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-gray-700 prose-strong:text-gray-900"
        />
      );
    }
    
    if (typeof content === 'object' && Array.isArray(content)) {
      return (
        <div className="space-y-6">
          {content.map((block: any, index: number) => {
            if (block.type === 'paragraph' && block.children) {
              return (
                <p key={index} className="text-lg leading-relaxed text-gray-700 mb-6">
                  {block.children.map((child: any, childIndex: number) => (
                    <span key={childIndex} className={child.bold ? 'font-semibold text-gray-900' : ''}>
                      {child.text || ""}
                    </span>
                  ))}
                </p>
              );
            }
            if (block.type === 'heading' && block.children) {
              const level = block.level || 2;
              const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
              const headingClasses = {
                1: 'text-4xl font-bold text-gray-900 mb-6 mt-8',
                2: 'text-3xl font-bold text-gray-900 mb-4 mt-8',
                3: 'text-2xl font-semibold text-gray-900 mb-4 mt-6',
                4: 'text-xl font-semibold text-gray-900 mb-3 mt-6',
                5: 'text-lg font-semibold text-gray-900 mb-3 mt-4',
                6: 'text-base font-semibold text-gray-900 mb-2 mt-4'
              };
              
              return (
                <HeadingTag key={index} className={headingClasses[level as keyof typeof headingClasses]}>
                  {block.children.map((child: any, childIndex: number) => (
                    <span key={childIndex}>{child.text || ""}</span>
                  ))}
                </HeadingTag>
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
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
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
        </div>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout showOfferCarousel={false}>
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
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

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
        <BlogBreadcrumb 
          title={blog.title}
          category={blog.blog_category?.name}
          showBackButton={true}
        />

        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden">
          {/* Background Image */}
          {imageUrl && (
            <div className="absolute inset-0">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
            </div>
          )}

          {/* Background Pattern for non-image articles */}
          {!imageUrl && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>
          )}

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center md:text-left">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
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
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>2.3K views</span>
                  </div>
                </div>
              </div>

              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {blog.title}
              </h1>

              {/* Author Info */}
              {blog.author?.name && (
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-lg">{blog.author.name}</div>
                    <div className="text-white/80">Expert Writer</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <article className="bg-white rounded-t-3xl shadow-2xl -mt-8 relative z-10">
            <div className="p-8 lg:p-12">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Article
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
                      <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer hover:bg-gray-50">
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
                      <DropdownMenuItem onClick={handleShareFacebook} className="cursor-pointer hover:bg-gray-50">
                        <svg className="h-4 w-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareTwitter} className="cursor-pointer hover:bg-gray-50">
                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Share on Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareLinkedIn} className="cursor-pointer hover:bg-gray-50">
                        <svg className="h-4 w-4 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Share on LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button onClick={handleGoBack} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </div>

              {/* Article Body */}
              <div className="article-content">
                {renderContent(blog.content)}
              </div>

              {/* Article Footer */}
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
                        <Clock className="h-4 w-4" />
                        5 min read
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </Button>
                  </div>
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
