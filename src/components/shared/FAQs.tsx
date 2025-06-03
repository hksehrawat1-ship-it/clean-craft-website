import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { contentService } from '@/lib/strapi/services/content.service';
import { StrapiFAQ } from '@/types/strapi';
import FAQDisplay from './FAQDisplay';

interface FAQsProps {
  category: 'home' | 'courses' | 'book';
}

interface FAQResponse {
  data: StrapiFAQ[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const FAQs: React.FC<FAQsProps> = ({ category }) => {
  const { countryCode } = useParams<{ countryCode: string }>();

  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ['faqs', category, countryCode],
    queryFn: () => contentService.getFAQs(countryCode?.toLowerCase() || 'in', {
      category,
      sortBy: 'order',
      sortOrder: 'asc'
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
    console.error('Error fetching FAQs:', error);
    return null;
  }

  // Filter out FAQs with null answers in production
  const validFaqs = process.env.NODE_ENV === 'production' 
    ? data?.data?.filter(faq => faq.answer !== null)
    : data?.data;

  if (!validFaqs?.length) {
    return null;
  }

  return <FAQDisplay faqs={validFaqs} variant={category} />;
};

export default FAQs; 