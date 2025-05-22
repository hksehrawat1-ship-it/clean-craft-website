import React from "react";
import { StrapiFAQ } from "@/types/strapi";
import FAQDisplay from "../shared/FAQDisplay";

interface FAQSectionProps {
  faqs: { data: StrapiFAQ[] };
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  if (!faqs?.data?.length) {
    return null;
  }

  // Filter out FAQs with null answers in production
  const validFaqs =
    process.env.NODE_ENV === "production"
      ? faqs.data.filter((faq) => faq.answer !== null)
      : faqs.data;

  if (!validFaqs.length) {
    return null;
  }

  return <FAQDisplay faqs={validFaqs} variant="home" />;
};

export default FAQSection;
