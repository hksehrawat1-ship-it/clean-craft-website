import { useQuery } from '@tanstack/react-query';

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
    question: string;
    answer: string | null;
    category: string | null;
    order: number | null;
  }[];
  meta: any;
}

const API_URL = 'https://inviting-gem-d91a69b7bc.strapiapp.com/api/faqs?sort=order:asc';

export function useFAQs() {
  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      return json;
    },
  });

  // Data transform kar rahe hain
  const faqs: FAQ[] = data?.data
    .filter(faq => faq.question) 
    .map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer ?? "Answer coming soon",
      category: faq.category ?? "Uncategorized",
      order: faq.order ?? 0,
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