import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface StepData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const ProcessStepsSection = () => {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepData[] = [
    {
      id: 1,
      title: "Select Order Type",
      description: "Choose between on-demand or scheduling ahead.",
      imageSrc: "/lovable-uploads/step-1-steps-laundry.png"
    },
    {
      id: 2,
      title: "Pick Your Services",
      description: "Your one-stop solution for all laundry needs.",
      imageSrc: "/lovable-uploads/step-2-steps-laundry.png"
    },
    {
      id: 3,
      title: "Choose Payment Method",
      description: "Secure payments via Apple Pay, Google Pay, or card.",
      imageSrc: "/lovable-uploads/step-3-steps-laundry.png"
    },
    {
      id: 4,
      title: "Place Your Order & Track It",
      description: "Get real-time updates on your order status.",
      imageSrc: "/lovable-uploads/step-4-steps-laundry.png"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  // For mobile view - step item in horizontal scroll
  const MobileStepItem = ({ step, index }: { step: StepData, index: number }) => {
    const isActive = activeStep === index;
    return (
      <Card 
        className={`min-w-[320px] max-w-[320px] mx-3 p-5 transition-all duration-300 cursor-pointer rounded-2xl ${
          isActive ? 'border-[#1869D3] shadow-lg bg-white scale-105' : 'border-gray-200 bg-gray-50 scale-100'
        }`}
        style={{ minHeight: 160 }}
        onClick={() => handleStepClick(index)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isActive ? 'bg-[#1869D3]' : 'bg-gray-300'
          }`}>
            <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>{index + 1}</span>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isActive ? 'text-[#0E0E0E]' : 'text-gray-700'}`}>{step.title}</h3>
            <p className={`text-sm ${isActive ? 'text-[#212121]' : 'text-gray-500'}`}>{step.description}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-28 xl:px-32 bg-[#E8F1FD]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Laundry Done in 4 Simple Steps</h2>
          <p className="text-[#4D4D4D] mb-6">We believe processes should be simple yet smart to deliver services in</p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-[#4D4D4D]">Absolute Quality</span>
            <span className="text-[#4D4D4D]">|</span>
            <span className="text-[#4D4D4D]">Min. time</span>
            <span className="text-[#4D4D4D]">|</span>
            <span className="text-[#4D4D4D]">Value added price</span>
          </div>
        </div>

        {isMobile ? (
          <div className="w-full">
            {/* Image for current step */}
            <div className="w-full aspect-square mb-8 overflow-hidden rounded-xl shadow-md transition-all duration-500 bg-white flex items-center justify-center" style={{ minHeight: 260 }}>
              <img 
                src={steps[activeStep].imageSrc} 
                alt={steps[activeStep].title}
                className="w-full h-full object-contain transition-opacity duration-300 max-h-[320px]"
              />
            </div>
            {/* Scrollable steps */}
            <ScrollArea className="w-full overflow-x-auto pb-2">
              <div className="flex pb-4 space-x-2">
                {steps.map((step, index) => (
                  <MobileStepItem key={step.id} step={step} index={index} />
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Image - no container, just image with drop shadow */}
            <div className="md:w-1/2 lg:w-5/12 relative flex items-center justify-center">
              <img 
                src={steps[activeStep].imageSrc}
                alt={steps[activeStep].title}
                className="w-full max-w-[450px] aspect-square object-contain transition-opacity duration-300 drop-shadow-2xl"
                style={{ background: 'transparent', minHeight: 350 }}
              />
            </div>
            {/* Steps with vertical progress indicator */}
            <div className="md:w-1/2 lg:w-6/12 relative flex flex-col gap-6">
              <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200 rounded-full z-0" style={{height: '90%'}}></div>
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div 
                    key={step.id}
                    className={`relative flex items-center gap-4 p-6 cursor-pointer transition-all duration-300 rounded-xl z-10 ${
                      isActive ? 'bg-white shadow-lg border-2 border-[#1869D3]' : 'bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    {/* Progress Dot */}
                    <div className="flex flex-col items-center z-20">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isActive ? 'bg-[#1869D3] border-[#1869D3]' : 'bg-gray-200 border-gray-300'
                      }`}>
                        <span className={`font-bold ${isActive ? 'text-white' : 'text-gray-700'}`}>{index + 1}</span>
                      </div>
                      {/* Vertical line for all but last step */}
                      {index < steps.length - 1 && (
                        <div className={`w-1 flex-1 ${isActive ? 'bg-[#1869D3]' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isActive ? 'text-[#1869D3]' : 'text-gray-700'}`}>{step.title}</h3>
                      <p className={`text-base ${isActive ? 'text-[#212121]' : 'text-gray-500'}`}>{step.description}</p>
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
