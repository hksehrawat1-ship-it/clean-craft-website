
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  platform: string;
}

interface TestimonialsData {
  data: Testimonial[];
}

interface CustomerTestimonialsProps {
  testimonials?: TestimonialsData;
}

const CustomerTestimonials: React.FC<CustomerTestimonialsProps> = ({ testimonials }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      content: "Excellent service! My clothes came back perfectly clean and fresh.",
      rating: 5,
      platform: "Google"
    },
    {
      id: 2,
      name: "Raj Patel",
      content: "Very convenient pickup and delivery. Great quality work.",
      rating: 5,
      platform: "Facebook"
    },
    {
      id: 3,
      name: "Anita Singh",
      content: "Professional service with amazing results. Highly recommended!",
      rating: 5,
      platform: "Google"
    }
  ];

  const testimonialsToShow = testimonials?.data && testimonials.data.length > 0 
    ? testimonials.data 
    : defaultTestimonials;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsToShow.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                  <span className="text-sm text-gray-500">{testimonial.platform}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
