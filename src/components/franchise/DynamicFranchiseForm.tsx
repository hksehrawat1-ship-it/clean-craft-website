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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ProgressiveStepper from "./ProgressiveStepper";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
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
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      investmentRange: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("franchise_leads").insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: "",
        country: "India",
        investment_range: "",
        source_cta: sourceCta,
        lead_type: "franchise",
      });

      if (error) throw error;

      await supabase.functions.invoke("submit-lead", {
        body: {
          ...data,
          country: "India",
          investmentRange: data.investmentRange,
          sourceCta,
          leadType: "franchise",
        },
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-brand-blue mb-6">Success!</h3>
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
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Investment Range with Shadcn Select */}
            {/* <FormField
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
            /> */}

            {/* Submit + Cancel */}
            <div className="mb-6 max-w-2xl mx-auto">
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Information"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DynamicFranchiseForm;
