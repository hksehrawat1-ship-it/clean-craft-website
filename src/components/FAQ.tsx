
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the total fee for this training program?",
      answer: "The total fee for the training program is ₹500 for registration, which secures your spot in the batch. The remaining amount will be collected on the first day of the training. The complete fee includes all learning materials, practical sessions, and certification."
    },
    {
      question: "Do I need prior experience in laundry services?",
      answer: "No, our training program is designed for beginners with no prior experience. We start from the basics and gradually cover advanced topics to ensure everyone can follow along."
    },
    {
      question: "Is understanding Hindi mandatory?",
      answer: "Yes, understanding Hindi is mandatory for this training program as all instructors teach in Hindi. The course materials are provided in both Hindi and English, but classroom instruction is primarily in Hindi."
    },
    {
      question: "Can I start my own laundry business after this training?",
      answer: "Absolutely! This training program is specifically designed to equip you with all the necessary skills and knowledge to start and run your own successful laundry business. We also include a business setup module and provide post-training consultation."
    },
    {
      question: "What if I need to change my batch date after registering?",
      answer: "We understand that circumstances may change. You can request a batch change at least 7 days before your scheduled batch date. Please contact our support team to make arrangements."
    }
  ];

  return (
    <section id="faq" className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Find answers to common questions about our laundry training program
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left font-medium text-gray-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600 text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Still have questions? Contact us at{" "}
              <a href="mailto:hello@cleancraftapp.com" className="text-primary hover:underline">
                hello@cleancraftapp.com
              </a>{" "}
              or call{" "}
              <a href="tel:+918800771349" className="text-primary hover:underline">
                +91 88-00-77-1349
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
