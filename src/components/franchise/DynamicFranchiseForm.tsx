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
import ProgressiveStepper from "./ProgressiveStepper";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(1, "Please select a city"),
  investmentRange: z.string().min(1, "Please select an investment range"),
});

type FormData = z.infer<typeof formSchema>;

interface DynamicFranchiseFormProps {
  title: string;
  sourceCta: string;
  onClose?: () => void;
}

const DynamicFranchiseForm: React.FC<DynamicFranchiseFormProps> = ({ 
  title, 
  sourceCta, 
  onClose 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      investmentRange: "",
    },
  });

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
          investment_range: data.investmentRange,
          source_cta: sourceCta,
          lead_type: "franchise",
        });

      if (error) throw error;

      // Call new edge function with leadType
      const { error: emailError } = await supabase.functions.invoke('submit-lead', {
        body: {
          ...data,
          country: "India",
          investmentRange: data.investmentRange,
          sourceCta,
          leadType: "franchise",
        }
      });

      if (emailError) {
        console.warn("Email sending failed:", emailError);
        // Don't throw error - form submission was successful even if email fails
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-6">Success!</h3>
          <p className="text-gray-600 mb-8">
            Thank you for your interest! Here's what happens next:
          </p>
          
          <ProgressiveStepper />
          
          {onClose && (
            <Button onClick={onClose} className="w-full mt-6">
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-cleancraft-darkgold">
          {title}
        </CardTitle>
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

            <FormField
              control={form.control}
              name="investmentRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Range *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="₹15L-20L">₹15L - ₹20L</SelectItem>
                      <SelectItem value="₹20L-25L">₹20L - ₹25L</SelectItem>
                      <SelectItem value="₹25L+">₹25L+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                className="w-full bg-google-blue hover:bg-google-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Information"}
              </Button>
              
              {onClose && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DynamicFranchiseForm;
