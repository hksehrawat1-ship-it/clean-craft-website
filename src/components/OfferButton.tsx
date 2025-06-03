import * as React from "react";

interface OfferButtonProps {
  onClick?: () => void;
  className?: string;
}

export const OfferButton: React.FC<OfferButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 items-center self-stretch px-3 py-2 my-auto text-xl font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors ${className}`}
      aria-label="Claim your $50 credit"
    >
      {/* Gift icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-white"
        aria-hidden="true"
      >
        <rect x="3" y="8" width="18" height="13" rx="2" fill="#fff" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M12 8V21" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 12h18" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="8.5" cy="6.5" r="2.5" fill="#2563eb" />
        <circle cx="15.5" cy="6.5" r="2.5" fill="#2563eb" />
      </svg>
      <span className="self-stretch my-auto">Claim Your $50</span>
    </button>
  );
};
