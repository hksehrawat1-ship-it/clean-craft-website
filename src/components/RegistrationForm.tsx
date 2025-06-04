
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { State, City } from 'country-state-city';
import { CheckCircle, ExternalLink } from "lucide-react";
import { DisplayHeading, BodyText, Caption, SectionHeading } from "@/components/ui/typography";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(1, "Please select a city"),
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [cityInputFocused, setCityInputFocused] = useState(false);

  // Get Indian cities using country-state-city package
  const indianCities = useMemo(() => {
    const states = State.getStatesOfCountry("IN");
    const allCities: string[] = [];

    states.forEach((state) => {
      const stateCities = City.getCitiesOfState("IN", state.isoCode);
      stateCities.forEach((city) => allCities.push(city.name));
    });

    return [...new Set(allCities)].sort();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
    },
  });

  const cityValue = form.watch("city");

  const filteredCities = cityValue
    ? indianCities.filter((city) =>
        city.toLowerCase().includes(cityValue.toLowerCase())
      )
    : [];

  const handlePaymentRedirect = () => {
    window.open("https://cleancraft.mojo.page/best-laundry-training-institute-in-india", "_blank");
  };

  React.useEffect(() => {
    if (isSubmitted && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && redirectCountdown === 0) {
      handlePaymentRedirect();
    }
  }, [isSubmitted, redirectCountdown]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from("franchise_leads")
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.city,
          country: "India",
          source_cta: "Course Registration",
          lead_type: "course",
        });

      if (error) throw error;

      // Call edge function for course lead
      const { error: emailError } = await supabase.functions.invoke('submit-lead', {
        body: {
          ...data,
          country: "India",
          sourceCta: "Course Registration",
          leadType: "course",
        }
      });

      if (emailError) {
        console.warn("Email sending failed:", emailError);
        // Don't throw error - form submission was successful even if email fails
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("There was an error submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-white">
        <div className="container-enhanced">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elevation-2 border-0">
              <CardContent className="p-8 text-center">
                <div className="mb-8">
                  <CheckCircle className="h-16 w-16 text-brand-blue mx-auto mb-6" />
                  <SectionHeading className="text-brand-blue mb-4">
                    Registration Successful!
                  </SectionHeading>
                  <BodyText className="text-gray-600">
                    Thank you for registering for our professional laundry training course.
                  </BodyText>
                </div>
                
                <div className="bg-brand-blue-light p-6 rounded-lg mb-8">
                  <h4 className="text-title-md font-semibold text-brand-blue mb-3">
                    Complete Your Enrollment
                  </h4>
                  <BodyText className="text-brand-blue mb-6">
                    Redirecting to payment page in {redirectCountdown} seconds...
                  </BodyText>
                  
                  <Button 
                    onClick={handlePaymentRedirect}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Complete Payment Now
                  </Button>
                </div>

                <div className="space-y-2">
                  <Caption className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Registration confirmed
                  </Caption>
                  <Caption className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmation email sent
                  </Caption>
                  <Caption className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete payment to secure your spot
                  </Caption>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-brand-blue-light" id="registration-form">
      <div className="container-enhanced">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionHeading className="text-gray-900 mb-4">
              Start Your Laundry Business Journey
            </SectionHeading>
            <BodyText className="text-gray-600">
              Join India's premier laundry & dry cleaning training program
            </BodyText>
          </div>

          <Card className="shadow-elevation-2 border-0">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="input-enhanced h-12"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your phone number" 
                            className="input-enhanced h-12"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="input-enhanced h-12"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* City input with search */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          City *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Start typing your city"
                            className="input-enhanced h-12"
                            {...field}
                            autoComplete="off"
                            onFocus={() => setCityInputFocused(true)}
                            onBlur={() => {
                              setTimeout(() => setCityInputFocused(false), 150);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {cityInputFocused && filteredCities.length > 0 && (
                          <ul className="absolute z-50 max-h-48 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
                            {filteredCities.map((city) => (
                              <li
                                key={city}
                                className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                                onMouseDown={() => field.onChange(city)}
                              >
                                {city}
                              </li>
                            ))}
                          </ul>
                        )}
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register for Training"}
                    </Button>
                  </div>
                  
                  <Caption className="text-gray-500 text-center block">
                    By registering, you'll receive course details and payment instructions via email.
                  </Caption>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
