
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai, India",
      testimonial: "The training was comprehensive and hands-on. Within 3 months of completing the course, I launched my own laundry business that's now profitable.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      location: "Delhi, India",
      testimonial: "As a complete beginner, I was worried about the learning curve. The training was so well structured that I gained confidence quickly. Now I run a successful chain of laundry stores.",
      rating: 5
    },
    {
      name: "Ankit Patel",
      location: "Ahmedabad, India",
      testimonial: "Mr. Himanshu's guidance was invaluable. The practical sessions gave me real-world experience that textbooks could never provide. My laundry business broke even in just 4 months.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      location: "Dubai, UAE",
      testimonial: "I traveled from Dubai specifically for this training, and it was worth every penny. The techniques I learned helped me establish a premium laundry service that stands out from competitors.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl">
            1000+ students across India and abroad have started earning profits from our training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
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
