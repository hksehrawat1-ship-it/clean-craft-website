
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
  occupation: string;
  avatarSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  name, 
  location, 
  occupation, 
  avatarSrc = "/lovable-uploads/7321c197-2961-425a-aea5-b4b5d4b48e5a.png" 
}) => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4 flex">
            {Array(5).fill(0).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-sm flex-grow">{quote}</p>
          <div className="flex items-center mt-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
              {avatarSrc && <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />}
            </div>
            <div>
              <p className="font-bold">{name}, {location}</p>
              <p className="text-sm text-gray-600">{occupation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomerTestimonials: React.FC = () => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-32 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Trusted by Busy Indians Nationwide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Testimonial 
            quote="Cleancraft saved me 5 hours every week. As a software engineer, time is money for me. Now I just schedule a pickup from my office, and by the time I'm home, fresh clothes are waiting. Absolutely love the convenience and quality!"
            name="Rajiv M."
            location="Bengaluru"
            occupation="Software Engineer"
            avatarSrc="/lovable-uploads/afc6fb2e-8af2-44c6-9280-265a5d7c29ad.png"
          />
          
          <Testimonial 
            quote="I was skeptical about giving my clothes to a service, but Cleancraft proved me wrong. The clothes come back spotlessly clean and neatly packed. Even my delicate sarees and silk blouses are handled with great care. It's premium service on a budget."
            name="Ananya S."
            location="Mumbai"
            occupation="Homemaker"
            avatarSrc="/lovable-uploads/c1e1acbc-b795-4d59-9275-a1dd3a19a4f6.png"
          />
          
          <Testimonial 
            quote="Fast, reliable, and super affordable. As a college student, I don't have time (or patience) for laundry. Cleancraft's same-day delivery is a game-changer during exams. And they even got a tough coffee stain out of my favorite shirt!"
            name="Karan T."
            location="Delhi"
            occupation="Student"
            avatarSrc="/lovable-uploads/fbb95d0a-c991-4e33-be76-805f71f12699.png"
          />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-8">
          <div className="flex items-center mb-4 md:mb-0">
            {Array(5).fill(0).map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <p className="ml-2 font-bold">4.8/5 average from 2,000+ reviews</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold">Over 50,000 garments cleaned last month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
