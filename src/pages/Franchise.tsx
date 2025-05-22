
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/home/Layout";
import { useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";
import { Check, X, DollarSign, Calculator, Trophy, ShirtIcon, BarChart2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQDisplay from "@/components/shared/FAQDisplay";
import TestimonialDisplay from "@/components/shared/TestimonialDisplay";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">1.</div>
                  <FormLabel className="text-gray-700">Initial Investment</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input placeholder="15,00,000" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">Typical range: ₹15-25 Lakh</p>
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
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">2.</div>
                  <FormLabel className="text-gray-700">Expected Monthly Revenue</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input placeholder="2,50,000" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">Average: ₹2.5-5 Lakh monthly</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-medium">3.</div>
              <p className="text-gray-700 font-medium">Profit Margin per month</p>
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
            <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Zero Risk</div>
            <div className="text-sm">100% Royalty Free Guarantee</div>
          </div>
          <p className="text-center text-xs text-gray-500">The Perfect Time is Now</p>
        </form>
      </Form>
    </div>
  );
};

// Main Franchise Inquiry Form Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
});

const FranchiseForm: React.FC<{ className?: string }> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Franchise inquiry submitted!");
    console.log(values);
    // In a real application, you would send this to your backend
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Request Information
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Franchise comparison table data
const comparisonData = [
  { 
    category: "Laundry", 
    lowInvestment: true, 
    quickBreakeven: true,
    highProfit: true,
    easyOperations: true,
    recurringRevenue: true,
    riskFactor: "Low",
    preference: "#1",
    preferenceColor: "bg-blue-500" 
  },
  { 
    category: "Food", 
    lowInvestment: false, 
    quickBreakeven: false,
    highProfit: true,
    easyOperations: false,
    recurringRevenue: false,
    riskFactor: "High",
    preference: "#3",
    preferenceColor: "bg-amber-400" 
  },
  { 
    category: "Preschool", 
    lowInvestment: false, 
    quickBreakeven: false,
    highProfit: true,
    easyOperations: false,
    recurringRevenue: true,
    riskFactor: "Medium",
    preference: "#4",
    preferenceColor: "bg-amber-400" 
  },
  { 
    category: "Beauty & Wellness", 
    lowInvestment: true, 
    quickBreakeven: false,
    highProfit: false,
    easyOperations: true,
    recurringRevenue: true,
    riskFactor: "Medium",
    preference: "#5",
    preferenceColor: "bg-red-500" 
  },
  { 
    category: "Retail", 
    lowInvestment: false, 
    quickBreakeven: false,
    highProfit: false,
    easyOperations: true,
    recurringRevenue: false,
    riskFactor: "High",
    preference: "#2",
    preferenceColor: "bg-green-500" 
  }
];

