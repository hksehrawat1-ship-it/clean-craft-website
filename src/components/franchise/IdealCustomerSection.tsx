import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, DollarSign, User, Handshake } from "lucide-react";
import { useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const IdealCustomerSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleGetCaseStudies = () => {
    setIsFormOpen(true);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="md:text-heading-lg text-lg font-bold mb-4">
            This Franchise is <span className="gradient-text">PERFECT</span>{" "}
            <span className="text-google-green">If You Are:</span>
          </h2>
          <p className="text-body-lg text-gray-600">
            Join hundreds of successful franchise owners who found their perfect
            business match
          </p>
        </div>

        <div className="franchise-grid-4 mb-8">
          <Card
            className="franchise-card franchise-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-blue mx-auto">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-title-md font-semibold mb-3 text-gray-900">
                Business Owner
              </h3>
              <p className="text-gray-600">
                A businessman tired of rising competition and low margins
              </p>
            </CardContent>
          </Card>

          <Card
            className="franchise-card franchise-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-red mx-auto">
                <User className="h-8 w-8" />
              </div>
              <h3 className="text-title-md font-semibold mb-3 text-gray-900">
                Salaried Professional
              </h3>
              <p className="text-gray-600">
                A salaried professional looking for a stable side business
              </p>
            </CardContent>
          </Card>

          <Card
            className="franchise-card franchise-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-green mx-auto">
                <Handshake className="h-8 w-8" />
              </div>
              <h3 className="text-title-md font-semibold mb-3 text-gray-900">
                First-Time Entrepreneur
              </h3>
              <p className="text-gray-600">
                A first-time entrepreneur seeking a proven system
              </p>
            </CardContent>
          </Card>

          <Card
            className="franchise-card franchise-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="p-6 text-center">
              <div className="franchise-icon-container franchise-icon-yellow mx-auto">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-title-md font-semibold mb-3 text-gray-900">
                Freedom Seeker
              </h3>
              <p className="text-gray-600">
                Someone wanting financial freedom with minimal risk
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-0 rounded-2xl">
          <Button
            onClick={handleGetCaseStudies}
            className="text-sm sm:text-lg px-6 sm:px-10 py-6 sm:py-7 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-xl shadow-md transition duration-300 w-full sm:w-auto text-center break-words max-w-full sm:max-w-xl"
          >
            Be a part of CleanCraft
          </Button>
        </div>

        <FranchiseFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Download Success Case Studies"
          sourceCta="Get Case Studies"
        />
      </div>
    </section>
  );
};

export default IdealCustomerSection;
