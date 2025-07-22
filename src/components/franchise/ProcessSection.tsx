import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  FileText,
  GraduationCap,
  Store,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const ProcessSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClaimTerritory = () => {
    setIsFormOpen(true);
  };

  const processSteps = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Territory Selection",
      description:
        "Choose your premium location with our market analysis support",
      duration: "Day 1-3",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Documentation & Agreement",
      description: "Complete paperwork and franchise agreement signing",
      duration: "Day 4-7",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Training Program",
      description:
        "Comprehensive training on operations, technology, and best practices",
      duration: "Day 8-15",
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Store Setup",
      description:
        "Complete store setup with equipment installation and branding",
      duration: "Day 16-30",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Grand Opening",
      description:
        "Launch your store with marketing support and customer acquisition",
      duration: "Day 30+",
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-brand-blue text-white mb-4">
            Simple 30-Day Process
          </Badge>
          <h2 className="text-heading-lg font-bold mb-4">
            From Application to <span className="gradient-text">Launch</span> in
            30 Days
          </h2>
          <p className="text-body-lg text-gray-600">
            Our streamlined process gets you from zero to profitable franchise
            owner in just one month
          </p>
        </div>

        <div className="franchise-grid-3 mb-16 ">
          {processSteps.map((step, index) => (
            <Card key={index} className="franchise-card relative bg-white">
              <CardContent className="p-6">
                <div className="franchise-icon-container franchise-icon-blue mb-4">
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="text-xs">
                    {step.duration}
                  </Badge>
                </div>
                <h3 className="text-title-lg font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Claim Your Territory CTA Section */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleClaimTerritory}
            size="lg"
            variant="secondary"
            className=" bg-blue-500 text-white font-semibold px-8 py-4 text-lg"
          >
            Apply for Franchise
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        <FranchiseFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Apply for Franchise Now"
          sourceCta="Claim Territory"
        />
      </div>
    </section>
  );
};

export default ProcessSection;
