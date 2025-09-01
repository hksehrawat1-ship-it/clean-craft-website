import { Calendar, Truck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";

interface HowItWorksSectionProps {
  city?: string;
}

const steps = [
  {
    icon: Calendar,
    title: "Schedule Pickup",
    description: "Book online or call us. Choose your preferred pickup time - as early as today!",
    details: [
      "Online booking in 2 minutes",
      "Same-day pickup available",
      "Flexible time slots"
    ],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Sparkles,
    title: "Expert Cleaning",
    description: "Our trained professionals clean your items using eco-friendly methods and premium care.",
    details: [
      "Professional-grade equipment",
      "Eco-friendly cleaning agents",
      "Quality inspection process"
    ],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Your clean clothes are delivered back to you, fresh, pressed, and ready to wear.",
    details: [
      "Free delivery to your door",
      "Garments pressed & folded",
      "Satisfaction guaranteed"
    ],
    color: "bg-green-100 text-green-600"
  }
];

export default function HowItWorksSection({ city }: HowItWorksSectionProps) {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;

  const handleGetStarted = () => {
    navigate(`/${currentCountry}/book`);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Getting your clothes professionally cleaned has never been easier. 
          {city && ` Serving ${city} with convenient, reliable service.`}
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0 transform translate-x-6"></div>
            )}

            <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300 group">
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              <div className="space-y-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-3 text-gray-600">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline View for Mobile */}
      <div className="lg:hidden mb-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent"></div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Experience the Difference?
        </h3>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us with their garment care. 
          Schedule your first pickup today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Schedule Pickup Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-full font-semibold"
          >
            Learn More
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span>Same-day service available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span>100% satisfaction guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}