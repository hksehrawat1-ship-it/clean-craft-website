
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
    },
    {
      question: "Will I get hands-on practice during the training?",
      answer: "Yes, our program includes 6 dedicated practical sessions where you will get hands-on experience with professional laundry equipment. You'll also work on real customer clothes in a live store setting."
    },
    {
      question: "Do you provide job placement after the training?",
      answer: "We offer job assistance to top performers in the training program. We have partnerships with Clean Craft stores and other laundry businesses across India where we can help place qualified candidates."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our laundry training program
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-gray-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
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
