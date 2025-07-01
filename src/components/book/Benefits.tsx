import React from "react";

const benefits = [
  {
    title: "Laundry Setup Cost India",
    description:
      "Detailed breakdown of exact investment needed to start a laundry business with budget-friendly options for different business sizes.",
  },
  {
    title: "Step-by-Step Business Plan",
    description:
      "Follow our comprehensive laundry business plan India experts use to establish and grow your business from scratch.",
  },
  {
    title: "Laundromat & Dry Cleaning Guide",
    description:
      "Complete insights on how to run both laundromat and dry cleaning business in India successfully with proven operational models.",
  },
  {
    title: "Financial Projections",
    description:
      "Access practical tools and financial models to turn your laundry franchise business into one of the most profitable business in India 2025.",
  },
];

const Benefits = () => {
  return (
    <section
      id="learn-more"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why You Need This laundromats Business Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock the potential of one of the best{" "}
            <span className="font-semibold">small business ideas India</span>{" "}
            has to offer with expert guidance on{" "}
            <span className="font-semibold">
              how to run laundry business successfully
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#1869D3]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#1869D3]">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
