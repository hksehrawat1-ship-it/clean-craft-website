
import React, { useState } from "react";
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
import { CheckCircle, Phone, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
  "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana",
  "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar",
  "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur"
];

const DynamicFranchiseForm: React.FC<DynamicFranchiseFormProps> = ({ 
  title, 
  sourceCta, 
  onClose 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        });

      if (error) throw error;

      // Call edge function to send emails
      const { error: emailError } = await supabase.functions.invoke('submit-franchise-lead', {
        body: {
          ...data,
          country: "India",
          investmentRange: data.investmentRange,
          sourceCta,
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
        <CardContent className="p-8 text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold text-green-600">Success!</h3>
          <p className="text-gray-600">
            Thank you for your interest! Here's what happens next:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-green-600">✅ Information Submitted</h4>
                <p className="text-sm text-gray-600">Your details are now in our system</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">📞 Discovery Call Scheduled</h4>
                <p className="text-sm text-gray-600">Within 24 hours - Our franchise consultant will contact you</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-purple-600">🚀 Franchise Up & Running</h4>
                <p className="text-sm text-gray-600">
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    62% ROI = ₹12,000+ monthly profit potential
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {onClose && (
            <Button onClick={onClose} className="w-full">
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
                    <SelectContent className="max-h-60">
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
                    <SelectContent>
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
