import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, title: "City" },
  { id: 2, title: "Services" },
  { id: 3, title: "Details" },
  { id: 4, title: "Confirm" }
];

export const BookingSteps: React.FC<BookingStepsProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  currentStep > step.id
                    ? "bg-brand-blue border-brand-blue text-white"
                    : currentStep === step.id
                    ? "bg-white border-brand-blue text-brand-blue"
                    : "bg-white border-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 font-medium transition-colors duration-300",
                  currentStep >= step.id ? "text-brand-blue" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
          <div
            className="h-full bg-brand-blue transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
      
      {/* Mobile Progress Text */}
      <div className="text-center text-sm text-muted-foreground md:hidden">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};