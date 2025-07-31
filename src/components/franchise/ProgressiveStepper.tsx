// ProgressiveStepper.tsx

import React, { useEffect, useState } from "react";
import { CheckCircle, Phone, TrendingUp } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Props {
  steps: Step[];
}

const ProgressiveStepper: React.FC<Props> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setActiveStep(2);
      const startTime = Date.now();
      const duration = 2500;

      const animateLine = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setLineProgress(progress);
        if (progress < 1) {
          requestAnimationFrame(animateLine);
        }
      };

      requestAnimationFrame(animateLine);
    }, 500);

    return () => clearTimeout(timer1);
  }, []);

  const getStepClass = (stepId: number) => {
    if (stepId === 1) return "text-green-600 bg-green-100";
    if (stepId === 2 && activeStep >= 2) return "text-blue-600 bg-blue-100";
    return "text-gray-400 bg-gray-100";
  };

  const getLineClass = (lineIndex: number) => {
    if (lineIndex === 0) {
      return `h-12 w-0.5 mx-auto transition-colors duration-300 ${
        lineProgress > 0 ? "bg-blue-500" : "bg-gray-300"
      }`;
    }
    return "h-12 w-0.5 mx-auto bg-gray-300";
  };

  return (
    <div className="w-full max-w-md mx-auto py-8">
      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          <div className="flex items-start space-x-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${getStepClass(
                step.id
              )}`}
            >
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className={`font-semibold transition-colors duration-500 ${
                  step.id === 1
                    ? "text-green-600"
                    : step.id === 2 && activeStep >= 2
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </h4>
              <p
                className={`text-sm transition-colors duration-500 ${
                  step.id === 1
                    ? "text-green-600"
                    : step.id === 2 && activeStep >= 2
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="flex justify-start ml-6 my-2">
              <div
                className={getLineClass(index)}
                style={{
                  background:
                    index === 0
                      ? `linear-gradient(to bottom, 
                  #3b82f6 0%, 
                  #3b82f6 ${lineProgress * 100}%, 
                  #d1d5db ${lineProgress * 100}%, 
                  #d1d5db 100%)`
                      : undefined,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressiveStepper;
