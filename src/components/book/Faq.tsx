import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Who is this book for?",
    answer: "This book is designed for entrepreneurs who want to start a laundry business or existing business owners looking to optimize their operations and increase profitability."
  },
  {
    question: "Is prior experience in the laundry industry needed?",
    answer: "No, the book covers everything from basics to advanced strategies, making it suitable for complete beginners as well as those with some industry experience."
  },
  {
    question: "What format will I receive the book in?",
    answer: "The book is delivered as a downloadable PDF that you can read on any device including computers, tablets, and smartphones."
  },
  {
    question: "How soon can I expect results after applying the strategies?",
    answer: "While results vary based on implementation and local market conditions, many readers report seeing significant improvements in their business within 3-6 months of applying the strategies."
  },
  {
    question: "Is the content specific to the Indian market?",
    answer: "Yes, the book is written with the Indian market in mind, addressing local challenges and opportunities. However, many principles can be applied globally."
  },
  {
    question: "Do I get any support after purchasing the book?",
    answer: "Yes, the book comes with access to our exclusive community where you can ask questions and get guidance from the author and other successful laundry business owners."
  }
];

const Faq = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about the book and its contents
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-laundry-dark hover:text-laundry-googleBlue">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions? Contact us at</p>
            <p className="text-lg font-semibold text-laundry-googleBlue">hello@cleancraftapp.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
