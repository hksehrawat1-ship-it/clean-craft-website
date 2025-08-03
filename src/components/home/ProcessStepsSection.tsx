import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const ProcessStepsSection = () => {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [countrySuffix, setCountrySuffix] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/in")) {
      setCountrySuffix("-in");
    } else {
      setCountrySuffix(""); // default (for /au or others)
    }
  }, []);

  const steps: StepData[] = [
    {
      id: 1,
      title: "Select Order Type",
      description: "Choose between on-demand or scheduling ahead.",
      imageSrc: `/lovable-uploads/step-1-steps-laundry${countrySuffix}.webp`,
    },
    {
      id: 2,
      title: "Pick Your Services",
      description: "Your one-stop solution for all laundry needs.",
      imageSrc: `/lovable-uploads/step-2-steps-laundry${countrySuffix}.webp`,
    },
    {
      id: 3,
      title: "Choose Payment Method",
      description: "Secure payments via Apple Pay, Google Pay, or card.",
      imageSrc: `/lovable-uploads/step-3-steps-laundry${countrySuffix}.webp`,
    },
    {
      id: 4,
      title: "Place Your Order & Track It",
      description: "Get real-time updates on your order status.",
      imageSrc: `/lovable-uploads/step-4-steps-laundry${countrySuffix}.webp`,
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const MobileStepItem = ({
    step,
    index,
  }: {
    step: StepData;
    index: number;
  }) => {
    const isActive = activeStep === index;
    return (
      <Card
        className={`snap-center min-w-[280px] max-w-[280px] mx-2 p-4 transition-all duration-300 cursor-pointer rounded-2xl ${
          isActive
            ? "border-[#1869D3] shadow-lg bg-white"
            : "border-gray-200 bg-gray-50"
        }`}
        onClick={() => handleStepClick(index)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isActive ? "bg-[#1869D3]" : "bg-gray-300"
            }`}
          >
            <span
              className={`font-medium ${
                isActive ? "text-white" : "text-gray-700"
              }`}
            >
              {index + 1}
            </span>
          </div>
          <div>
            <h3
              className={`text-base font-semibold ${
                isActive ? "text-[#0E0E0E]" : "text-gray-700"
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`text-sm ${
                isActive ? "text-[#212121]" : "text-gray-500"
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <section className="py-0 md:py-10 px-2 md:px-12 lg:px-28 xl:px-32 bg-[#E8F1FD]">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">
            Laundry Done in 4 Simple Steps
          </h2>
          <p className="text-[#4D4D4D] mb-4 md:mb-6">
            We believe processes should be simple yet smart to deliver services
            in
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm md:text-base">
            <span className="text-[#4D4D4D]">Absolute Quality</span>
            <span className="text-[#4D4D4D]">|</span>
            <span className="text-[#4D4D4D]">Min. time</span>
            <span className="text-[#4D4D4D]">|</span>
            <span className="text-[#4D4D4D]">Value added price</span>
          </div>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-6">
            {/* Mobile Images - enlarged to 420px */}
            <div className="relative h-[420px] flex items-center justify-center">
              {steps.map((step, index) => (
                <img
                  key={step.id}
                  src={step.imageSrc}
                  alt={step.title}
                  className={`absolute w-auto h-full max-h-[420px] object-contain transition-all duration-300 ${
                    activeStep === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                />
              ))}
            </div>

            {/* Scrollable Steps */}
            <div className="overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
              <div className="flex space-x-3">
                {steps.map((step, index) => (
                  <MobileStepItem key={step.id} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Desktop Image */}
            <div className="md:w-3/5 lg:w-7/12 relative flex items-center justify-center">
              <img
                src={steps[activeStep].imageSrc}
                alt={steps[activeStep].title}
                className="w-full max-w-[650px] aspect-square object-contain transition-opacity duration-300 drop-shadow-2xl"
                style={{ background: "transparent", minHeight: 450 }}
              />
            </div>

            {/* Desktop Steps */}
            <div className="md:w-2/5 lg:w-5/12 relative flex flex-col gap-6">
              <div
                className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200 rounded-full z-0"
                style={{ height: "90%" }}
              ></div>
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center gap-4 p-6 cursor-pointer transition-all duration-300 rounded-xl z-10 ${
                      isActive
                        ? "bg-white shadow-lg border-2 border-[#1869D3]"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="flex flex-col items-center z-20">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          isActive
                            ? "bg-[#1869D3] border-[#1869D3]"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            isActive ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-1 flex-1 ${
                            isActive ? "bg-[#1869D3]" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isActive ? "text-[#1869D3]" : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-base ${
                          isActive ? "text-[#212121]" : "text-gray-500"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessStepsSection;
