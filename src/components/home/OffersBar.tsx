import OfferSection from './OfferSection';
import { useRef } from 'react';

// Example default offers (replace with CMS data)
const defaultOffers = [
  {
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
  },
  {
    badge: '🎁',
    text: (
      <>
        Refer a friend and both get <span className="text-[#1A73E8] font-bold">₹200 credit</span>!<br />
        Limited time only.
      </>
    ),
    buttonLabel: 'Refer Now',
    buttonHref: '#refer',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

const CARD_HEIGHT = 210;

const OffersBar = ({ offers = defaultOffers }) => {
  const marqueeRef = useRef(null);
  // Marquee speed: adjust duration for slower/faster scroll
  const duration = offers.length * 8; // seconds

  return (
    <section className="w-full py-8 bg-transparent overflow-hidden">
      <div
        className="relative w-full h-full flex items-center"
        style={{ height: CARD_HEIGHT }}
      >
        <div
          ref={marqueeRef}
          className="flex items-center gap-6 animate-marquee hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${duration}s`,
            width: 'max-content',
          }}
        >
          {[...offers, ...offers].map((offer, idx) => (
            <div key={idx} className="min-w-[340px] max-w-md w-full h-full flex items-center">
              <OfferSection offer={offer} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
};

export default OffersBar; 