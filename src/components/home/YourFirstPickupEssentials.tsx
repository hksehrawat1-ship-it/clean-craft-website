import * as React from "react";
import BookingButton from "./BookingButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaCalendarCheck, FaBoxOpen, FaTag, FaDoorOpen } from "react-icons/fa";
import { IconType } from "react-icons";

interface Step {
  icon: IconType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: FaCalendarCheck,
    title: "Select & Schedule",
    description:
      "Begin by choosing the services you need – Wash and Fold, Dry Cleaning, or Shoe Cleaning. Schedule a convenient pickup time directly through our app.",
  },
  {
    icon: FaBoxOpen,
    title: "Pack One Service per bag",
    description:
      "For example, place items for Wash and Iron in Bag 1, Wash and Fold in Bag 2, and Dry Cleaning in Bag 3. You can use disposable bags for your first order; your items will be returned in reusable CleanCraft bags.",
  },
  {
    icon: FaTag,
    title: "Tag Your Bags",
    description:
      "Use sticky notes to label each bag, ensuring we process your items accurately. Thank you!",
  },
  {
    icon: FaDoorOpen,
    title: "Doorstep Pickup",
    description:
      "We keep you in the loop! You'll receive a notification when your Dasher is en-route to collect your bags. They'll bring them to our nearest CleanCraft Live Studio for the premium care your items deserve.",
  },
];

const MobileStep: React.FC<Step> = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4 items-start py-4">
    <div className="w-8 h-8 rounded-full bg-[#E8F1FD] flex items-center justify-center">
      <Icon className="w-7 h-7 text-[#1869D3]" />
    </div>
    <div>
      <h3 className="font-medium text-base mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const DesktopStep: React.FC<Step> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4 w-full">
    <div className="w-12 h-12 rounded-full bg-[#E8F1FD] flex items-center justify-center flex-shrink-0">
      <Icon className="w-7 h-7 text-[#1869D3]" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">{title}</h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const YourFirstPickupEssentials: React.FC = () => {
  const isMobile = useIsMobile();

  const handleBookingClick = () => {
    if (import.meta.env.DEV) {
      console.log("Booking initiated");
    }
    // TODO: Add real booking action here
  };

  return (
    <div className="container mx-auto">
      <div
        className={`flex ${
          isMobile ? "flex-col" : "flex-row"
        } justify-between gap-10 md:gap-20 max-w-7xl w-full`}
      >
        {isMobile ? (
          <div className="bg-white rounded-2xl px-2 py-2 shadow-sm">
            <h1 className="text-[20px] font-bold  text-center text-stone-950 mb-6">
              Your First Pickup{" "}
              <span className="text-[#1869D3]">Essentials</span>
            </h1>

            <div className="flex flex-col divide-y">
              {steps.map((step) => (
                <MobileStep key={step.title} {...step} />
              ))}
            </div>

            <button
              className="button-primary w-full mt-8 flex items-center justify-center"
              onClick={handleBookingClick}
            >
              Book For Today
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <header className="flex flex-col justify-center my-auto min-w-60 w-full md:w-[381px]">
              <h1 className="text-3xl md:text-7xl font-black text-stone-950">
                Your First Pickup <br />
                <span className="text-[#1869D3]">Essentials</span>
              </h1>
              <BookingButton onClick={handleBookingClick} />
            </header>

            <div className="flex flex-col justify-center items-start gap-6 min-w-60 w-[596px] max-md:max-w-full">
              {steps.map((step) => (
                <DesktopStep key={step.title} {...step} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YourFirstPickupEssentials;
