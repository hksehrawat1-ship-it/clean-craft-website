
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface InstructionStepProps {
  title: string;
  description: string;
  iconSrc?: string;
}

const InstructionStep: React.FC<InstructionStepProps> = ({
  title,
  description,
  iconSrc
}) => {
  const isMobile = useIsMobile();
  
  return (
    <article className={`flex gap-4 ${isMobile ? 'mt-0 min-w-[280px] max-w-[280px]' : 'mt-8 max-w-full w-[498px]'} ${isMobile ? '' : 'first:mt-0'}`}>
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          className="object-contain shrink-0 self-start w-8 aspect-square"
          aria-hidden="true"
        />
      ) : (
        <img
          src="/lovable-uploads/7321c197-2961-425a-aea5-b4b5d4b48e5a.png"
          alt=""
          className="object-contain shrink-0 self-start w-8 h-8"
          aria-hidden="true"
        />
      )}
      <div className={`flex flex-col justify-center ${isMobile ? 'w-full' : 'min-w-60 w-[482px] max-md:max-w-full'}`}>
        <h3 className="text-xl font-bold text-stone-950">
          {title}
        </h3>
        <p className="mt-4 text-base text-neutral-800 max-md:max-w-full">
          {description}
        </p>
      </div>
    </article>
  );
};

export default InstructionStep;
