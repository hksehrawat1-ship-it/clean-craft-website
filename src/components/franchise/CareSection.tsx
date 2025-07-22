import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const CareSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  return (
    <div
      id="care"
      className="relative overflow-hidden bg-gradient-to-b from-cleancraft-light via-white to-white"
    >
      <div className="md:py-4 py-4 container-custom">
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
                onClick={handleFormOpen}
                className="bg-google-blue hover:bg-google-blue/90 text-white font-medium text-base"
              >
                YES - Get Started
              </Button>

              <Button
                variant="outline"
                className="border-2 font-medium text-base border-gray-300 hidden"
                onClick={handleFormOpen}
              >
                Maybe Later
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
            <div className="relative h-full flex items-center justify-center">
              <Card className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md google-shadow">
                <CardContent className="p-6 text-center space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cleancraft-darkgold">
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-600">
                      Join India's most trusted laundry franchise with our Zero
                      Risk Promise.
                    </p>

                    <div className="bg-gradient-to-r from-cleancraft-light to-cleancraft-light/50 p-4 rounded-lg">
                      <h4 className="font-bold text-google-blue mb-2">
                        62% ROI Potential
                      </h4>
                      <p className="text-sm text-gray-600">
                        ₹100,000+ monthly profit
                      </p>
                    </div>

                    <Button
                      onClick={handleFormOpen}
                      style={{ color: "white" }}
                      className="text-sm sm:text-lg px-7 sm:px-0"
                    >
                      Schedule Your Franchise&nbsp;
                      <br className="block sm:hidden" />
                      Consultation Today
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Schedule Your Franchise Consultation"
        sourceCta="Schedule Consultation"
      />

      {/* Background elements */}
      <div className="absolute top-40 right-0 w-48 h-48 bg-cleancraft-light rounded-full opacity-40 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-cleancraft-light rounded-full opacity-30 blur-3xl -z-10"></div>
    </div>
  );
};

export default CareSection;
