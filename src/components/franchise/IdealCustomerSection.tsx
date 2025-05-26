import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, DollarSign, User, Handshake } from "lucide-react";

const IdealCustomerSection = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            This Franchise Is <span className="gradient-text">Perfect</span> <span className="text-google-green">IF YOU ARE:</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Join hundreds of successful franchise owners who found their perfect business match
          </p>
        </div>
        
        <div className="franchise-grid-4 mb-16">
          <Card className="franchise-card franchise-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-blue mx-auto">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Business Owner
              </h3>
              <p className="text-gray-600">
                A businessman tired of rising competition and low margins
              </p>
            </CardContent>
          </Card>

          <Card className="franchise-card franchise-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-red mx-auto">
                <User className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Salaried Professional
              </h3>
              <p className="text-gray-600">
                A salaried professional looking for a stable side business
              </p>
            </CardContent>
          </Card>

          <Card className="franchise-card franchise-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-green mx-auto">
                <Handshake className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                First-Time Entrepreneur
              </h3>
              <p className="text-gray-600">
                A first-time entrepreneur seeking a proven system
              </p>
            </CardContent>
          </Card>

          <Card className="franchise-card franchise-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-yellow mx-auto">
                <DollarSign className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Freedom Seeker
              </h3>
              <p className="text-gray-600">
                Someone wanting financial freedom with minimal risk
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button className="franchise-button-primary franchise-pulse-soft text-lg px-8 py-4 h-auto">
            Get Case Studies from People Like You
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IdealCustomerSection;
