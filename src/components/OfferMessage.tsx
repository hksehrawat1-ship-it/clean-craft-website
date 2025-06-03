import * as React from "react";

interface OfferMessageProps {
  className?: string;
}

export const OfferMessage: React.FC<OfferMessageProps> = ({ className }) => {
  return (
    <p
      className={`self-stretch my-auto text-lg text-stone-950 w-[446px] max-md:max-w-full ${className}`}
    >
      Schedule your first order & get a 100 Rs.
      <span className="text-[#1869D3]"> credit instantly. </span>
      No strings attached. Click button to see services.
    </p>
  );
};
