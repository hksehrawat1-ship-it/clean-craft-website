import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { CheckCircle2, Flame, Clock, Shield, Star, TrendingUp, Award, Sparkles, Download, Users, Calendar } from "lucide-react";

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

const getNextBatchDate = () => {
  const today = new Date();
  const day = 24;
  let month = today.getMonth();
  let year = today.getFullYear();
  if (today.getDate() > day) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const CoursesSales = () => {
  const { countryCode = "in" } = useParams();

  useEffect(() => {
    document.title = "Online Laundry Training Course India — Learn from Home | Clean Craft";
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
        customKeywords={[
          "online laundry training course",
          "online laundry course India",
          "laundry business course online",
          "learn laundry business from home",
          "laundry training online",
          "laundry mastery bundle",
        ]}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />
        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-green-50 py-7 md:py-20 px-3 md:px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full px-2.5 py-1 text-[11px] md:text-sm font-semibold mb-3">
                <Flame className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Limited Time — Founder's Pricing
              </div>
              <h1 className="text-[24px] leading-[1.2] md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-[0.02em]">
                Build a Profitable Laundry Business —{" "}
                <span className="text-primary">Without Losing Money</span>
              </h1>
              <p className="text-[15px] leading-snug md:text-2xl font-bold text-green-700 max-w-3xl mx-auto mb-4">
                Ask yourself — what are the chances of your success without learning?
              </p>
              <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 rounded-full px-2.5 py-1 text-[11px] md:text-sm font-semibold mb-4">
                💻 100% Online — Learn from Anywhere in India
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] md:text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" /> 4.9/5 from 1,200+ students</div>
                <div className="flex items-center gap-1"><Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" /> Certified</div>
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" /> Lifetime access</div>
              </div>
              <a
                href="#bundle"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-[15px] md:text-lg px-5 md:px-8 py-3.5 md:py-4 shadow-lg transition-colors"
              >
                See the Complete Mastery Bundle →
              </a>
            </div>
          </section>

          {/* MARKET DEMAND BANNER */}
          <section className="bg-yellow-50 border-y border-yellow-200 py-3 md:py-5 px-3 md:px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 md:gap-3 text-center">
              <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-yellow-700 shrink-0" />
              <p className="text-[13px] leading-snug md:text-lg font-semibold text-yellow-900 tracking-[0.01em]">
                India needs <span className="text-red-700">36,000+ laundries</span> to cater for the growing demand by 2030
              </p>
            </div>
          </section>

          {/* ONLINE TRAINING ADVANTAGES */}
          <section className="py-8 md:py-14 px-3 md:px-4 bg-white">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-block bg-green-100 text-green-800 text-[11px] md:text-sm font-bold px-2.5 py-1 rounded-full mb-2.5">
                  100% ONLINE LAUNDRY TRAINING
                </div>
                <h2 className="text-[22px] leading-[1.2] md:text-4xl font-bold text-gray-900 tracking-[0.02em] mb-2.5">
                  Learn Laundry Business Online — From Any City in India
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-[14px] md:text-base">
                  No travel. No hotels. No time off work. Watch, learn, and launch your laundry
                  business on your own schedule — from your phone, laptop, or tablet.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-5">
                {[
                  { icon: "📱", title: "Mobile Friendly", desc: "Learn on phone or laptop" },
                  { icon: "🎥", title: "HD Video Lessons", desc: "Recorded by experts" },
                  { icon: "♾️", title: "Lifetime Access", desc: "Re-watch anytime" },
                  { icon: "🇮🇳", title: "Hinglish", desc: "Learn in your language" },
                ].map((f) => (
                  <div key={f.title} className="text-center p-3 md:p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <div className="text-2xl md:text-3xl mb-1.5">{f.icon}</div>
                    <div className="font-bold text-gray-900 text-[13px] md:text-base leading-tight">{f.title}</div>
                    <div className="text-[11px] md:text-sm text-gray-600 mt-1 leading-tight">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* INDIVIDUAL COURSES */}
          <section className="py-9 md:py-20 px-3 md:px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-7 md:mb-14">
                <div className="inline-block bg-primary/10 text-primary text-[11px] md:text-sm font-semibold px-2.5 py-1 rounded-full mb-2.5">
                  INDIVIDUAL COURSES (DISCOUNTED)
                </div>
                <h2 className="text-[22px] leading-[1.2] md:text-4xl font-bold text-gray-900 tracking-[0.02em] mb-2.5">
                  Pick the Exact Course You Need
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-[14px] md:text-base">
                  Every course is standalone — but students save far more with the bundle below.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {courses.map((c) => (
                  <div
                    key={c.title}
                    className={`relative rounded-2xl border bg-white p-4 md:p-8 shadow-sm hover:shadow-lg transition-shadow ${
                      c.featured ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
                    }`}
                  >
                    {c.featured && (
                      <div className="absolute -top-3 left-4 md:left-6 bg-primary text-white text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="inline-block bg-green-100 text-green-700 text-[11px] md:text-xs font-bold px-2 py-0.5 rounded mb-2.5">
                      {c.discountPct}% OFF
                    </div>
                    <h3 className="text-[17px] md:text-xl font-bold text-gray-900 mb-1.5 leading-snug tracking-[0.02em]">
                      {c.title}
                    </h3>
                    <p className="text-[13px] md:text-sm text-gray-600 mb-3 md:mb-4 leading-snug">{c.tagline}</p>

                    {c.title === "5-Day Practical Laundry Training" && (
                      <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-2.5 py-2 mb-3 md:mb-4">
                        <Calendar className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                        <div className="text-[12px] md:text-sm leading-snug">
                          <span className="font-bold text-green-800">Next Batch:</span>{" "}
                          <span className="font-semibold text-gray-900">{getNextBatchDate()}</span>
                          <span className="text-gray-600"> • One batch every month</span>
                        </div>
                      </div>
                    )}

                    <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] md:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                      <span className="text-[22px] md:text-3xl font-bold text-gray-900">
                        {formatINR(c.discountedPrice)}
                      </span>
                      <span className="text-sm md:text-base text-gray-400 line-through">
                        {formatINR(c.originalPrice)}
                      </span>
                    </div>

                    <a
                      href={registrationHref}
                      className="block text-center rounded-lg bg-gray-900 hover:bg-gray-800 active:bg-black text-white font-semibold text-[15px] md:text-base px-5 py-3.5 transition-colors"
                    >
                      Enroll in This Course
                    </a>
                    <a
                      href={`${registrationHref}&syllabus=${encodeURIComponent(c.title)}`}
                      className="mt-2.5 flex items-center justify-center gap-1.5 text-[13px] md:text-sm font-semibold text-primary hover:text-primary/80 underline underline-offset-4 py-1"
                    >
                      <Download className="w-4 h-4" />
                      Download the syllabus
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <p className="text-gray-700 text-[14px] md:text-lg">
                  Total Real Value:{" "}
                  <span className="font-bold text-gray-900">₹1,24,000</span>
                </p>
              </div>
            </div>
          </section>

          {/* BUNDLE OFFER */}
          <section id="bundle" className="relative py-9 md:py-20 px-3 md:px-4 bg-gradient-to-br from-primary via-primary to-blue-700 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-gray-900 rounded-full px-2.5 py-1 text-[11px] md:text-xs font-bold mb-3 shadow-lg">
                ⭐ MOST POPULAR
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-[11px] md:text-sm font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Complete Laundry Mastery Bundle
              </div>
              <h2 className="text-[24px] leading-[1.2] md:text-5xl font-bold mb-3 tracking-[0.02em]">
                Get ₹1.24L Value at Just{" "}
                <span className="text-yellow-300">₹39,999</span>
              </h2>
              <p className="text-[15px] md:text-xl text-white/90 mb-2">
                Save 68% — all 4 courses, every playbook, lifetime access.
              </p>
              <p className="text-[13px] leading-snug md:text-base text-white/80 mb-5 md:mb-7 max-w-2xl mx-auto">
                <strong>87.3%</strong> of our students choose the Complete Laundry Mastery Course —
                because it's just <strong>3.9%</strong> of your ₹10L business investment and covers
                everything from setup to scale.
              </p>

              <div className="bg-white text-gray-900 rounded-2xl p-4 md:p-8 text-left max-w-2xl mx-auto mb-5 md:mb-8 shadow-2xl">
                <div className="flex items-center justify-between mb-3 md:mb-4 pb-3 md:pb-4 border-b">
                  <span className="font-semibold text-[14px] md:text-base">What's Included</span>
                  <span className="text-[12px] md:text-sm text-gray-500">4 Courses</span>
                </div>
                <ul className="space-y-2.5 md:space-y-3">
                  {courses.map((c) => (
                    <li key={c.title} className="flex items-start justify-between gap-2 md:gap-3 text-[13px] md:text-base">
                      <div className="flex items-start gap-1.5 md:gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-800 leading-snug">{c.title}</span>
                      </div>
                      <span className="text-gray-500 line-through shrink-0 text-[11px] md:text-sm">
                        {formatINR(c.originalPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t flex items-center justify-between">
                  <span className="text-gray-600 text-[13px] md:text-base">Total Value</span>
                  <span className="text-[14px] md:text-lg font-bold text-gray-900 line-through">
                    {formatINR(totalValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-900 font-semibold text-[14px] md:text-base">Your Price Today</span>
                  <span className="text-[22px] md:text-3xl font-bold text-green-600">
                    {formatINR(bundlePrice)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-2.5 py-2 text-[12px] md:text-sm font-semibold text-green-800 text-center">
                  <Users className="w-4 h-4 shrink-0" />
                  87.3% of students choose this bundle
                </div>
                <div className="mt-2 text-right text-[11px] md:text-sm text-red-600 font-semibold">
                  You save {formatINR(totalValue - bundlePrice)} ({bundleSavings}% OFF)
                </div>
                <div className="mt-3 md:mt-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-2.5 md:py-3 text-left">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-700 shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-snug md:text-sm text-blue-900">
                    <span className="font-bold">Practical Session Included:</span> After you
                    purchase the bundle, you can book a practical session by just informing the
                    team. We run hands-on sessions <span className="font-semibold">every month</span>
                    {" "}(next batch: <span className="font-semibold">{getNextBatchDate()}</span>).
                  </p>
                </div>
              </div>

              <a
                href={registrationHref}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-bold text-[15px] md:text-xl px-5 md:px-10 py-4 md:py-5 shadow-xl transition-colors"
              >
                Claim the Mastery Bundle →
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] md:text-sm text-white/90 mt-4">
                <div className="flex items-center gap-1">💻 100% Online Access</div>
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /> Lifetime access</div>
                <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" /> ROI in 90 days</div>
              </div>
            </div>
          </section>

          {/* WHY NOW */}
          <section className="py-9 md:py-16 px-3 md:px-4 bg-gray-50 pb-28 md:pb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[22px] leading-[1.2] md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 tracking-[0.02em]">
                Why This Costs Less Than a Single Mistake
              </h2>
              <p className="text-gray-700 text-[14px] leading-relaxed md:text-lg mb-6">
                The average laundry business owner loses <strong>₹3–5 lakh</strong> in the first year
                from wrong machine choices, bad pricing, and poor marketing. The Mastery Bundle
                costs just <strong>3.9%</strong> of a typical ₹10L setup — and removes every one of
                those mistakes before you make them.
              </p>
            </div>
          </section>
        </main>
        <Footer />

        {/* MOBILE STICKY CTA */}
        <a
          href="#bundle"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-center font-bold text-[15px] py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          🔥 Claim Mastery Bundle — ₹39,999
        </a>
      </div>
    </>
  );
};

export default CoursesSales;
