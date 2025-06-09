
import React from 'react';
import { StrapiBlog } from '@/types/strapi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import { cn } from '@/lib/utils';

interface FeaturedBlogProps {
  blog: StrapiBlog;
}

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  
  const handleClick = () => {
    navigate(`/${currentCountry?.toLowerCase()}/blog/${blog.slug}`);
  };

  // Extract text from rich text content
  const getPlainText = (richText: string) => {
    if (!richText) return '';
    // Simple extraction - in production you might want to use a proper HTML parser
    return richText.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="md:flex">
        {blog.image && (
          <div className="md:w-1/2">
            <img
              src={blog.image.url}
              alt={blog.image.alternativeText || blog.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
        )}
        <CardContent className={cn("p-6", blog.image ? "md:w-1/2" : "w-full")}>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Featured
            </Badge>
            {blog.blog_category && (
              <Badge variant="outline">
                {blog.blog_category.name}
              </Badge>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
            {blog.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {getPlainText(blog.content)}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(blog.publishedDate), 'MMM dd, yyyy')}</span>
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
  );
};

export default FeaturedBlog;
