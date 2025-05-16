import * as React from "react";
import InstructionStep from "./InstructionStep";
import BookingButton from "./BookingButton";
import { useIsMobile } from "@/hooks/use-mobile";

const YourFirstPickupEssentials: React.FC = () => {
  const isMobile = useIsMobile();

  const steps = [
    {
      icon: "/lovable-uploads/select-schedule-icon.png",
      title: "Select & Schedule",
      description: "Begin by choosing the services you need - Wash and Fold, Dry Cleaning, or Shoe Cleaning. Schedule a convenient pickup time directly through our app."
    },
    {
      icon: "/lovable-uploads/pack-bag-icon.png",
      title: "Pack One Service per bag",
      description: "For example, place items for Wash and Iron in Bag 1, Wash and Fold in Bag 2, and Dry Cleaning in Bag 3, etc. You can use disposable bags for your first order. Your items will be returned in reusable CleanCraft bags."
    },
    {
      icon: "/lovable-uploads/tag-bags-icon.png",
      title: "Tag Your Bags",
      description: "Use sticky notes to label each bag, ensuring we process your items accurately. Thank you!"
    },
    {
      icon: "/lovable-uploads/doorstep-pickup-icon.png",
      title: "Doorstep Pickup",
      description: "We keep you in the loop! You'll receive a notification letting you know when your Dasher is on their way to collect your bags. They'll bring them to our nearest CleanCraft Live Studio for the premium care your items deserve."
    }
  ];

  const MobileStep = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="flex gap-4 items-start py-4">
      <div className="w-8 h-8 rounded-full bg-[#E8F1FD] flex items-center justify-center">
        <img src={icon} alt={title} className="w-5 h-5 object-contain" />
      </div>
      <div>
        <h3 className="font-medium text-base mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between gap-10 md:gap-20 max-w-7xl w-full`}>
        {isMobile ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className="text-[32px] font-black text-stone-950 mb-6">
              Your First Pickup <span className="text-[#1869D3]">Essentials</span>
            </h1>
            
            <div className="flex flex-col divide-y">
              {steps.map((step, index) => (
                <MobileStep key={index} {...step} />
              ))}
            </div>

            <button 
              className="w-full mt-8 bg-[#1869D3] text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2"
              onClick={() => console.log("Booking initiated")}
            >
              Book For Today
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
          </div>
        ) : (
          <>
            <header className="flex flex-col justify-center my-auto min-w-60 w-full md:w-[381px]">
              <h1 className="text-4xl md:text-7xl font-black text-stone-950">
                Your First <br />
                Pickup <br />
                <span className="text-[#1869D3]">Essentials</span>
              </h1>
              <BookingButton onClick={() => console.log("Booking initiated")} />
            </header>

            <div className="flex flex-col justify-center items-start gap-6 min-w-60 w-[596px] max-md:max-w-full">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-[#E8F1FD] flex items-center justify-center flex-shrink-0">
                    <img src={step.icon} alt={step.title} className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">{step.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YourFirstPickupEssentials;