const Franchise: React.FC = () => {
  // Fetch franchise-specific FAQs and testimonials
  const { data: faqsData, isLoading: faqsLoading } = useStrapiFAQs({
    category: "franchise",
    sortBy: "order",
    sortOrder: "asc",
  });

  const { data: testimonialsData, isLoading: testimonialsLoading } =
    useStrapiTestimonials({
      category: "franchise",
      sortBy: "rating",
      sortOrder: "desc",
    });

  return (
    <Layout showOfferCarousel={false}>
      <Helmet>
        <title>Laundry Franchise Opportunities | Clean Craft</title>
        <meta
          name="description"
          content="Start your own thriving laundry business with Clean Craft's franchise opportunities. Low investment, high returns, and complete business support."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#fffdf5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-8">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
                  Premium Laundry Franchise Opportunity
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Own a <span className="text-blue-500">Thriving</span>{" "}
                  <span className="text-blue-500">Laundry</span>
                  <br />
                  <span className="text-green-600">&amp; Dry Cleaning</span>
                  <br />
                  <span className="text-gray-900">Franchise</span>
                </h1>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-blue-600 font-bold">Zero Risk Promise:</h3>
                    <p className="text-gray-700">
                      Assured Break Even in 7 Months or Get 100% Royalty Free for Life Time
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-blue-600 font-bold">India's Best Laundry Franchise:</h3>
                    <p className="text-gray-700">
                      Revolutionary Laundry Business Solutions With Global Recognition
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-800">
                Partner with India's Most Trusted Laundry Industry Leader – 
                Recognized and Respected Internationally.
              </p>

              <div className="space-y-6">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
                >
                  Request Information
                </Button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    <span className="text-lg font-bold">9.5/10</span>
                    <span className="text-yellow-500 ml-1">★</span>
                  </div>
                  <span className="text-gray-600 text-sm">
                    <span className="font-semibold">99%</span> of happy store owners recommend us
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <ROICalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Comparison Table - New Design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              2025 Franchise <span className="text-[#5293C7]">Com</span><span className="text-[#57B894]">parison</span>
            </h2>
            <p className="text-lg text-gray-600">
              See why laundry is the most preferred franchise business in 2025
            </p>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-4 max-w-4xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-white border-b">
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Low</span>
                      <span>Investment</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Quick</span>
                      <span>Breakeven</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>High</span>
                      <span>Profit</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Easy</span>
                      <span>Operations</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Recurring</span>
                      <span>Revenue</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Risk</span>
                      <span>Factor</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>2025</span>
                      <span>Preference</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-50">
                    <TableCell className={`font-medium ${item.category === "Laundry" ? "text-[#5293C7]" : "text-gray-700"}`}>
                      {item.category}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.lowInvestment ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quickBreakeven ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.highProfit ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.easyOperations ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.recurringRevenue ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        item.riskFactor === "Low" 
                          ? "text-green-600" 
                          : item.riskFactor === "Medium" 
                            ? "text-amber-500"
                            : "text-red-500"
                      }`}>
                        {item.riskFactor}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-medium ${item.preferenceColor}`}>
                        {item.preference}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-gray-700">
              Laundry Franchise: #1 Choice for Entrepreneurs in 2025
            </p>
          </div>
        </div>
      </section>

      {/* Smart Choice Section - New Design from Image */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              Our Value Proposition
            </span>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Smart Choice For Your Franchise Investment
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Make an informed decision with our industry-leading guarantees and exceptional profit potential
            </p>
          </div>

          <div className="mt-16 text-center mb-12">
            <div className="inline-flex items-center justify-center bg-blue-50 rounded-full p-3 mb-2">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Why Buy This?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Always In Demand */}
            <div className="relative p-8 border-l-4 border-blue-400 rounded-r-lg bg-white shadow-sm">
              <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <ShirtIcon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 mt-2">Always In Demand</h4>
              <p className="text-gray-600">
                Unlike food or fashion, laundry is a non-optional, weekly need – everyone wears clothes and needs them cleaned. You're solving a daily life problem, not chasing trends.
              </p>
            </div>

            {/* High Profit Margins */}
            <div className="relative p-8 border-l-4 border-green-400 rounded-r-lg bg-white shadow-sm">
              <div className="absolute -left-4 top-8 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 mt-2">High Profit Margins</h4>
              <p className="text-gray-600">
                With 60%+ profit margins, low manpower, and zero dependency on seasons, this is one of the safest, steadiest and smartest franchises you can start in India today.
              </p>
            </div>

            {/* No Technical Background Needed */}
            <div className="relative p-8 border-l-4 border-red-400 rounded-r-lg bg-white shadow-sm">
              <div className="absolute -left-4 top-8 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 mt-2">No Technical Background Needed</h4>
              <p className="text-gray-600">
                No perishables, no cooking licenses, no wastage. Just pure service + system + scale. If you can manage a small team and follow simple systems, this business will work for you.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
              Request Franchise Information
            </Button>
          </div>
        </div>
      </section>

      {/* Ideal Franchise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              This Franchise Is <span className="text-[#4a9c7f]">Perfect</span> <span className="text-green-500">IF YOU ARE:</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join hundreds of successful franchise owners who found their perfect business match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="14" x="3" y="4" rx="2" />
                  <path d="M16 8v-.8A2.2 2.2 0 0 0 13.8 5h-3.6A2.2 2.2 0 0 0 8 7.2v.8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Business Owner</h3>
              <p className="text-gray-600">
                A businessman tired of rising competition and low margins
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Salaried Professional</h3>
              <p className="text-gray-600">
                A salaried professional looking for a stable side business
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">First-Time Entrepreneur</h3>
              <p className="text-gray-600">
                A first-time entrepreneur seeking a proven system
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-50 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 8-2 6-6 2 6-6 2-2Z" />
                  <path d="M9.01 11.5a3 3 0 0 0 4.5 4.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Freedom Seeker</h3>
              <p className="text-gray-600">
                Someone wanting financial freedom with minimal risk
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8">
              Get Case Studies from People Like You
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Craft Partner Guarantee */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Clean Craft Partner <span className="text-primary">Guarantee</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are committed to your success and stand behind our franchise system
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Money Back</h3>
                <p className="text-gray-600">
                  100% refund of franchise fee if requirements not met in 30 days
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Revenue Guarantee</h3>
                <p className="text-gray-600">
                  Minimum revenue guarantee for first 6 months
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Territory Protection</h3>
                <p className="text-gray-600">
                  Exclusive rights within your operating area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin text-primary border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : faqsData?.data?.length ? (
        <FAQDisplay faqs={faqsData.data} variant="home" />
      ) : null}

      {/* Testimonials Section */}
      {testimonialsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin text-primary border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : testimonialsData?.data?.length ? (
        <TestimonialDisplay testimonials={testimonialsData.data} variant="home" />
      ) : null}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our network of successful franchise owners today and build a profitable business
            with our support.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Download Brochure
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Franchise;
