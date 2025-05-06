import * as React from "react";
import InstructionStep from "./InstructionStep";
import BookingButton from "./BookingButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const YourFirstPickupEssentials: React.FC = () => {
  const isMobile = useIsMobile();

  const handleBooking = React.useCallback(() => {
    // Implement booking logic here
    console.log("Booking initiated");
  }, []);

  return (
    <section className="flex flex-col justify-center items-center px-5 md:px-32 py-24">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between gap-20 bg-white max-md:max-w-full`}>
        <header className="flex flex-col justify-center my-auto min-w-60 w-full md:w-[381px]">
          <h1 className="text-4xl md:text-7xl font-black text-stone-950">
            Your First <br />
            Pickup <br />
            <span style={{ color: "rgba(24,105,211,1)" }}>Essentials</span>
          </h1>
          <BookingButton onClick={handleBooking} />
        </header>

        {isMobile ? (
          <ScrollArea className="w-full overflow-x-auto">
            <div className="flex flex-row gap-4 pb-4 min-w-min">
              <InstructionStep
                title="Select & Schedule"
                description="Begin by choosing the services you need - Wash and Fold, Dry Cleaning, or Shoe Cleaning. Schedule a convenient pickup time directly through our app."
              />

              <InstructionStep
                title="Pack One Service per bag"
                description="For example, place items for Wash and Iron in Bag 1, Wash and Fold in Bag 2, and Dry Cleaning in Bag 3, etc. You can use disposable bags for your first order. Your items will be returned in reusable CleanCraft bags."
                iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/5d184dd3bd8c0f0f93f09fc0015e5304d9926eb6?placeholderIfAbsent=true"
              />

              <InstructionStep
                title="Tag Your Bags"
                description="Use sticky notes to label each bag, ensuring we process your items accurately. Thank you!"
                iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/93da15b32d75f187c14f3e61c47bf30f25ab4f3a?placeholderIfAbsent=true"
              />

              <InstructionStep
                title="Doorstep Pickup"
                description="We keep you in the loop! You'll receive a notification letting you know when your Dasher is on their way to collect your bags. They'll bring them to our nearest CleanCraft Live Studio for the premium care your items deserve."
                iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/437bc4f95a186d5b4b1d15974c32c497b42f9a39?placeholderIfAbsent=true"
              />
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col justify-center items-start min-w-60 w-[596px] max-md:max-w-full">
            <InstructionStep
              title="Select & Schedule"
              description="Begin by choosing the services you need - Wash and Fold, Dry Cleaning, or Shoe Cleaning. Schedule a convenient pickup time directly through our app."
            />

            <InstructionStep
              title="Pack One Service per bag"
              description="For example, place items for Wash and Iron in Bag 1, Wash and Fold in Bag 2, and Dry Cleaning in Bag 3, etc. You can use disposable bags for your first order. Your items will be returned in reusable CleanCraft bags."
              iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/5d184dd3bd8c0f0f93f09fc0015e5304d9926eb6?placeholderIfAbsent=true"
            />

            <InstructionStep
              title="Tag Your Bags"
              description="Use sticky notes to label each bag, ensuring we process your items accurately. Thank you!"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/93da15b32d75f187c14f3e61c47bf30f25ab4f3a?placeholderIfAbsent=true"
            />

            <InstructionStep
              title="Doorstep Pickup"
              description="We keep you in the loop! You'll receive a notification letting you know when your Dasher is on their way to collect your bags. They'll bring them to our nearest CleanCraft Live Studio for the premium care your items deserve."
              iconSrc="https://cdn.builder.io/api/v1/image/assets/71027c5e28eb4a578347490005020d7c/437bc4f95a186d5b4b1d15974c32c497b42f9a39?placeholderIfAbsent=true"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default YourFirstPickupEssentials;
