import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Clock, Star, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";

interface FinalCTASectionProps {
  city?: string;
  service?: string;
}

export default function FinalCTASection({ city, service }: FinalCTASectionProps) {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;

  const handleBookNow = () => {
    navigate(`/${currentCountry}/book`);
  };

  const handleCallNow = () => {
    window.open('tel:+1234567890', '_self');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center text-white space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Ready to Experience
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                Premium Care?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust CleanCraft with their garment care.
              {city && ` Experience the best laundry service ${city} has to offer.`}
              {service && ` Get expert ${service.toLowerCase()} service today.`}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-bold">4.9</span>
              </div>
              <div className="text-blue-100">Customer Rating</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                <span className="text-3xl font-bold">100%</span>
              </div>
              <div className="text-blue-100">Satisfaction Guaranteed</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-blue-300" />
                <span className="text-3xl font-bold">24/7</span>
              </div>
              <div className="text-blue-100">Customer Support</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-purple-300" />
                <span className="text-3xl font-bold">Free</span>
              </div>
              <div className="text-blue-100">Pickup & Delivery</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleBookNow}
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-12 py-8 text-xl rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 group min-h-[80px]"
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Schedule Pickup Now
              </Button>
              
              <Button
                onClick={handleCallNow}
                variant="outline"
                size="lg"
                className="border-3 border-white/50 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm font-bold px-12 py-8 text-xl rounded-full min-h-[80px] group"
              >
                <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Call Now
              </Button>
            </div>

            {/* Urgency Text */}
            <div className="space-y-4">
              <p className="text-lg text-blue-100 font-medium">
                🚀 Same-day pickup available • 🎯 First-time customer? Get 20% off your first order!
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online booking available 24/7</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-white/20 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Phone */}
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-blue-100">(555) 123-4567</div>
                  <div className="text-sm text-blue-200">Available 24/7</div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Service Area</div>
                  <div className="text-blue-100">{city || 'Metro Area'}</div>
                  <div className="text-sm text-blue-200">Free pickup & delivery</div>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Business Hours</div>
                  <div className="text-blue-100">Mon-Fri: 7AM-7PM</div>
                  <div className="text-sm text-blue-200">Sat-Sun: 8AM-6PM</div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">Rated #1 Laundry Service</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Eco-Friendly Certified</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">10,000+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}