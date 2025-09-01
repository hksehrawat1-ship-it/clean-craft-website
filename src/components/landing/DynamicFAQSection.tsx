import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface DynamicFAQSectionProps {
  faqs?: { data: FAQ[] };
  isLoading: boolean;
  city?: string;
  service?: string;
}

// Default FAQs in case API fails
const defaultFAQs = [
  {
    id: 1,
    question: "How does the pickup and delivery service work?",
    answer: "Simply schedule a pickup online or by phone. Our driver will arrive at your chosen time, collect your items, and return them clean within 24-48 hours. It's completely contactless and convenient.",
    category: "Service",
    order: 1
  },
  {
    id: 2,
    question: "What types of items do you clean?",
    answer: "We clean all types of garments including business attire, casual wear, formal dresses, leather items, comforters, and specialty fabrics. If you're unsure about an item, just ask!",
    category: "Service",
    order: 2
  },
  {
    id: 3,
    question: "Are your cleaning methods eco-friendly?",
    answer: "Yes! We use environmentally safe, non-toxic cleaning solvents and methods. Our process is gentle on your clothes and safe for you, your family, and the planet.",
    category: "Process",
    order: 3
  },
  {
    id: 4,
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll re-clean your items for free or provide a full refund. Your satisfaction is our priority.",
    category: "Guarantee",
    order: 4
  },
  {
    id: 5,
    question: "How much does the service cost?",
    answer: "Pricing varies by item type and service. Dry cleaning starts at $15/item, wash & fold at $12/item, and shirt laundry at $8/item. Pickup and delivery are always free!",
    category: "Pricing",
    order: 5
  },
  {
    id: 6,
    question: "Can you handle stain removal?",
    answer: "Absolutely! Our expert team specializes in stain removal for all types of stains - from food and wine to ink and grease. We'll do our best to restore your garments to like-new condition.",
    category: "Service",
    order: 6
  },
  {
    id: 7,
    question: "How do I schedule a pickup?",
    answer: "You can schedule online through our website, call us directly, or use our mobile app. Choose your preferred pickup time, and we'll send you a confirmation with tracking details.",
    category: "Booking",
    order: 7
  },
  {
    id: 8,
    question: "What areas do you serve?",
    answer: "We currently serve the metro area and surrounding neighborhoods. Enter your zip code on our website to check if we deliver to your location. We're expanding coverage regularly!",
    category: "Service Area",
    order: 8
  }
];

export default function DynamicFAQSection({ 
  faqs, 
  isLoading, 
  city, 
  service 
}: DynamicFAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  // Use API data if available, otherwise use default FAQs
  const displayFAQs = faqs?.data?.length ? faqs.data : defaultFAQs;

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Customize FAQ content based on city/service
  const customizeFAQContent = (faq: FAQ) => {
    let customizedFAQ = { ...faq };
    
    if (city) {
      customizedFAQ.answer = customizedFAQ.answer.replace(
        /metro area|city|area/gi, 
        city
      );
    }
    
    if (service && customizedFAQ.question.toLowerCase().includes('service')) {
      customizedFAQ.question = customizedFAQ.question.replace(
        /service/gi, 
        `${service} service`
      );
    }
    
    return customizedFAQ;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg max-w-2xl mx-auto"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
          {city && (
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">About Service in {city}</span>
          )}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Got questions? We've got answers! Here are the most common questions our customers ask.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => {
            const customizedFAQ = customizeFAQContent(faq);
            const isOpen = openItems.includes(faq.id);
            
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-left leading-relaxed">
                      {customizedFAQ.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-blue-600 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6">
                    <div className="pl-12">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {customizedFAQ.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Still Have Questions?
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our friendly customer service team is here to help. Get in touch and we'll answer 
                any questions about our services{city && ` in ${city}`}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              >
                Call Us Now
              </a>
              <a
                href="mailto:support@cleancraft.com"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300"
              >
                Send Email
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 text-gray-600 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Average Response: 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}