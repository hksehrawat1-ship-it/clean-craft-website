import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Trophy,
  Shirt,
  BadgePercent,
  Users,
  BadgeCheck,
  CircleCheckBig,
  Check,
  Clock,
  Banknote,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const FeaturesSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleScheduleConsultation = () => {
    setIsFormOpen(true);
  };

  return (
    <section id="features" className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-google-blue text-white mb-4 hover:bg-google-blue/90 px-4 py-1.5">
            Our Value Proposition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Smart Choice For Your Franchise Investment
          </h2>
          <p className="text-gray-600 text-lg">
            Make an informed decision with our industry-leading guarantees and
            exceptional profit potential
          </p>
        </div>

        {/* Why Buy This */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-google-blue/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-google-blue" />
            </div>
            <h3 className="text-2xl font-bold text-google-gray">
              Why Buy This?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-highlight h-full border-l-4 border-l-google-blue">
              <CardContent className="p-6">
                <div className="mb-5">
                  <Shirt className="h-10 w-10 text-google-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-google-gray">
                  Always In Demand
                </h3>
                <p className="text-gray-600">
                  Unlike food or fashion, laundry is a non-optional, weekly need
                  – everyone wears clothes and needs them cleaned.
                </p>
              </CardContent>
            </Card>

            <Card className="card-highlight h-full border-l-4 border-l-google-green">
              <CardContent className="p-6">
                <div className="mb-5">
                  <BadgePercent className="h-10 w-10 text-google-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-google-gray">
                  High Profit Margins
                </h3>
                <p className="text-gray-600">
                  With 60%+ profit margins, low manpower, and zero dependency on
                  seasons, this is one of the safest, steadiest and smartest
                  franchises you can start in India today.
                </p>
              </CardContent>
            </Card>

            <Card className="card-highlight h-full border-l-4 border-l-google-red">
              <CardContent className="p-6">
                <div className="mb-5">
                  <Users className="h-10 w-10 text-google-red" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-google-gray">
                  No Technical Background Needed
                </h3>
                <p className="text-gray-600">
                  No perishables, no cooking licenses, no wastage. Just pure
                  service + system + scale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Buy From Us */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-google-green/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-google-green" />
            </div>
            <h3 className="text-2xl font-bold text-google-gray">
              Why Buy From Us
            </h3>
          </div>

          <div className="bg-gradient-to-r from-cleancraft-light to-white border border-cleancraft-light rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center lg:text-left lg:col-span-1">
                <div className="inline-block p-4 bg-white rounded-lg shadow-sm mb-4">
                  <BadgeCheck className="h-12 w-12 text-google-green mx-auto lg:mx-0" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-google-gray">
                  Built For Your Success
                </h3>
                <p className="text-gray-600">
                  We've built Clean Craft to make you win – not just us. 100+
                  franchise owners have already joined.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <CircleCheckBig className="h-6 w-6 text-google-blue" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-google-blue text-lg">
                          Real Guarantees in Legal Documents
                        </h4>
                        <ul className="text-gray-600 mt-2 space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            1000 customers in your first year – or we fund your
                            next 6 months of marketing
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            Store not ready in 30 days? We pay your rent
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            Don’t break even? Get 100% royalty-free for life
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <CircleCheckBig className="h-6 w-6 text-google-red" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-google-red text-lg">
                          Everything You Need to Succeed
                        </h4>
                        <ul className="text-gray-600 mt-2 space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            Complete store setup done for you
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            Training that reveals every secret we've learned
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-google-green mr-2 flex-shrink-0" />
                            Tech and branding designed to convert footfall into
                            loyalty
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Buy Now */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-google-yellow/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-google-yellow" />
            </div>
            <h3 className="text-2xl font-bold text-google-gray">Why Buy Now</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden card-highlight h-full border-l-4 border-l-google-blue">
              <div className="absolute top-0 right-0">
                <div className="bg-google-blue text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                  LIMITED TIME
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Banknote className="h-10 w-10 text-google-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2 text-google-gray">
                      Don't Miss Market Opportunities
                    </h3>
                    <p className="text-gray-600">
                      The laundry industry is consolidating fast, and early
                      movers are locking in premium territories.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden card-highlight h-full border-l-4 border-l-google-red">
              <div className="absolute top-0 right-0">
                <div className="bg-google-red text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                  THIS QUARTER ONLY
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Calendar className="h-10 w-10 text-google-red" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2 text-google-gray">
                      Best Support Package Available Now
                    </h3>
                    <p className="text-gray-600">
                      The investment will never be this low again, and our most
                      powerful support guarantees are for this quarter only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ✅ CTA Button (included) */}
          <div className="flex justify-center items-center py-10 rounded-2xl">
            <Button
              onClick={handleScheduleConsultation}
              style={{ color: "white" }}
            >
              Schedule Your Franchise Consultation Today
            </Button>
          </div>
        </div>

        <FranchiseFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Schedule Your Franchise Consultation"
          sourceCta="Schedule Consultation"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
