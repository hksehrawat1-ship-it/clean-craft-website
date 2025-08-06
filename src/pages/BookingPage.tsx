import React, { useEffect, useState } from "react";
import { contentService } from "../lib/strapi/services/content.service";
import { useStrapiServices } from "@/hooks/useStrapi";
import { useCountry } from "@/contexts/CountryContext";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Enhanced booking components
import { BookingSteps } from "@/components/booking/BookingSteps";
import { CitySelection } from "@/components/booking/CitySelection";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { ContactForm, ContactFormData } from "@/components/booking/ContactForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

const BookingPage = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactData, setContactData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    customCity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { currentCountry } = useCountry();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const totalSteps = 4;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await contentService.getCitiesForBooking();
        const uniqueCities = Array.from(
          new Set(cityList.map((city) => city.toUpperCase()))
        );
        setCities(uniqueCities);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Event handlers
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCustomCity(false);
  };

  const handleOtherCity = () => {
    setSelectedCity("");
    setShowCustomCity(true);
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContactSubmit = (data: ContactFormData) => {
    setContactData(data);
    setCurrentStep(4);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedCity && !showCustomCity) {
        return toast.error("Please select a city");
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (selectedServices.length === 0) {
        return toast.error("Please select at least one service");
      }
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const payload = showCustomCity
      ? {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          manual_city: contactData.customCity,
          services: selectedServices.join(", "),
        }
      : {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          city: selectedCity,
          services: selectedServices.join(", "),
        };

    try {
      const endpoint = showCustomCity ? "/interesting-leads" : "/bookings";
      const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace(/\/+$/, "");

      await axios.post(
        `${baseUrl}${endpoint}`,
        { data: payload },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Booking submitted successfully! We'll contact you soon.");
      
      // Reset form and redirect
      setCurrentStep(1);
      setSelectedCity("");
      setShowCustomCity(false);
      setSelectedServices([]);
      setContactData({
        name: "",
        email: "",
        phone: "",
        customCity: "",
      });

      setTimeout(() => {
        navigate(`/${currentCountry || "in"}`);
      }, 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Process services data
  const displayServices = (strapiServices?.data || []).map((service: any) => {
    let priceType = service.price_type?.trim();
    const slug = service.slug?.toLowerCase() || "";
    if (!priceType) {
      priceType =
        slug.includes("wash") || slug.includes("laundry") ? "kg" : "item";
    }
    return { ...service, price_type: priceType };
  });

  const selectedServiceObjects = displayServices.filter((s: any) =>
    selectedServices.includes(s.id)
  );

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1:
        return selectedCity || showCustomCity;
      case 2:
        return selectedServices.length > 0;
      case 3:
        return contactData.name && contactData.email && contactData.phone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/${currentCountry || "in"}`}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/lovable-uploads/cleancraft-icon.png"
                alt="CleanCraft"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-foreground">
                CleanCraft
              </span>
            </Link>
            {!isMobile && currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={() => navigate(`/${currentCountry || "in"}`)}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BookingSteps currentStep={currentStep} totalSteps={totalSteps} />

        <Card className="p-6 md:p-8">
          {/* Step Content */}
          {currentStep === 1 && (
            <CitySelection
              cities={cities}
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onOtherCity={handleOtherCity}
            />
          )}

          {currentStep === 2 && (
            <ServiceSelection
              services={displayServices}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <ContactForm
              defaultValues={contactData}
              onSubmit={handleContactSubmit}
              showCustomCity={showCustomCity}
              selectedCity={selectedCity}
              isSubmitting={isSubmitting}
            />
          )}

          {currentStep === 4 && (
            <BookingConfirmation
              contactData={contactData}
              selectedCity={selectedCity}
              selectedServices={selectedServiceObjects}
              showCustomCity={showCustomCity}
            />
          )}

          {/* Error State */}
          {error && currentStep === 2 && (
            <div className="text-center py-8">
              <p className="text-destructive mb-4">Failed to load services</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNextStep}
              disabled={!canProceedFromStep(currentStep)}
              className="flex items-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : currentStep === 3 ? (
            <Button
              onClick={() => {
                // Form submission is handled by ContactForm
              }}
              disabled={!canProceedFromStep(currentStep)}
              className="flex items-center space-x-2"
            >
              <span>Review Booking</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Mobile Cancel Button */}
        {isMobile && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate(`/${currentCountry || "in"}`)}
              className="text-muted-foreground"
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
