
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
      // Fix: Using the collection API instead of the non-existent request method
      const response = await strapiClient.collection('faqs').find({
        sort: ['category:asc', 'order:asc'],
        populate: '*'
      });
      return response as FAQResponse;
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
