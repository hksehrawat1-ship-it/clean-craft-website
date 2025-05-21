import React from "react";
import { Star } from "lucide-react";
import { StrapiTestimonial } from "@/types/strapi";

interface TestimonialDisplayProps {
  testimonials: StrapiTestimonial[];
  variant?: "home" | "courses" | "book";
}

const TestimonialDisplay: React.FC<TestimonialDisplayProps> = ({
  testimonials,
  variant = "home",
}) => {
  if (!testimonials?.length) {
    return null;
  }

  const title =
    variant === "home"
      ? "Real Stories. Real Results"
      : variant === "courses"
      ? "successful Students"
      : "happy Readers";

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          <span className="text-[#1869D3]">{title}</span>
        </h2>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden w-full overflow-x-auto pb-6">
          <div className="flex gap-6" style={{ minWidth: "min-content" }}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm flex-none w-[300px]"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (testimonial.rating || 5)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Via {testimonial.platform || "Website"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div
          className={`hidden md:grid gap-6 ${
            testimonials.length === 1
              ? "grid-cols-1 justify-center"
              : testimonials.length === 2
              ? "grid-cols-2 justify-center"
              : "grid-cols-3"
          }`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < (testimonial.rating || 5)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 text-lg">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  Via {testimonial.platform || "Website"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialDisplay;
