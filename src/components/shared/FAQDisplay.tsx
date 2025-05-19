import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StrapiFAQ } from '@/types/strapi';

interface FAQDisplayProps {
  faqs: StrapiFAQ[];
  variant?: 'home' | 'courses' | 'book';
}

const FAQDisplay: React.FC<FAQDisplayProps> = ({ 
  faqs,
  variant = 'home'
}) => {
  if (!faqs?.length) {
    return null;
  }

  const title = variant === 'home' ? 'Frequently Asked Questions' : 
                variant === 'courses' ? 'Course FAQs' : 
                'Book FAQs';

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Your questions, <span className="text-[#1869D3]">answered</span>
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id.toString()}
              className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 group">
                <span className="text-left text-lg font-medium text-gray-900 group-hover:text-[#1869D3]">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-600 text-base">
                {faq.answer || 'No answer provided yet.'}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQDisplay; 