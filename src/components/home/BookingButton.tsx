
import * as React from "react";
import { ArrowRight } from "lucide-react";

interface BookingButtonProps {
  onClick?: () => void;
}

export const BookingButton: React.FC<BookingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex overflow-hidden flex-col justify-center items-center p-4 mt-10 w-full text-base font-medium text-white bg-blue-700 rounded-lg max-w-[381px] hover:bg-blue-800 transition-colors"
    >
      <div className="flex gap-2 items-center">
        <span className="gap-2 self-stretch my-auto text-white">
          Book For Today
        </span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </button>
  );
};

export default BookingButton;
