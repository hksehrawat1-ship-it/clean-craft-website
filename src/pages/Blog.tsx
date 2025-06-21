
import React, { useState, useCallback } from "react";
import Layout from "@/components/home/Layout";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import BlogHero from "@/components/blog/BlogHero";
import BlogFilters from "@/components/blog/BlogFilters";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import BlogGrid from "@/components/blog/BlogGrid";
import { useBlogs } from "@/hooks/useBlog";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const { data: featuredRes, error: featuredError } = useBlogs({
    featured: true,
    sortBy: "publishedDate",
    sortOrder: "desc",
  });
  const featuredBlogs = featuredRes?.data ?? [];
  if (featuredError) console.error("Featured blog fetch error:", featuredError);

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

      <main className="blog-page min-h-screen bg-gray-50">
        <BlogHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mb-6 lg:mb-8">
            <BlogFilters
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {!selectedCategory && featuredBlogs.length > 0 && (
            <section className="mb-8 lg:mb-12">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {featuredBlogs.slice(0, 2).map((blog) => (
                  <FeaturedBlog key={blog.id} blog={blog} />
                ))}
              </div>
            </section>
          )}

          <section>
            {selectedCategory ? (
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Filtered Articles
              </h2>
            ) : hasLatest ? (
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Latest Articles
              </h2>
            ) : null}

            <BlogGrid selectedCategory={selectedCategory} />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
