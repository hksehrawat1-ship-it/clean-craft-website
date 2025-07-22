import React, { useState, useCallback } from "react";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import EnhancedBlogHero from "@/components/blog/EnhancedBlogHero";
import ModernBlogFilters from "@/components/blog/ModernBlogFilters";
import ModernBlogCard from "@/components/blog/ModernBlogCard";
import ModernBlogGrid from "@/components/blog/ModernBlogGrid";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import { useBlogs } from "@/hooks/useBlog";
import { toTitleCase } from "@/lib/text-utils";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const { data: featuredRes, error: featuredError } = useBlogs({
    featured: true,
    sortBy: "publishedDate",
    sortOrder: "desc",
    pageSize: 3,
  });
  const featuredBlogs = featuredRes?.data ?? [];
  if (featuredError)
    console.error("❌ Featured blog fetch error:", featuredError);

  const { data: latestQuickRes } = useBlogs({
    featured: false,
    pageSize: 1,
  });
  const hasLatest = (latestQuickRes?.data?.length ?? 0) > 0;

  return (
    <Layout showOfferCarousel={false}>
      <EnhancedSEO
        slug="/blog"
        pageType="LocalBusiness"
        defaultTitle="Laundry & Dry Cleaning Tips, Guides & Industry Insights"
        defaultDescription="Expert tips on dry cleaning, wet cleaning, and garment care. Learn about fabric treatment, stain removal techniques, and professional laundry business insights."
        customKeywords={[
          "dry cleaning tips",
          "wet cleaning guides",
          "garment care advice",
        ]}
      />

      <div className="blog-page bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 min-h-screen">
        <BlogBreadcrumb />
        <EnhancedBlogHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mb-8 lg:mb-12">
            <ModernBlogFilters
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {!selectedCategory && featuredBlogs.length > 0 && (
            <section className="mb-12 lg:mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="heading-secondary text-white mb-2 drop-shadow-lg">
                    Featured Articles
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Our most popular and trending content
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {featuredBlogs.slice(0, 2).map((blog) => (
                  <ModernBlogCard
                    key={blog.id}
                    blog={blog}
                    variant="featured"
                  />
                ))}
              </div>

              {featuredBlogs.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredBlogs.slice(2).map((blog) => (
                    <ModernBlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </section>
          )}

          <section>
            {selectedCategory ? (
              <div className="mb-8">
                <h2 className="heading-secondary text-white mb-2 drop-shadow-lg">
                  {toTitleCase(selectedCategory)} Articles
                </h2>
                <p className="text-blue-100 text-lg">
                  Specialized content in your selected category
                </p>
              </div>
            ) : hasLatest ? (
              <div className="mb-8">
                <h2 className="heading-secondary text-white mb-2 drop-shadow-lg">
                  Latest Articles
                </h2>
                <p className="text-blue-100 text-lg">
                  Fresh insights and expert advice
                </p>
              </div>
            ) : null}

            <ModernBlogGrid
              selectedCategory={selectedCategory}
              searchQuery=""
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
