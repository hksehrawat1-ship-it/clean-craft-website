import React from "react";

const features = [
  {
    title: "Business Setup Guide",
    description:
      "Step-by-step instructions to establish your laundry business with minimal investment",
  },
  {
    title: "Operational Excellence",
    description:
      "Learn how to streamline operations for maximum efficiency and customer satisfaction",
  },
  {
    title: "Marketing Strategies",
    description:
      "Effective techniques to attract and retain customers in your local market",
  },
  {
    title: "Financial Management",
    description:
      "Tools and formulas to manage finances and ensure profitability",
  },
  {
    title: "Scaling Your Business",
    description:
      "Proven methods to grow from a small operation to a high-revenue enterprise",
  },
  {
    title: "Technology Integration",
    description:
      "How to leverage modern technology to improve service quality and business reach",
  },
];

const Features = () => {
  return (
    <section className=" md:py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's Inside The Book
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guidance to help you succeed in the laundry industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#1869D3] hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center p-2 bg-laundry-gold rounded-full mb-4">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}.</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-laundry-dark">
            And much more!{" "}
            <span className="text-laundry-gold">No More Secrets</span> in
            Laundry and Dry Cleaning.
          </p>

          {/* ✅ CTA Updated */}
          <div className="mt-8">
            <a
              href="https://cleancraft.mojo.page/online-laundry-training-in-india"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-white bg-[#1869D3] hover:bg-[#155bb6] rounded-full text-lg font-semibold transition duration-300"
            >
              Download Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
