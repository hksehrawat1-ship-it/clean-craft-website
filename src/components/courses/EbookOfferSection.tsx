import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ebookFeatures = [
  "Why Most Laundry Businesses Fail in the First 6 Months",
  "Laundry Business Model Explained (India)",
  "₹5–7 Lakh Laundry Setup – Full Cost Breakdown",
  "Which Machines to Buy (Avoid Costly Mistakes)",
  "How Laundry Actually Works (Step-by-Step)",
  "How Much You Can Earn (Real Numbers)",
  "7 Mistakes That Can Cost You ₹5 Lakhs",
  "Real Small Laundry Setup Example",
  "What This Guide DOES NOT Cover",
  "If You Are Serious About Starting",
];

const EbookOfferSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 md:mb-10">
        <p className="text-base md:text-lg font-bold text-[#FF5A3C] mb-3 tracking-wide">
          Don't Wait
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Get the Ebook for just{" "}
          <span className="text-[#1869D3]">₹199</span>
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Laundry Business Starter Blueprint
          </h3>
          <p className="text-sm md:text-base text-gray-500">
            ₹7-10 L Safe Start Plan
          </p>
        </div>

        <ul className="space-y-3 md:space-y-4 mb-8">
          {ebookFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className="flex-shrink-0 w-5 h-5 text-[#1869D3] mt-0.5"
                strokeWidth={3}
              />
              <span className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="w-full bg-[#1869D3] hover:bg-[#1557B0] text-white text-base md:text-lg font-bold py-6 rounded-xl shadow-sm"
          asChild
        >
          <a href="/in/learning/laundry-training-book">
            Get the Ebook for ₹199
          </a>
        </Button>
      </div>
    </section>
  );
};

export default EbookOfferSection;
