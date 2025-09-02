import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, CheckCircle, Star, Phone, Clock, ArrowRight } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import { useStrapiServices, useStrapiTestimonials, useStrapiFAQs } from "@/hooks/useStrapi";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import Layout from "@/components/home/Layout";
import BookingButton from "@/components/home/BookingButton";

const LocationItemPage = () => {
  const { service: serviceSlug, city: citySlug } = useParams();
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  
  const { data: servicesData } = useStrapiServices();
  const { data: testimonialsData } = useStrapiTestimonials();
  const { data: faqData } = useStrapiFAQs();

  // Extract service and city from URL params
  const extractServiceAndCity = () => {
    if (serviceSlug && citySlug) {
      // Format: service-near-me-in-city
      const parts = serviceSlug.split('-near-me-in-');
      const service = parts[0]?.replace(/-/g, ' ');
      const city = citySlug?.replace(/-/g, ' ');
      return { service, city };
    } else if (serviceSlug) {
      // Format: service-near-me-in-city (all in one param)
      const parts = serviceSlug.split('-near-me-in-');
      if (parts.length === 2) {
        const service = parts[0]?.replace(/-/g, ' ');
        const city = parts[1]?.replace(/-/g, ' ');
        return { service, city };
      }
    }
    return { service: 'Laundry Services', city: 'Your City' };
  };

  const { service: serviceName, city: cityName } = extractServiceAndCity();

  // Find matching service from API
  const currentService = servicesData?.data?.find((s: any) => 
    s.name.toLowerCase().includes(serviceName?.toLowerCase() || '') ||
    s.slug?.toLowerCase().includes(serviceName?.toLowerCase() || '')
  ) || servicesData?.data?.[0];

  // Format names for display
  const formatName = (name: string) => {
    return name?.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ') || '';
  };

  const formattedService = formatName(serviceName || '');
  const formattedCity = formatName(cityName || '');

  const processSteps = [
    {
      step: 1,
      title: `Book Online for ${formattedCity}`,
      description: `Schedule your pickup from anywhere in ${formattedCity} through our easy booking system.`,
      icon: Phone,
    },
    {
      step: 2,
      title: `We Collect from Your ${formattedCity} Location`,
      description: `Our team arrives at your doorstep in ${formattedCity} to collect your garments safely.`,
      icon: MapPin,
    },
    {
      step: 3,
      title: `Clean & Deliver Back to ${formattedCity}`,
      description: `Professional cleaning and timely delivery back to your ${formattedCity} address.`,
      icon: CheckCircle,
    },
  ];

  const benefits = [
    "Free pickup and delivery in " + formattedCity,
    "Professional dry cleaning equipment",
    "Eco-friendly cleaning solutions", 
    "Same-day and express services available",
    "100% satisfaction guarantee",
    "Experienced local team in " + formattedCity,
  ];

  const relatedServices = servicesData?.data?.filter((s: any) => s.id !== currentService?.id)?.slice(0, 4) || [];

  return (
    <Layout>
      <EnhancedSEO
        slug={`/locations/${serviceSlug}`}
        defaultTitle={`${formattedService} Near Me in ${formattedCity} | CleanCraft Professional Laundry`}
        defaultDescription={`Professional ${formattedService.toLowerCase()} services in ${formattedCity}. Free pickup & delivery, same-day service available. Book your ${formattedService.toLowerCase()} in ${formattedCity} today!`}
        pageType="LocalBusiness"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-blue py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 opacity-90">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span>Locations</span>
              <span className="mx-2">›</span>
              <span>{formattedCity}</span>
              <span className="mx-2">›</span>
              <span>{formattedService}</span>
            </nav>

            <h1 className="text-display-sm md:text-display-md font-bold mb-6">
              {formattedService} Near Me in {formattedCity}
            </h1>
            
            <h2 className="text-heading-sm font-semibold mb-8 opacity-90">
              Professional {formattedService} Services in {formattedCity}
            </h2>
            
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Serving {formattedCity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Same Day Service</span>
              </div>
            </div>
            
            <BookingButton />
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-sm font-semibold text-gray-900 mb-6">
                Premium {formattedService} in {formattedCity}
              </h2>
              
              <p className="text-body-lg text-gray-600 mb-6">
                {currentService?.description || 
                `Experience professional ${formattedService.toLowerCase()} services in ${formattedCity} with CleanCraft's premium care and attention to detail.`}
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-body-md text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {currentService?.price_from && (
                <div className="bg-cleancraft-light border border-cleancraft-gold/30 rounded-xl p-4 mb-6">
                  <p className="text-lg font-semibold text-gray-900">
                    Starting from ₹{currentService.price_from}
                  </p>
                  <p className="text-sm text-gray-600">
                    Competitive pricing for {formattedCity} residents
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-title-lg font-semibold text-gray-900 mb-6">
                Quick Booking
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <div className="p-3 bg-white border border-gray-300 rounded-lg text-gray-900">
                    {formattedService}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="p-3 bg-white border border-gray-300 rounded-lg text-gray-900">
                    {formattedCity}
                  </div>
                </div>
                <BookingButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-sm md:text-heading-md font-semibold text-gray-900 mb-4">
              How It Works in {formattedCity}
            </h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to get your {formattedService.toLowerCase()} done in {formattedCity}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-title-sm font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-body-md text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-heading-sm font-semibold text-gray-900 mb-4">
                Other Services in {formattedCity}
              </h2>
              <p className="text-body-md text-gray-600">
                Explore our full range of professional laundry services available in {formattedCity}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((service: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-blue hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/${currentCountry?.toLowerCase()}/locations/${service.slug || service.name.toLowerCase().replace(/\s+/g, '-')}-near-me-in-${cityName?.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors">
                    <CheckCircle className="h-6 w-6 text-brand-blue group-hover:text-white" />
                  </div>
                  <h3 className="text-title-sm font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center text-brand-blue text-sm font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonialsData?.data && testimonialsData.data.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-heading-sm font-semibold text-gray-900 mb-4">
                What {formattedCity} Customers Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonialsData.data.slice(0, 3).map((testimonial: any, index: number) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-card">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-body-md text-gray-700 mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-blue-light rounded-full flex items-center justify-center mr-3">
                      <span className="text-brand-blue font-semibold">
                        {testimonial.customer_name?.charAt(0) || 'C'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.customer_name}</p>
                      <p className="text-sm text-gray-600">{formattedCity} Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqData?.data && faqData.data.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-heading-sm font-semibold text-gray-900 mb-4">
                Frequently Asked Questions - {formattedCity}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.data.slice(0, 5).map((faq: any, index: number) => (
                <details key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                    {faq.question}
                  </summary>
                  <div className="mt-4 text-gray-600">
                    {faq.answer && typeof faq.answer === 'string' ? (
                      <p>{faq.answer}</p>
                    ) : (
                      <p>For detailed information, please contact our {formattedCity} team.</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-sm md:text-heading-md font-semibold mb-4">
              Book {formattedService} in {formattedCity} Now
            </h2>
            <p className="text-body-lg mb-8 opacity-90">
              Join thousands of satisfied customers in {formattedCity}. Experience premium {formattedService.toLowerCase()} with convenient pickup and delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookingButton />
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-blue transition-colors">
                Call {formattedCity} Store
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationItemPage;