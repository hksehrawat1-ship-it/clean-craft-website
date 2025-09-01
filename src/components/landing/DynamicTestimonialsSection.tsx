import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  platform?: string;
  city?: string;
}

interface DynamicTestimonialsSectionProps {
  testimonials?: { data: Testimonial[] };
  isLoading: boolean;
  city?: string;
}

// Default testimonials in case API fails
const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    content: "CleanCraft transformed my dry cleaning experience! The pickup and delivery service is so convenient, and my clothes always come back looking brand new. The staff is professional and the quality is outstanding.",
    rating: 5,
    platform: "Google",
    city: "Downtown"
  },
  {
    id: 2,
    name: "Michael Chen",
    content: "I've been using CleanCraft for over a year now, and they never disappoint. My business suits are always perfectly pressed, and the stain removal service is incredible. Highly recommend!",
    rating: 5,
    platform: "Yelp",
    city: "Business District"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    content: "The eco-friendly cleaning methods are what drew me to CleanCraft initially, but the exceptional service keeps me coming back. They really care about both your clothes and the environment.",
    rating: 5,
    platform: "Facebook",
    city: "Riverside"
  },
  {
    id: 4,
    name: "David Thompson",
    content: "Fast, reliable, and high-quality service. The online booking system is user-friendly, and I love getting updates about my order status. CleanCraft has made laundry day stress-free!",
    rating: 5,
    platform: "Google",
    city: "Suburbs"
  },
  {
    id: 5,
    name: "Lisa Park",
    content: "I had a wedding dress that needed special care, and CleanCraft handled it perfectly. The attention to detail and gentle treatment of delicate fabrics is remarkable. Thank you!",
    rating: 5,
    platform: "Yelp",
    city: "Central"
  }
];

export default function DynamicTestimonialsSection({ 
  testimonials, 
  isLoading, 
  city 
}: DynamicTestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use API data if available, otherwise use default testimonials
  const displayTestimonials = testimonials?.data?.length ? testimonials.data : defaultTestimonials;

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
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
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-3xl h-96"></div>
        </div>
      </div>
    );
  }

  if (!displayTestimonials.length) {
    return null;
  }

  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          What Our Customers Say
          {city && (
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">in {city}</span>
          )}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Don't just take our word for it. Here's what real customers have to say about their CleanCraft experience.
        </p>
      </div>

      {/* Main Testimonial Slider */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 lg:p-16 mb-12">
        {/* Quote Icon */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Quote className="w-8 h-8 text-blue-600" />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-8 right-8 flex gap-2">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-4xl mx-auto text-center pt-8">
          <div className="mb-8">
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-medium italic">
              "{currentTestimonial.content}"
            </p>
          </div>

          {/* Rating */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < currentTestimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <div className="font-bold text-xl text-gray-900">
              {currentTestimonial.name}
            </div>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              {currentTestimonial.platform && (
                <>
                  <span className="text-sm bg-white px-3 py-1 rounded-full font-medium">
                    {currentTestimonial.platform} Review
                  </span>
                  {currentTestimonial.city && <span className="text-sm">•</span>}
                </>
              )}
              {currentTestimonial.city && (
                <span className="text-sm">{currentTestimonial.city}</span>
              )}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {displayTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Additional Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.slice(0, 3).map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  {testimonial.city && (
                    <div className="text-sm text-gray-500">{testimonial.city}</div>
                  )}
                </div>
                {testimonial.platform && (
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {testimonial.platform}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="space-y-2">
          <div className="text-4xl font-bold text-blue-600">4.9★</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-blue-600">2K+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-blue-600">99%</div>
          <div className="text-gray-600">Satisfaction Rate</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-blue-600">5★</div>
          <div className="text-gray-600">Google Rating</div>
        </div>
      </div>
    </div>
  );
}