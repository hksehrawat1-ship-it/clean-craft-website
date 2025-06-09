
import React, { useState } from 'react';
import { useBlogs } from '@/hooks/useBlog';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface BlogGridProps {
  selectedCategory: string | null;
}

const BlogGrid = ({ selectedCategory }: BlogGridProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  
  const { 
    data: blogsResponse, 
    isLoading, 
    isError,
    error 
  } = useBlogs({
    category: selectedCategory || undefined,
    featured: false, // Exclude featured posts from grid
    page,
    pageSize
  });

  const blogs = blogsResponse?.data || [];
  const hasNextPage = blogsResponse?.meta?.pagination?.page && blogsResponse?.meta?.pagination?.pageCount 
    ? blogsResponse.meta.pagination.page < blogsResponse.meta.pagination.pageCount 
    : false;

  if (isLoading && page === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'Failed to load blogs. Please try again later.'}
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {selectedCategory 
            ? `No blogs found in this category.` 
            : 'No blogs available at the moment.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setPage(prev => prev + 1)}
            disabled={isLoading}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
