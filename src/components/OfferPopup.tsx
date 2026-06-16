import { useEffect, useState } from "react";
import { X, Smartphone, ShieldCheck, Sparkles } from "lucide-react";
import popupBg from "@/assets/popup-offer-bg.jpg";

const OfferPopup = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Show every visit
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return;
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="First order free offer"
    >
      <div
        className="relative w-full max-w-md bg-[#f5efe6] rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero */}
        <div className="relative bg-[#f5efe6] px-5 sm:px-6 pt-7 pb-6 text-center">
          <div className="relative inline-flex items-center justify-center">
            <Sparkles className="absolute -left-5 top-3 w-4 h-4 text-[#c9941e] rotate-12" />
            <h2
              className="text-6xl sm:text-7xl text-[#2b1d10] leading-none italic"
              style={{
                fontFamily: "'Pinyon Script', 'Great Vibes', 'Allura', 'Brush Script MT', cursive",
                fontWeight: 400,
              }}
            >
              Spotless
            </h2>
            <Sparkles className="absolute -right-6 top-2 w-5 h-5 text-[#c9941e]" />
            <Sparkles className="absolute -right-3 bottom-0 w-3 h-3 text-[#c9941e]" />
          </div>

          <p className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-[0.18em] text-[#2b1d10]">
            SHURUAT
          </p>

          <div className="flex items-center justify-center gap-2 mt-2 text-[#3a2a1a] text-[11px] sm:text-xs">
            <span className="h-px w-6 bg-[#c9941e]" />
            <span className="font-medium">First Order, On Us!</span>
            <span className="h-px w-6 bg-[#c9941e]" />
          </div>

          <div className="mt-5">
            <p className="text-xl sm:text-2xl font-extrabold text-[#2b1d10] leading-tight">
              First Dry Cleaning
            </p>
            <p
              className="text-[88px] sm:text-[104px] font-black text-[#c9941e] leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
            >
              FREE
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-[#2b1d10] mt-1">
              upto ₹200
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c9941e] bg-white/70 text-[11px] sm:text-xs text-[#2b1d10] font-medium">
            <Smartphone className="w-3.5 h-3.5 text-[#c9941e]" />
            Only on CleanCraft
          </div>
          <p className="mt-2 text-xs sm:text-sm font-semibold text-[#3a2a1a]">
            We wash. We press. We impress. <Sparkles className="inline w-3 h-3 text-[#c9941e]" />
          </p>
        </div>

        {/* Form */}
        <div className="px-5 sm:px-6 py-5 bg-[#faf6ef]">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9941e]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#2b1d10]">
              Welcome to CleanCraft!
            </h3>
            <Sparkles className="w-4 h-4 text-[#c9941e]" />
          </div>
          <p className="mt-2 text-center text-sm text-[#3a2a1a]">
            Get your first Dry Cleaning <span className="font-bold text-[#c9941e]">FREE</span> upto{" "}
            <span className="font-bold text-[#c9941e]">₹200</span> when you book online.
          </p>

          <form onSubmit={handleClaim} className="mt-4 space-y-3">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-black/5">
              <Smartphone className="w-5 h-5 text-[#2b1d10]/60" />
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-transparent outline-none text-[#2b1d10] placeholder:text-[#2b1d10]/40"
                aria-label="Mobile number"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#c9941e] hover:bg-[#b3821a] active:bg-[#9c7016] text-white font-bold text-base py-4 rounded-xl shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              CLAIM MY FREE CLEAN
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#3a2a1a]/70">
            <ShieldCheck className="w-4 h-4 text-[#c9941e]" />
            Safe. Hygienic. On-time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
