import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    investmentLevel: "",
    message: "",
  });

  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your server
    console.log("Form submitted:", formState);
    
    // Show success toast
    toast({
      title: "Information Request Received",
      description: "A franchise consultant will contact you within 24 hours.",
      duration: 5000,
    });
    
    // Navigate to thank-you page after toast
    navigate(`/${countryCode?.toLowerCase() || "in"}/thank-you`);
    
    // Reset form
    setFormState({
      name: "",
      email: "",
      phone: "",
      investmentLevel: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="section-padding bg-laundry-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-laundry-dark">
              Start Your Franchise Journey Today
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Take the first step toward owning a profitable laundry and dry cleaning franchise with our industry-leading break-even guarantee.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-laundry-secondary mb-8">
              <div className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-laundry-primary mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-laundry-dark">Zero Risk Promise</h3>
                  <p className="text-gray-600">
                    Break even in 7 months or receive 100% royalty-free operations for the lifetime of your franchise.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-laundry-primary rounded-full text-white h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-laundry-dark">Complete the Info Request</h4>
                  <p className="text-gray-600">
                    Fill out the form to receive our franchise information packet and schedule a discovery call.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-laundry-primary rounded-full text-white h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-laundry-dark">Speak with a Franchise Consultant</h4>
                  <p className="text-gray-600">
                    Our team will contact you within 24 hours to discuss the opportunity in detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-laundry-primary rounded-full text-white h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-laundry-dark">Receive Custom Proposal</h4>
                  <p className="text-gray-600">
                    Get a personalized franchise plan based on your goals and investment capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-laundry-secondary">
            <h3 className="text-2xl font-semibold mb-6 text-laundry-dark">Request Franchise Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="investmentLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Level
                </label>
                <select
                  id="investmentLevel"
                  name="investmentLevel"
                  value={formState.investmentLevel}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-laundry-primary focus:border-transparent"
                >
                  <option value="">Select Investment Level</option>
                  <option value="$100k-$150k">$100,000 - $150,000</option>
                  <option value="$150k-$200k">$150,000 - $200,000</option>
                  <option value="$200k-$250k">$200,000 - $250,000</option>
                  <option value="$250k+">$250,000+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Questions or Comments
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-laundry-primary hover:bg-laundry-accent"
                >
                  Request Information Package
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted by our franchise team. 
                Your information will not be sold or distributed.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
