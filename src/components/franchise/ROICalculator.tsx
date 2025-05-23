
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ROI Calculator Form Schema
const calculatorSchema = z.object({
  initialInvestment: z.string().min(1, {
    message: "Investment amount is required",
  }),
  monthlyRevenue: z.string().min(1, {
    message: "Monthly revenue is required",
  }),
});

const ROICalculator: React.FC = () => {
  const form = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      initialInvestment: "15,00,000",
      monthlyRevenue: "2,50,000",
    },
  });

  function onCalculate(values: z.infer<typeof calculatorSchema>) {
    toast.success("ROI calculation in progress!");
    console.log(values);
    // In a real application, you would calculate the ROI here
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <img
          src="/lovable-uploads/cleancraft-icon.png"
          alt="Clean Craft"
          className="w-10 h-10"
        />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
        <span className="text-amber-500">Laundry Franchise</span> ROI Calculator
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-4">
          <FormField
            control={form.control}
            name="initialInvestment"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">
                    1.
                  </div>
                  <FormLabel className="text-gray-700">
                    Initial Investment
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <Input placeholder="15,00,000" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: ₹15-25 Lakh
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">
                    2.
                  </div>
                  <FormLabel className="text-gray-700">
                    Expected Monthly Revenue
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <Input placeholder="2,50,000" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  Average: ₹2.5-5 Lakh monthly
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-medium">
                3.
              </div>
              <p className="text-gray-700 font-medium">
                Profit Margin per month
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-gray-50 hover:bg-gray-100"
                onClick={() => toast.info("Calculating profit margins...")}
              >
                Calculate to see results
              </Button>
              <div className="px-4 py-2 bg-gray-50 rounded text-sm text-gray-400 flex items-center justify-center">
                Waiting
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-amber-900 font-medium py-3 mt-4"
          >
            Calculate ROI
          </Button>

          <div className="text-center text-sm text-gray-600 mt-2">
            Schedule a franchise consultation today
          </div>

          <div className="flex items-center gap-2 justify-center px-4 py-2 bg-white border rounded-lg mt-4">
            <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
              Zero Risk
            </div>
            <div className="text-sm">100% Royalty Free Guarantee</div>
          </div>
          <p className="text-center text-xs text-gray-500">
            The Perfect Time is Now
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ROICalculator;
