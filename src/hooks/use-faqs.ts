
import { useQuery } from '@tanstack/react-query';
import { strapiClient } from '@/lib/strapi/client';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FAQResponse {
  data: {
    id: number;
    attributes: Omit<FAQ, 'id'>;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export function useFAQs() {
  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ['faqs'],
    queryFn: async () => {
      const response = await strapiClient.get('/api/faqs', {
        params: {
          sort: ['category:asc', 'order:asc'],
          populate: '*'
        }
      });
      return response.data;
    }
  });

  const faqs = data?.data.map(item => ({
    id: item.id,
    ...item.attributes
  })) ?? [];

  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  // Extract unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category))).sort();

  return {
    faqs,
    faqsByCategory,
    categories,
    isLoading,
    error
  };
} 
