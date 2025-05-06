import { useEffect, useState } from 'react';

// Example props for CMS integration
const defaultOffer = {
  badge: '🔥',
  text: (
    <>
      Schedule your first order & get a 100 Rs. <a href="#" className="text-[#1A73E8] underline font-medium">credit instantly.</a><br />
      No strings attached. Click button to see services.
    </>
  ),
  buttonLabel: 'Claim Your $50',
  buttonHref: '#services',
  icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
};

const OfferSection = ({ offer = defaultOffer }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100); // Fade in
  }, []);

  return (
    <section
      className={`w-full flex justify-center items-center py-4 px-2 md:px-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      style={{ zIndex: 20, position: 'relative' }}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-[#e8f1fd] rounded-2xl shadow-lg px-6 py-4 md:px-12 md:py-6 border border-blue-100 max-w-4xl w-full">
        {/* Badge/Icon */}
        <span className="flex items-center justify-center bg-white text-yellow-500 rounded-full shadow w-10 h-10 text-xl font-bold border border-yellow-100">
          {offer.badge}
        </span>
        {/* Text */}
        <div className="flex-1 text-center md:text-left text-[20px] font-normal text-black leading-snug">
          {offer.text}
        </div>
        {/* Button */}
        <a
          href={offer.buttonHref}
          className="inline-flex items-center bg-[#1A73E8] text-white text-[18px] font-bold rounded-lg px-6 py-2.5 shadow hover:bg-[#1765c1] transition-colors gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ borderRadius: 8 }}
        >
          {offer.icon}
          {offer.buttonLabel}
        </a>
      </div>
    </section>
  );
};

export default OfferSection; 