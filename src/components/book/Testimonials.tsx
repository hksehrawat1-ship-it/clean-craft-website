import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rajiv Kumar",
    position: "Owner, Fresh Laundry Services, Delhi",
    content: "This book was a game-changer for my business. The step-by-step approach helped me establish a profitable laundry service within 6 months."
  },
  {
    name: "Priya Sharma",
    position: "Founder, CleanPro, Mumbai",
    content: "I was struggling with operational issues until I applied the techniques from this book. My revenue has increased by 40% in just three months!"
  },
  {
    name: "Ankit Patel",
    position: "Entrepreneur, Ahmedabad",
    content: "The financial models and marketing strategies provided in this book are worth many times its price. Highly recommended for anyone in the laundry business."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how others have transformed their businesses using the knowledge from this book
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-5 h-5 text-laundry-gold" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="italic mb-6 text-grey-900">"{testimonial.content}"</p>
                
                <div>
                  <p className="font-semibold text-grey-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
