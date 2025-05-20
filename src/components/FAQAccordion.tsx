import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQs } from "@/hooks/use-faqs";
import { Loader2 } from "lucide-react";

export function FAQAccordion() {
  const { faqsByCategory, isLoading, error } = useFAQs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load FAQs. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(faqsByCategory).map(([category, faqs]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize">{category}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
