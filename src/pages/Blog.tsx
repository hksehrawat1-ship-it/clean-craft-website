
import React, { useState } from 'react';
import Layout from '@/components/home/Layout';
import { EnhancedSEO } from '@/components/EnhancedSEO';
import BlogHero from '@/components/blog/BlogHero';
import BlogFilters from '@/components/blog/BlogFilters';
import FeaturedBlog from '@/components/blog/FeaturedBlog';
import BlogGrid from '@/components/blog/BlogGrid';
import { useBlogs } from '@/hooks/useBlog';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch featured blog
  const { data: featuredResponse } = useBlogs({
    featured: true,
    pageSize: 1
  });
  
  const featuredBlog = featuredResponse?.data[0];

  return (
    <Layout showOfferCarousel={false}>
      <EnhancedSEO 
        slug="/blog"
        pageType="LocalBusiness"
        defaultTitle="Laundry & Dry Cleaning Tips, Guides & Industry Insights"
        defaultDescription="Expert tips on dry cleaning, wet cleaning, and garment care. Learn about fabric treatment, stain removal techniques, and professional laundry business insights."
        customKeywords={['dry cleaning tips', 'wet cleaning guides', 'garment care advice']}
      />
      
      <main className="blog-page">
        <BlogHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="mb-8">
            <BlogFilters 
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          
          {/* Featured Blog */}
          {featuredBlog && !selectedCategory && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
              <FeaturedBlog blog={featuredBlog} />
            </div>
          )}
          
          {/* Blog Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory ? 'Filtered Articles' : 'Latest Articles'}
            </h2>
            <BlogGrid selectedCategory={selectedCategory} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
