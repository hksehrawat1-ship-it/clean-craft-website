import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Shield, CheckCircle, Users, Award, Phone, ArrowRight } from 'lucide-react';
import Layout from '@/components/home/Layout';
import { EnhancedSEO } from '@/components/EnhancedSEO';
import { useStrapiServices, useStrapiTestimonials, useStrapiFAQs } from '@/hooks/useStrapi';
import TestimonialSection from '@/components/home/TestimonialSection';
import FAQSection from '@/components/home/FAQSection';
import BookingButton from '@/components/home/BookingButton';
import { Button } from '@/components/ui/button';
import { useCountry } from '@/contexts/CountryContext';

const LocationItemPage: React.FC = () => {
  const { service: citySlug } = useParams<{ service: string }>();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const [showPricing, setShowPricing] = useState(false);

  const { data: services } = useStrapiServices();
  const { data: testimonials } = useStrapiTestimonials();
  const { data: faqs } = useStrapiFAQs();

  // Helper function to extract city from URL
  const extractCityFromSlug = (citySlug?: string) => {
    if (!citySlug) return '';
    // Remove 'laundry-and-dry-cleaning-near-me-in-' prefix and convert to readable format
    const cityMatch = citySlug.match(/laundry-and-dry-cleaning-near-me-in-(.+)$/);
    return cityMatch ? cityMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  };

  const cityName = extractCityFromSlug(citySlug);
  const serviceName = 'Laundry and Dry Cleaning';
  const displayCityName = cityName;

  // Mock GMB data - Replace with actual GMB API integration
  const gmbData = {
    rating: 4.9,
    reviewCount: 247,
    reviews: [
      {
        author: "Priya Sharma",
        rating: 5,
        text: `Excellent service! My silk sarees were perfectly cleaned and delivered on time in ${displayCityName}.`,
        date: "2 weeks ago"
      },
      {
        author: "Raj Kumar",
        rating: 5,
        text: "Best laundry service in the city. Professional staff and amazing quality.",
        date: "1 month ago"
      },
      {
        author: "Meera Patel",
        rating: 5,
        text: "Same day pickup and delivery as promised. Highly recommend CleanCraft!",
        date: "3 weeks ago"
      }
    ]
  };

  // Pricing data
  const pricingPlans = [
    {
      title: "Wash & Fold",
      price: "₹99",
      unit: "/kg",
      features: ["Free pickup & delivery", "24-48 hour turnaround", "Fabric softener included"]
    },
    {
      title: "Dry Cleaning",
      price: "₹199", 
      unit: "/piece",
      features: ["Professional dry clean", "Stain removal", "Premium packaging"],
      popular: true
    },
    {
      title: "Premium Care",
      price: "₹299",
      unit: "/piece", 
      features: ["Hand wash delicates", "Steam pressing", "Same-day service"]
    }
  ];

  const handleBookNow = () => {
    navigate(`/${currentCountry?.toLowerCase()}/book`);
  };

  return (
    <Layout>
      <EnhancedSEO 
        slug={`/locations/${citySlug}`}
        defaultTitle={`Laundry and Dry Cleaning Near Me in ${displayCityName} | CleanCraft`}
        defaultDescription={`Professional laundry and dry cleaning services in ${displayCityName}. Free pickup and delivery, same-day service available. Book your laundry service today.`}
        pageType="LocalBusiness"
      />
      
      {/* Hero Section - Sabri Suby Style */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-blue-dark to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Problem-focused headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Tired of Poor Laundry Service in {displayCityName}?
            </h1>
            
            {/* Solution-focused subheadline */}
            <h2 className="text-2xl md:text-3xl mb-6 text-blue-100 font-medium">
              Experience Premium Laundry & Dry Cleaning That Actually Works
            </h2>
            
            {/* Social proof */}
            <div className="flex justify-center items-center space-x-8 mb-8 flex-wrap gap-4">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-cleancraft-gold mr-2" />
                <span className="text-lg font-semibold">{gmbData.rating}/5 Rating</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Users className="w-5 h-5 text-blue-200 mr-2" />
                <span className="text-lg">{gmbData.reviewCount}+ Reviews</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-cleancraft-gold mr-2" />
                <span className="text-lg">Premium Service</span>
              </div>
            </div>
            
            {/* Urgency element */}
            <div className="bg-cleancraft-gold text-gray-900 px-6 py-3 rounded-lg inline-block mb-8 font-bold">
              🚀 Book within 2 hours for same-day pickup in {displayCityName}!
            </div>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button 
                size="lg" 
                onClick={handleBookNow}
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold text-lg px-8 py-4 transform hover:scale-105 transition-all"
              >
                Book Free Pickup Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowPricing(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-lg px-8 py-4"
              >
                See Pricing
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex justify-center items-center space-x-6 text-sm text-blue-200 flex-wrap gap-2">
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Free pickup & delivery</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Same-day service</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> 100% guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* GMB Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What {displayCityName} Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Real reviews from real customers in your area
              </p>
            </div>
            
            {/* GMB Rating Display */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mr-6">
                  <div className="text-4xl font-bold text-gray-800">{gmbData.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-cleancraft-gold fill-current" />
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm">{gmbData.reviewCount}+ Google Reviews</div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-gray-800">Verified on Google</div>
                  <div className="text-gray-600">Trusted by families in {displayCityName}</div>
                </div>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gmbData.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{review.author}</div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-cleancraft-gold fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">"{review.text}"</p>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                Read All {gmbData.reviewCount}+ Reviews on Google
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Value Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Transparent Pricing for {displayCityName}
              </h2>
              <p className="text-lg text-gray-600">
                No hidden fees, no surprises. Just premium service at honest prices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`relative bg-white border-2 rounded-xl p-8 ${plan.popular ? 'border-brand-blue shadow-lg transform scale-105' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-cleancraft-gold text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold text-brand-blue mb-1">
                      {plan.price}
                      <span className="text-lg text-gray-600 font-normal">{plan.unit}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-brand-blue hover:bg-brand-blue-dark' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={handleBookNow}
                  >
                    Book This Service
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why {displayCityName} Families Choose CleanCraft
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">100% Guaranteed</div>
                  <div className="text-sm text-gray-600">Or money back</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">Same-Day Service</div>
                  <div className="text-sm text-gray-600">Book by 10 AM</div>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">Free Delivery</div>
                  <div className="text-sm text-gray-600">To your doorstep</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">Trusted by 500+</div>
                  <div className="text-sm text-gray-600">In {displayCityName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency & Scarcity Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                ⚡ Limited Time Offer for {displayCityName}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Book your first service today and get <strong className="text-brand-blue">FREE pickup & delivery</strong>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-brand-blue/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-brand-blue">500+</div>
                  <div className="text-gray-600">Customers in {displayCityName}</div>
                </div>
                <div className="bg-cleancraft-gold/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cleancraft-gold">24-48hrs</div>
                  <div className="text-gray-600">Standard turnaround</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-gray-600">Satisfaction guaranteed</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={handleBookNow} className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-8 py-4">
                  Book Free Pickup Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold px-8 py-4">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Us Now
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                🚀 Book within 2 hours for same-day pickup • No contracts • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials?.data && testimonials.data.length > 0 && (
        <TestimonialSection testimonials={testimonials.data} />
      )}

      {/* FAQ Section */}
      {faqs?.data && faqs.data.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop Wasting Time on Laundry in {displayCityName}!
            </h2>
            <p className="text-xl mb-2 text-blue-100">
              Get your clothes professionally cleaned and delivered to your door
            </p>
            <p className="text-lg mb-8 text-cleancraft-gold font-semibold">
              ⏰ Book now for same-day pickup • Join 500+ happy customers in {displayCityName}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleBookNow}
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold text-xl px-10 py-5 transform hover:scale-105 transition-all"
              >
                Book {serviceName} Now
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-xl px-10 py-5"
              >
                <Phone className="mr-2 w-6 h-6" />
                Call {displayCityName} Team
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm text-blue-200">
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 mb-1" />
                <span>Free pickup</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 mb-1" />
                <span>Same-day service</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 mb-1" />
                <span>Money-back guarantee</span>
              </div>
            </div>
            
            <p className="mt-8 text-blue-200 text-sm">
              ⭐ Rated {gmbData.rating}/5 by {gmbData.reviewCount}+ customers in {displayCityName}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationItemPage;