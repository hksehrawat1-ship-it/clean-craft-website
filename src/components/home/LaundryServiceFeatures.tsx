import * as React from "react";
import { Clock, Check, RefreshCw, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
};
const FeatureCard = ({
  title,
  description,
  icon: Icon,
  bgColor,
}: FeatureCardProps) => {
  return (
    <Card className={`${bgColor} text-white border-none overflow-hidden`}>
      <CardContent className="p-6 flex flex-col items-center text-center bg-blue-600">
        <Icon className="w-8 h-8 mb-4" />
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white">{description}</p>
      </CardContent>
    </Card>
  );
};
const LaundryServiceFeatures: React.FC = () => {
  return (
    <section className="py-0 mx:py-10 px-2 md:px-16 lg:px-32 flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-5xl font-black mb-6">
          Finally, a Laundry Service That Gets It.
        </h2>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
          Enter Cleancraft, the answer to the question "Why can't someone else
          just do my laundry?" Cleancraft is a premium-yet-affordable on-demand
          laundry and dry cleaning service in India that takes the laundry
          burden off your shoulders.
        </p>
      </div>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="flex md:grid md:grid-cols-2 gap-6 max-w-5xl w-full mb-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
        <div className="min-w-[90vw] md:min-w-0 snap-center">
          <FeatureCard
            title="Hygiene First"
            description="Your clothes are cleaned individually and hygienically, with each order processed separately to avoid any mix-up."
            icon={RefreshCw}
            bgColor="bg-blue-700"
          />
        </div>
        <div className="min-w-[90vw] md:min-w-0 snap-center">
          <FeatureCard
            title="Save Time & Effort"
            description="No more trips to the laundromat or hunting for 'dry cleaning near me'. Cleancraft comes to your doorstep."
            icon={Clock}
            bgColor="bg-blue-500"
          />
        </div>
        <div className="min-w-[90vw] md:min-w-0 snap-center">
          <FeatureCard
            title="Reliability & Trust"
            description="From delicate silks to daily cottons, our trained staff and modern machines ensure nothing is damaged or lost."
            icon={Handshake}
            bgColor="bg-blue-300"
          />
        </div>
        <div className="min-w-[90vw] md:min-w-0 snap-center">
          <FeatureCard
            title="Affordable Luxury"
            description="Enjoy premium laundry service without breaking the bank. Think 5-star hotel laundry at local dhoba prices."
            icon={Check}
            bgColor="bg-blue-300"
          />
        </div>
        {/* Last callout div as a card for scroll on mobile only */}
        <div className="min-w-[90vw] md:hidden snap-center">
          <div className="bg-blue-500 p-8 rounded-lg text-center w-full h-full flex items-center justify-center">
            <p className="text-lg font-bold text-white">
              Instead of spending your precious time washing and ironing, now
              you can schedule a pickup in seconds and go about your day. Our
              professional team handles everything and delivers it back the same
              day, fresh, clean, and ready to wear.
            </p>
          </div>
        </div>
      </div>
      {/* Desktop: full-width callout below grid */}
      <div className="hidden md:block bg-blue-500 p-8 rounded-lg text-center max-w-5xl w-full">
        <p className="text-lg font-bold text-white">
          Instead of spending your precious time washing and ironing, now you
          can schedule a pickup in seconds and go about your day. Our
          professional team handles everything and delivers it back the same
          day, fresh, clean, and ready to wear.
        </p>
      </div>
    </section>
  );
};
export default LaundryServiceFeatures;
