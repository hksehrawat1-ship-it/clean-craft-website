
import { useQuery } from '@tanstack/react-query';
import { getCollection } from '@/lib/strapi/client';

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
    attributes: {
      question: string;
      answer: string | null;
      category: string | null;
      order: number | null;
    }
  }[];
  meta: any;
}

export function useFAQs() {
  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ['faqs'],
    queryFn: async () => {
      return getCollection('faqs', {
        sort: ['order:asc']
      });
    },
  });

  // Transform the data structure to match our internal format
  const faqs: FAQ[] = data?.data
    .filter(item => item.attributes.question) // question hona zaroori hai
    .map(item => ({
      id: item.id,
      question: item.attributes.question,
      answer: item.attributes.answer ?? "Answer coming soon",
      category: item.attributes.category ?? "Uncategorized",
      order: item.attributes.order ?? 0,
    })) ?? [];

  // FAQs ko category wise group karna
  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  // Categories ko alphabetically sort kar rahe hain
  const categories = Object.keys(faqsByCategory).sort();

  return { faqs, faqsByCategory, categories, isLoading, error };
}
