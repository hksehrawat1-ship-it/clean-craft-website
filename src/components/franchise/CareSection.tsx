import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  bestTimeToSpeak: z.string({
    required_error: "Please select a preferred time.",
  }),
});

const CareSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bestTimeToSpeak: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // This would typically send data to a server or API
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  }

  // Helper function to render the time option icon
  const getTimeIcon = (time: string) => {
    switch (time) {
      case "morning":
        return <Sunrise className="mr-2 h-4 w-4 text-google-blue" />;
      case "afternoon":
        return <Sun className="mr-2 h-4 w-4 text-google-yellow" />;
      case "evening":
        return <Sunset className="mr-2 h-4 w-4 text-google-red" />;
      case "night":
        return <Moon className="mr-2 h-4 w-4 text-cleancraft-darkgold" />;
      default:
        return <Clock className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <section
      id="care"
      className="relative overflow-hidden bg-gradient-to-b from-cleancraft-light via-white to-white"
    >
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge
              variant="outline"
              className="bg-cleancraft-light text-cleancraft-darkgold px-4 py-1.5 text-sm"
            >
              Take Action Now
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Start Your{" "}
              <span className="gradient-text">Journey?</span>
            </h2>

            <div className="bg-white/70 backdrop-blur-sm border border-cleancraft-light rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="text-google-green h-8 w-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl text-google-blue">
                    3-Call Total Deal Close Policy:
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Making your decision process simple and transparent.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-700">
              Both options are acceptable. We respect your decision and are here
              to support your journey whenever you're ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                className="bg-google-blue hover:bg-google-blue/90 text-white font-medium text-base cursor-default"
                disabled
              >
                YES
              </Button>

              <Button
                variant="outline"
                className="border-2 font-medium text-base border-gray-300 cursor-default"
                disabled
              >
                NO
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center text-sm text-red-700 bg-red-100 px-3 py-1 rounded whitespace-nowrap">
                <Clock className="h-4 w-4 mr-1" />
                <span className="leading-none font-medium">Act Now</span>
              </div>
              <p className="text-sm text-gray-600 m-0 whitespace-nowrap">
                <span className="font-semibold bg-yellow-100 px-2 py-0.5 rounded leading-none inline-block">
                  Every day you wait, someone else starts
                </span>
              </p>
            </div>
          </div>

          <div
            className="relative lg:h-[680px] animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cleancraft-light/40 to-cleancraft-light/20 rounded-2xl"></div>
            <div className="relative h-full flex items-center justify-center p-6">
              <Card className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md google-shadow">
                <CardContent className="p-6">
                  {submitted ? (
                    <div className="text-center space-y-4 py-10">
                      <ShieldCheck className="h-16 w-16 mx-auto text-google-green" />
                      <h3 className="text-2xl font-bold text-google-blue">
                        Thank You!
                      </h3>
                      <p className="text-gray-600">
                        We've received your information and will be in touch
                        soon.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-cleancraft-darkgold">
                          Request Franchise Information
                        </h3>
                        <p className="text-gray-600 mt-2">
                          Fill out the form below and we'll contact you shortly.
                        </p>
                      </div>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="your@email.com"
                                    type="email"
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="(123) 456-7890"
                                    type="tel"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="bestTimeToSpeak"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Best Time to Speak</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select your preferred time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem
                                        value="morning"
                                        className="flex items-center"
                                      >
                                        <div className="flex items-center">
                                          <Sunrise className="mr-2 h-4 w-4 text-google-blue" />
                                          <span>Morning (8AM - 12PM)</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="afternoon">
                                        <div className="flex items-center">
                                          <Sun className="mr-2 h-4 w-4 text-google-yellow" />
                                          <span>Afternoon (12PM - 4PM)</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="evening">
                                        <div className="flex items-center">
                                          <Sunset className="mr-2 h-4 w-4 text-google-red" />
                                          <span>Evening (4PM - 8PM)</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="night">
                                        <div className="flex items-center">
                                          <Moon className="mr-2 h-4 w-4 text-cleancraft-darkgold" />
                                          <span>Night (8PM - 11PM)</span>
                                        </div>
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full bg-google-blue hover:bg-google-blue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "Submitting..."
                              : "Request Information"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-40 right-0 w-48 h-48 bg-cleancraft-light rounded-full opacity-40 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-cleancraft-light rounded-full opacity-30 blur-3xl -z-10"></div>
    </section>
  );
};

export default CareSection;
