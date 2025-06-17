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

  /* 🔹 category change handler */
  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  /* 🔸 Featured blogs */
  const { data: featuredRes, error: featuredError } = useBlogs({
    featured: true,
    sortBy: "publishedDate",
    sortOrder: "desc",
  });
  const featuredBlogs = featuredRes?.data ?? [];
  if (featuredError) console.error("Featured blog fetch error:", featuredError);

  /* 🔸 Quick check for at least one latest blog (non‑featured, all categories) */
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

      <main className="blog-page">
        <BlogHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="mb-8">
            <BlogFilters
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Featured Blogs */}
          {!selectedCategory && featuredBlogs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {featuredBlogs.slice(0, 2).map((b) => (
                  <FeaturedBlog key={b.id} blog={b.attributes ?? (b as any)} />
                ))}
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div>
            {selectedCategory ? (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Filtered Articles
              </h2>
            ) : hasLatest ? (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Latest Articles
              </h2>
            ) : null}

            <BlogGrid selectedCategory={selectedCategory} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
