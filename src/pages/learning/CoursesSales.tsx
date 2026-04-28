import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { CheckCircle2, Flame, Clock, Shield, Star, TrendingUp, Award, Sparkles, Download, Users } from "lucide-react";

type Course = {
  title: string;
  tagline: string;
  originalPrice: number;
  discountedPrice: number;
  discountPct: number;
  highlights: string[];
  featured?: boolean;
};

const courses: Course[] = [
  {
    title: "Complete Guide to Start Laundry Store",
    tagline: "Launch your store with confidence — from setup to first customer.",
    originalPrice: 45000,
    discountedPrice: 25500,
    discountPct: 43,
    highlights: [
      "Store setup checklist & investment plan",
      "Machine selection & vendor contacts",
      "Staff hiring & SOP templates",
    ],
  },
  {
    title: "Advanced – Laundry Business Excellence",
    tagline: "Scale operations, cut costs, and build a predictable laundry business.",
    originalPrice: 75000,
    discountedPrice: 35500,
    discountPct: 53,
    highlights: [
      "Unit economics & pricing strategy",
      "Operations dashboard & KPIs",
      "Quality control & customer retention",
    ],
  },
  {
    title: "Laundry Marketing & Profit Growth Accelerator",
    tagline: "Fill your store with paying customers — online and offline.",
    originalPrice: 99000,
    discountedPrice: 45500,
    discountPct: 54,
    highlights: [
      "Local SEO & Google Business Profile",
      "Meta & Google Ads playbook",
      "Referral engine + offer templates",
    ],
  },
  {
    title: "5-Day Practical Laundry Training",
    tagline: "Hands-on training at our Delhi centre — wash, dry, press, stain removal.",
    originalPrice: 25000,
    discountedPrice: 17500,
    discountPct: 30,
    highlights: [
      "Live machine training",
      "Stain removal masterclass",
      "Industry-recognised certificate",
    ],
  },
];

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const CoursesSales = () => {
  const { countryCode = "in" } = useParams();

  useEffect(() => {
    document.title = "Laundry Business Courses — Save up to 68% | Clean Craft";
    window.scrollTo(0, 0);
  }, []);

  const totalValue = 124000;
  const bundlePrice = 39999;
  const bundleSavings = Math.round(((totalValue - bundlePrice) / totalValue) * 100);

  const registrationHref = `/${countryCode}/learning/laundry-training-course#registration-form`;

  return (
    <>
      <EnhancedSEO
        slug="/learning/laundry-training-course"
        pageType="Course"
        customKeywords={["laundry business course", "laundry training discount", "laundry mastery bundle"]}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />
        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-green-50 py-10 md:py-20 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold mb-4">
                <Flame className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Limited Time — Founder's Pricing
              </div>
              <h1 className="text-[26px] leading-[1.15] md:text-5xl font-bold text-gray-900 mb-4 tracking-[0.02em]">
                Build a Profitable Laundry Business —{" "}
                <span className="text-primary">Without Guesswork</span>
              </h1>
              <p className="text-[15px] md:text-xl text-gray-600 max-w-3xl mx-auto mb-5">
                Get the exact playbooks, SOPs, and marketing systems used by 500+ successful laundry
                owners across India. Pick a single course or save <strong>68%</strong> with the Complete Mastery Bundle.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs md:text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9/5 from 1,200+ students</div>
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-600" /> 7-day money-back</div>
                <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> Certified</div>
              </div>
              <a
                href="#bundle"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-4 shadow-lg transition-colors"
              >
                See the Complete Mastery Bundle →
              </a>
            </div>
          </section>

          {/* MARKET DEMAND BANNER */}
          <section className="bg-yellow-50 border-y border-yellow-200 py-4 md:py-5 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 text-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-yellow-700 shrink-0" />
              <p className="text-sm md:text-lg font-semibold text-yellow-900 tracking-[0.01em]">
                India needs <span className="text-red-700">36,000+ laundries</span> to cater for the growing demand by 2030
              </p>
            </div>
          </section>

          {/* SOCIAL PROOF STRIP */}
          <section className="bg-gray-900 text-white py-6 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs md:text-sm text-gray-300">Stores Launched</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">87.3%</div>
                <div className="text-xs md:text-sm text-gray-300">Choose Full Mastery</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">₹1.24L</div>
                <div className="text-xs md:text-sm text-gray-300">Real Course Value</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">4.9★</div>
                <div className="text-xs md:text-sm text-gray-300">Student Rating</div>
              </div>
            </div>
          </section>

          {/* INDIVIDUAL COURSES */}
          <section className="py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 md:mb-14">
                <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  INDIVIDUAL COURSES (DISCOUNTED)
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-[0.02em] mb-3">
                  Pick the Exact Course You Need
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Every course is standalone — but students save far more with the bundle below.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {courses.map((c) => (
                  <div
                    key={c.title}
                    className={`relative rounded-2xl border bg-white p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow ${
                      c.featured ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
                    }`}
                  >
                    {c.featured && (
                      <div className="absolute -top-3 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="inline-block bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
                      {c.discountPct}% OFF
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 tracking-[0.02em]">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{c.tagline}</p>

                    <ul className="space-y-2 mb-5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-gray-900">
                        {formatINR(c.discountedPrice)}
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        {formatINR(c.originalPrice)}
                      </span>
                    </div>

                    <a
                      href={registrationHref}
                      className="block text-center rounded-md bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3.5 transition-colors"
                    >
                      Enroll in This Course
                    </a>
                    <a
                      href={`${registrationHref}&syllabus=${encodeURIComponent(c.title)}`}
                      className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 underline underline-offset-4"
                    >
                      <Download className="w-4 h-4" />
                      Download the syllabus
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-700 text-base md:text-lg">
                  Total Real Value:{" "}
                  <span className="font-bold text-gray-900">₹1,24,000</span>
                </p>
              </div>
            </div>
          </section>

          {/* BUNDLE OFFER */}
          <section id="bundle" className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-primary via-primary to-blue-700 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-xs font-bold mb-4 shadow-lg">
                ⭐ MOST POPULAR
              </div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold mb-5 ml-0 md:ml-2">
                <Sparkles className="w-4 h-4" />
                Complete Laundry Mastery Bundle
              </div>
              <h2 className="text-[26px] leading-[1.15] md:text-5xl font-bold mb-4 tracking-[0.02em]">
                Get ₹1.24L Value at Just{" "}
                <span className="text-yellow-300">₹39,999</span>
              </h2>
              <p className="text-base md:text-xl text-white/90 mb-2">
                Save 68% — all 4 courses, every playbook, lifetime access.
              </p>
              <p className="text-sm md:text-base text-white/80 mb-7 max-w-2xl mx-auto">
                <strong>87.3%</strong> of our students choose the Complete Laundry Mastery Course —
                because it's just <strong>3.9%</strong> of your ₹10L business investment and covers
                everything from setup to scale.
              </p>

              <div className="bg-white text-gray-900 rounded-2xl p-5 md:p-8 text-left max-w-2xl mx-auto mb-6 md:mb-8 shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <span className="font-semibold">What's Included</span>
                  <span className="text-sm text-gray-500">4 Courses</span>
                </div>
                <ul className="space-y-3">
                  {courses.map((c) => (
                    <li key={c.title} className="flex items-start justify-between gap-3 text-sm md:text-base">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-800">{c.title}</span>
                      </div>
                      <span className="text-gray-500 line-through shrink-0 text-xs md:text-sm">
                        {formatINR(c.originalPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t flex items-center justify-between">
                  <span className="text-gray-600">Total Value</span>
                  <span className="text-base md:text-lg font-bold text-gray-900 line-through">
                    {formatINR(totalValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-900 font-semibold">Your Price Today</span>
                  <span className="text-2xl md:text-3xl font-bold text-green-600">
                    {formatINR(bundlePrice)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm font-semibold text-green-800">
                  <Users className="w-4 h-4 shrink-0" />
                  87.3% of students choose this bundle
                </div>
                <div className="mt-2 text-right text-xs md:text-sm text-red-600 font-semibold">
                  You save {formatINR(totalValue - bundlePrice)} ({bundleSavings}% OFF)
                </div>
              </div>

              <a
                href={registrationHref}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-base md:text-xl px-6 md:px-10 py-4 md:py-5 shadow-xl transition-colors"
              >
                Claim the Mastery Bundle →
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-white/90 mt-5">
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 7-day money-back</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Lifetime access</div>
                <div className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> ROI in 90 days</div>
              </div>
            </div>
          </section>

          {/* WHY NOW */}
          <section className="py-12 md:py-16 px-4 bg-gray-50 pb-24 md:pb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-[0.02em]">
                Why This Costs Less Than a Single Mistake
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6">
                The average laundry business owner loses <strong>₹3–5 lakh</strong> in the first year
                from wrong machine choices, bad pricing, and poor marketing. The Mastery Bundle
                costs just <strong>3.9%</strong> of a typical ₹10L setup — and removes every one of
                those mistakes before you make them.
              </p>
              <a
                href={registrationHref}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-base md:text-lg px-8 py-4 shadow-lg transition-colors"
              >
                Reserve My Seat Now
              </a>
              <p className="text-xs text-gray-500 mt-3">Only a limited number of seats at this price.</p>
            </div>
          </section>
        </main>
        <Footer />

        {/* MOBILE STICKY CTA */}
        <a
          href="#bundle"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-green-600 hover:bg-green-700 text-white text-center font-bold text-base py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
        >
          🔥 Claim Mastery Bundle — ₹39,999
        </a>
      </div>
    </>
  );
};

export default CoursesSales;
