const ProblemSection = () => {
  const failureReasons = [
    {
      emoji: "⚙️",
      title: "Wrong machine investment",
      description: "Buying expensive machines without understanding your actual needs.",
    },
    {
      emoji: "🧪",
      title: "No knowledge of chemicals",
      description: "Using wrong chemicals ruins garments and your reputation.",
    },
    {
      emoji: "💰",
      title: "Pricing mistakes",
      description: "Underpricing or overpricing drives customers away.",
    },
    {
      emoji: "📋",
      title: "No real process understanding",
      description: "Without proper SOPs, quality stays inconsistent.",
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Section 1: Start Your Laundry Business Without Losing Lakhs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-[#1869D3] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Start Your Laundry Business{" "}
              <span className="text-[#1869D3]">Without Losing Lakhs</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              In this industry, no one will teach you how to do dry cleaning or
              laundry professionally. Without knowledge, you will end up losing
              your hard-earned money easily.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why 90% People Fail */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why <span className="text-[#FF5A3C]">90% People Fail</span> in the Laundry Business
          </h2>
        </div>

        <div className="space-y-4 md:space-y-5 mb-8">
          {failureReasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl md:text-4xl leading-none mt-0.5">
                  {reason.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Result Banner */}
        <div className="bg-[#FFEBE6] border border-[#FFD4CC] rounded-2xl p-6 md:p-8 text-center">
          <p className="text-base md:text-lg font-bold text-[#FF5A3C] mb-2">
            Result
          </p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            ₹5-7 lakhs loss + business shutdown
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProblemSection;
