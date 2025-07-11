import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      text: "After researching multiple franchise opportunities, I chose Clean Craft because of their Zero Risk Promise. I was profitable within 5 months and now own three locations. The support team is phenomenal and always available to help optimize operations.",
      role: "Franchise Owner - 3 Locations",
    },
    {
      name: "Priya Sharma",
      location: "Bangalore, Karnataka",
      text: "The operational systems and proprietary technology have made running my laundry business incredibly efficient. I was able to break even in just 6 months, and the recurring revenue model provides excellent stability. Best business decision I've ever made.",
      role: "Franchise Owner - 1 Location",
    },
    {
      name: "Vikram Singh",
      location: "Delhi, NCR",
      text: "I was skeptical about the 7-month break-even guarantee, but Clean Craft delivered. Their marketing support and customer acquisition system brought in steady business from day one. Now I'm exploring opening a second location within my territory.",
      role: "Franchise Owner - 1 Location",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-cleancraft-light text-cleancraft-darkgold mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hear From Our <span className="text-google-blue">Franchise</span>{" "}
            <span className="text-google-red">Owners</span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="rating-badge px-4 py-2 text-base">
              <Star className="h-5 w-5 mr-1 fill-white" />
              <span className="font-bold">9.5/10</span>
            </div>
            <p className="text-gray-600 text-lg">
              Franchise Feedback Rating by 99% of happy store owners
            </p>
          </div>

          <p className="text-gray-600 text-lg">
            Our franchisees are achieving remarkable success with our proven
            business model and industry-leading support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`card-highlight h-full transform transition-all duration-300 ${
                activeIndex === index
                  ? "scale-105 shadow-lg border-cleancraft-gold"
                  : "hover:scale-102"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow mb-6">
                  <div className="flex items-center space-x-1 mb-4 text-cleancraft-gold">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.text}"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-google-blue">
                    {testimonial.name}
                  </h4>
                  <div className="text-sm text-gray-500">
                    <span>{testimonial.role}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-cleancraft-light/30 rounded-xl p-2 md:p-8 google-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-google-blue">
                Franchise Success By The Numbers
              </h3>
              <p className="text-gray-600 mb-6">
                Our franchise network continues to grow with impressive
                performance metrics across the board.
              </p>

              {/* Responsive Grid: 1 column on mobile, 2 on large screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  {
                    value: "94%",
                    color: "text-google-blue",
                    text: "of franchisees break even within 7 months",
                  },
                  {
                    value: "45%",
                    color: "text-google-green",
                    text: "average profit margin across all locations",
                  },
                  {
                    value: "250+",
                    color: "text-google-red",
                    text: "franchise locations nationwide",
                  },
                  {
                    value: "92%",
                    color: "text-google-yellow",
                    text: "franchise owner satisfaction rating",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className={`text-3xl font-bold mb-1 ${item.color}`}>
                      {item.value}
                    </div>
                    <div className="text-gray-600 text-sm">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white px-1 md:px-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 mr-4">
                  <img
                    src="/lovable-uploads/cleancraft-icon.png"
                    alt="Clean Craft Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-google-blue text-sm">
                    Himanshu Sehrawat
                  </h4>
                  <div className="text-sm text-gray-500">CEO & Founder</div>
                </div>
              </div>

              <blockquote className="text-gray-600">
                <p className="mb-3">
                  “Laundry is the next big thing in India — and it’s already
                  happening!”
                </p>
                <p className="mb-3">
                  By 2035, there will be a laundry outlet at every corner, just
                  like tea stalls and kirana shops today. And those who invest
                  early will own the market.
                </p>
                <p className="mb-3">
                  With a super-high ROI of 62% and gross margins of 33.7%, Clean
                  Craft isn’t just a laundry brand — it’s a cashflow engine
                  designed for smart franchise owners.
                </p>
                <p className="mb-1">You don’t need crores.</p>
                <p className="mb-1">You don’t even need ₹30 lakh.</p>
                <p className="mb-3">
                  Our franchise setup cost is just ₹20–24 lakhless than a
                  Scorpio N.
                </p>
                <p>
                  Don’t wait for 2035. This is your moment to do the right thing
                  — at the right time.”
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
