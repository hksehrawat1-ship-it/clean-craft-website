import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStrapiFAQs } from "@/hooks/useStrapi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Fallback FAQs for when no FAQs are available
const fallbackFAQs = [
  {
    id: 1,
    attributes: {
      question: "Do you wash my clothes together with other people's clothes?",
      answer: "Absolutely not. Each order is washed separately so no need to worry about that. Your clothes are safe with us!",
      category: "general",
      order: 1
    }
  },
  {
    id: 2,
    attributes: {
      question: "How long does it take to get my clothes back?",
      answer: "Our standard turnaround time is 24-48 hours, depending on your location and the volume of orders. We also offer express services for urgent requirements at a small additional cost.",
      category: "general",
      order: 2
    }
  },
  {
    id: 3,
    attributes: {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI payments, mobile wallets, and cash on delivery for your convenience.",
      category: "general",
      order: 3
    }
  }
];

const FAQSection: React.FC = () => {
  const { data: faqs, isLoading } = useStrapiFAQs('general');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  // Use fallback FAQs if no FAQs are available
  const displayFAQs = faqs?.length > 0 ? faqs : fallbackFAQs;

  return (
    <section className="py-20 px-8 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-blue-500 pattern-dots pattern-bg-white pattern-size-4 pattern-opacity-20"></div>
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Your questions, answered</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {displayFAQs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={`item-${faq.id}`}
              className="border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <AccordionTrigger className="px-6 py-4 text-blue-600 hover:no-underline text-lg font-medium">
                {faq.attributes.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-neutral-700">
                {faq.attributes.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center mt-10">
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50 rounded-full px-6"
          >
            See All FAQ's
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
