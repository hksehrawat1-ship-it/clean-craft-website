import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StrapiFAQ } from "@/types/strapi";
import { Helmet } from "react-helmet"; // ✅ Updated here

interface FAQDisplayProps {
  faqs: StrapiFAQ[];
  variant?: "home" | "courses" | "book";
}

const FAQDisplay: React.FC<FAQDisplayProps> = ({ faqs, variant = "home" }) => {
  if (!faqs?.length) return null;

  const title =
    variant === "home"
      ? "Frequently Asked Questions"
      : variant === "courses"
      ? "Course FAQs"
      : "Book FAQs";

  const getAnswerText = (answer: any): string => {
    if (typeof answer === "string") return answer;

    if (Array.isArray(answer)) {
      return answer
        .map((block) =>
          block?.children?.map((child: any) => child.text).join(" ")
        )
        .join("\n");
    }

    return "No answer provided yet.";
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: getAnswerText(faq.answer),
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="w-full py-0 mx:py-10 px-2 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-black text-center mb-8">
            FAQs- Your Questions{" "}
            <span className="text-[#1869D3]">Answered</span>
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id.toString()}
                className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 group">
                  <span className="text-left md:text-lg text-sm font-medium text-gray-900 group-hover:text-[#1869D3]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 text-base">
                  {getAnswerText(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FAQDisplay;
