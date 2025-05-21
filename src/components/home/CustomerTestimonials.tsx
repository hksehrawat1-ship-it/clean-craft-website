
import { useStrapiTestimonials } from '@/hooks/useStrapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { StrapiTestimonial } from '@/types/strapi';
import { Star } from 'lucide-react';

// Fallback testimonials for when no testimonials are available
const fallbackTestimonials = [
  {
    id: 1,
    attributes: {
      author: "Sarah Johnson",
      content: "Excellent service! My clothes came back perfectly clean and neatly pressed. The pickup and delivery were right on time.",
      rating: 5,
      platform: "website"
    }
  },
  {
    id: 2,
    attributes: {
      author: "Michael Chen",
      content: "Very professional service. They handle delicate items with great care. Highly recommended!",
      rating: 5,
      platform: "website"
    }
  },
  {
    id: 3,
    attributes: {
      author: "Emma Wilson",
      content: "The convenience of their service is unmatched. Great quality and friendly staff.",
      rating: 5,
      platform: "website"
    }
  }
];

export default function CustomerTestimonials() {
  const { data: testimonials, isLoading, error } = useStrapiTestimonials({
    platform: 'website',
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  // Use fallback testimonials if no testimonials are available
  const displayTestimonials = testimonials?.data?.length > 0 ? testimonials.data : fallbackTestimonials;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">What Our <span className="text-[#1869D3]">Customers</span> Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.attributes.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.attributes.content}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{testimonial.attributes.author}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    via {testimonial.attributes.platform}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
