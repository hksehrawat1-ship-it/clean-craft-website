import { AlertTriangle, XCircle, TrendingDown } from "lucide-react";

const ProblemSection = () => {
  const failureReasons = [
    "Wrong machine investment",
    "No knowledge of chemicals",
    "Pricing mistakes",
    "No real process understanding",
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <AlertTriangle className="w-4 h-4" />
            The Harsh Reality
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="text-red-600">90% People Fail</span> in the
            Laundry Business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {failureReasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white border-2 border-red-100 rounded-xl p-6 hover:border-red-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Result Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrendingDown className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-red-100 font-semibold mb-1">
                Result
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Heavy Loss + Business Shut Down
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProblemSection;
