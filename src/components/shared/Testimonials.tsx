import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { contentService } from '@/lib/strapi/services/content.service';
import { StrapiTestimonial } from '@/types/strapi';
import TestimonialDisplay from './TestimonialDisplay';

interface TestimonialsProps {
  category: 'home' | 'courses' | 'book';
}

interface TestimonialResponse {
  data: StrapiTestimonial[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Testimonials: React.FC<TestimonialsProps> = ({ category }) => {
  const { countryCode } = useParams<{ countryCode: string }>();

  const { data, isLoading, error } = useQuery<TestimonialResponse>({
    queryKey: ['testimonials', category, countryCode],
    queryFn: () => contentService.getTestimonials(countryCode?.toLowerCase() || 'in', {
      category,
      sortBy: 'rating',
      sortOrder: 'desc'
    }),
    enabled: !!countryCode,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }

  if (!data?.data?.length) {
    return null;
  }

  return <TestimonialDisplay testimonials={data.data} variant={category} />;
};

export default Testimonials; 