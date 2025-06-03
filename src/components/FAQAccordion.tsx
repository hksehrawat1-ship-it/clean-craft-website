import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FAQAccordionProps {
  faqs?: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No FAQs available.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={`faq-${faq.id}`}
          className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm data-[state=open]:shadow-md transition-shadow"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 group">
            <span className="text-left text-lg font-medium text-gray-900 group-hover:text-[#1869D3]">
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="px-6 py-4 text-gray-600 text-base"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
