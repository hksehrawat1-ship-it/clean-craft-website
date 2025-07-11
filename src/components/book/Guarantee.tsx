import React from "react";
import { CheckCircle } from "lucide-react";

const Guarantee = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-blue-50">
              <CheckCircle className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AUTHOR GUARANTEE
          </h2>

          <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-500">
            <p className="text-xl mb-4">
              <span className="font-bold">100% money-back guarantee</span> if
              you don't get what you want.
            </p>
            <p className="text-lg text-grey-900">
              No questions asked, just mail your payment screenshot and ask for
              a refund.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <a
              href="https://cleancraft.mojo.page/online-laundry-training-in-india"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#1869D3] text-white rounded-full text-lg font-semibold hover:bg-[#155bb6] transition duration-300"
            >
              Download Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
