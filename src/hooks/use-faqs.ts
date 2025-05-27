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

export function useFAQs(countryCode?: string) {
  const queryParam = countryCode
    ? `&filters[country][code][$eq]=${countryCode}`
    : "";

  const API_URL = `https://inviting-gem-d91a69b7bc.strapiapp.com/api/faqs?sort=order:asc${queryParam}&populate=country`;

  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ['faqs', countryCode],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
  });

  const faqs: FAQ[] = data?.data
    .filter(faq => faq.question)
    .map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer ?? "Answer coming soon",
      category: faq.category ?? "Uncategorized",
      order: faq.order ?? 0,
    })) ?? [];

  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const categories = Object.keys(faqsByCategory).sort();

  return { faqs, faqsByCategory, categories, isLoading, error };
}
