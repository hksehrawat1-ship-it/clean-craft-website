
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/home/Layout";
import { useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";
import { Loader2, Check, X } from "lucide-react";
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
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Request Information
          </Button>
        </div>
      </form>
    </Form>
  );
};

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                Own a <span className="text-primary">Thriving</span> Laundry Business
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Join our network of successful entrepreneurs with a proven laundry
                business model. Low investment, high returns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Request Information
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Watch Video
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">Get Franchise Information</h3>
                <FranchiseForm className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Franchise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              This Franchise is Perfect <span className="text-primary">IF YOU ARE:</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "check",
                title: "Downowner",
                description: "Looking to own a business in your community"
              },
              {
                icon: "check",
                title: "Self-Starter",
                description: "With entrepreneurial spirit and drive to succeed"
              },
              {
                icon: "check",
                title: "First-Time Investor",
                description: "Seeking a proven business model with support"
              },
              {
                icon: "check",
                title: "Freedom Seeker",
                description: "Ready for financial independence & flexibility"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              2025 Franchise <span className="text-primary">Comparison</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compare our franchise opportunity with other options in the market
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left border-b border-gray-200">Features</th>
                  <th className="p-4 text-center border-b border-gray-200 bg-primary/10">
                    <span className="text-primary font-bold">Clean Craft</span>
                  </th>
                  <th className="p-4 text-center border-b border-gray-200">Other Franchises</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-gray-200">Initial Investment</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <span className="font-semibold">₹15-25 Lakhs</span>
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">₹30-50 Lakhs</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200">ROI Timeline</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <span className="font-semibold">12-18 months</span>
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">24-36 months</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200">Technology Support</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <Check className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">
                    <X className="w-6 h-6 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200">Marketing Support</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <Check className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">
                    <Check className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200">Training & Support</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <span className="font-semibold">Comprehensive</span>
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">Basic</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200">Mobile App</td>
                  <td className="p-4 text-center border-b border-gray-200 bg-primary/5">
                    <Check className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center border-b border-gray-200">
                    <X className="w-6 h-6 text-red-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Smart Choice Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Smart Choice For <span className="text-primary">Your Franchise</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in the laundry business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Business System",
                description:
                  "Our turnkey business system includes equipment, software, and operational procedures to get you started quickly.",
              },
              {
                title: "Proprietary Technology",
                description:
                  "Get access to our custom mobile app and management software that streamlines operations and enhances customer experience.",
              },
              {
                title: "Comprehensive Training",
                description:
                  "Receive hands-on training in all aspects of laundry operations, management, and customer service.",
              },
              {
                title: "Marketing Support",
                description:
                  "Benefit from our national marketing campaigns and localized marketing strategies to attract customers.",
              },
              {
                title: "Ongoing Support",
                description:
                  "Our team provides continuous operational support, business coaching, and technical assistance.",
              },
              {
                title: "Location Selection",
                description:
                  "We help you select the optimal location based on demographic analysis and market research.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Now Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-primary">Buy Now</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/lovable-uploads/cleancraft-laundry-app.png"
                alt="Clean Craft Franchise Opportunity"
                className="rounded-lg shadow-xl mx-auto"
              />
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Growing Industry",
                  description:
                    "The laundry service market is expanding at 4.5% CAGR with increasing demand for convenient services.",
                },
                {
                  title: "Limited Competition",
                  description:
                    "Be among the first to establish a modern tech-enabled laundry business in your area.",
                },
                {
                  title: "Recession-Resistant",
                  description:
                    "Laundry is an essential service that remains stable even during economic downturns.",
                },
                {
                  title: "Exclusive Territories",
                  description:
                    "Secure exclusive rights to your territory before someone else does.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : faqsData?.data?.length ? (
        <FAQDisplay faqs={faqsData.data} variant="home" />
      ) : null}

      {/* Testimonials Section */}
      {testimonialsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
