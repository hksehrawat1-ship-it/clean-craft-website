import {
  Check,
  BadgeCheck,
  BadgePercent,
  CircleDollarSign,
} from "lucide-react";

const Guarantees = () => {
  const guaranteesList = [
    {
      id: 1,
      title: "Skill Mastery Guarantee",
      description:
        "If you attend all sessions and complete the practical assignments, we guarantee you will master all the core laundry techniques—washing, dry cleaning, stain removal, and fabric care.",
    },
    {
      id: 2,
      title: "Certificate of Completion Guarantee",
      description:
        "Every student who completes the course will receive a government-acknowledged or Clean Craft-backed certificate, which adds credibility to your resume or future business.",
    },
    {
      id: 3,
      title: "Business Start-Up Support Guarantee",
      description:
        "After training, we provide a free one-on-one business consultation to help you start your own laundry business.",
    },
    {
      id: 4,
      title: "Internship or Live Demo Guarantee",
      description:
        "You will get to work on real customer clothes in a live store setting before completing the course.",
    },
    {
      id: 5,
      title: "Job Assistance Guarantee",
      description:
        "We help top performers get placed in Clean Craft stores or other partner locations across India.",
    },
    {
      id: 7,
      title: "Lifetime Access Guarantee",
      description:
        "All students get lifetime access to updated training material via our online portal.",
    },
  ];

  return (
    <section id="guarantees" className="py-16 bg-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Clean Craft Guarantee
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to your success. Here are our promises to you when
            you join our training program.
          </p>
        </div>

        {/* Money Back Guarantee Highlight */}
        <div className="max-w-4xl mx-auto mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 md:p-8 rounded-xl shadow-md border border-orange-200 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-orange-500 rounded-full p-4 inline-flex">
              <CircleDollarSign className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                Money-Back Guarantee
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                If after the first two classes you feel this training isn't for
                you, we'll refund{" "}
                <span className="font-bold">100% of your fees</span>. No
                questions asked.
              </p>
              <a
                href="https://cleancraft.mojo.page/best-laundry-training-institute-in-india"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1A73E8] text-white text-sm font-semibold text-center hover:bg-[#1666c1] transition min-h-[20px] min-w-[180px] px-5 py-2 rounded-full"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {guaranteesList.map((guarantee) => (
            <div
              key={guarantee.id}
              className="bg-white p-6 rounded-xl shadow-sm flex gap-4 transition-all hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="bg-[#1A73E8] rounded-full p-2 inline-flex">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{guarantee.title}</h3>
                <p className="text-gray-600">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our guarantees reflect our confidence in our training program and
            our commitment to ensuring you get real value from your investment.
            We're invested in your success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
