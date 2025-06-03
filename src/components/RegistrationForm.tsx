
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { State, City } from 'country-state-city';
import { CheckCircle, ExternalLink } from "lucide-react";

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

  // Get Indian cities using country-state-city package
  const indianCities = useMemo(() => {
    const indianStates = State.getStatesOfCountry('IN');
    const allCities: string[] = [];
    
    indianStates.forEach((state: any) => {
      const stateCities = City.getCitiesOfState('IN', state.isoCode);
      stateCities.forEach((city: any) => {
        allCities.push(city.name);
      });
    });
    
    // Remove duplicates and sort
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
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
            <p className="text-gray-600">
              Thank you for registering for our professional laundry training course.
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Complete Your Enrollment</h4>
            <p className="text-blue-700 text-sm mb-4">
              Redirecting to payment page in {redirectCountdown} seconds...
            </p>
            
            <Button 
              onClick={handlePaymentRedirect}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Complete Payment Now
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>✅ Registration confirmed</p>
            <p>📧 Confirmation email sent</p>
            <p>💳 Complete payment to secure your spot</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-cleancraft-darkgold">
          Register for Professional Training
        </CardTitle>
        <p className="text-center text-gray-600 text-sm">
          Join India's premier laundry & dry cleaning training program
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
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
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
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
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 bg-white border border-gray-200 shadow-lg z-50">
                      {indianCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-cleancraft-gold hover:bg-cleancraft-darkgold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register for Training"}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              By registering, you'll receive course details and payment instructions via email.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
