import React, { useState, useEffect } from "react";
import { Gift, ChevronRight } from "lucide-react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Welcome Offer",
      discount: "20% OFF",
      badge: "NEW",
      icon: "🎉",
    },
    {
      id: 2,
      title: "Shoe Bonanza",
      discount: "₹1000",
      badge: "HOT",
      icon: "👟",
    },
    {
      id: 3,
      title: "Helmet Hygiene",
      discount: "40% OFF",
      badge: "SPECIAL",
      icon: "🪖",
    },
    {
      id: 4,
      title: "Saree Special",
      discount: "₹99",
      badge: "PREMIUM",
      icon: "🥻",
    },
    {
      id: 5,
      title: "Formal Wear",
      discount: "₹199",
      badge: "BUSINESS",
      icon: "🤵",
    },
    {
      id: 6,
      title: "Blanket Care",
      discount: "50% OFF",
      badge: "WINTER",
      icon: "🛏️",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  // Create infinite scroll effect
  const extendedOffers = [...offers, ...offers, ...offers];

  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-y border-primary/20 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Exclusive Offers</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Swipe for more</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal scrolling offers */}
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 280)}px)`,
            }}
          >
            {extendedOffers.map((offer, index) => (
              <div
                key={`${offer.id}-${Math.floor(index / offers.length)}`}
                className="flex-shrink-0 w-64 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-lg">{offer.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm truncate">
                        {offer.title}
                      </h4>
                      <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-medium">
                        {offer.badge}
                      </span>
                    </div>
                    <p className="text-primary font-bold text-lg">
                      {offer.discount}
                    </p>
                  </div>
                  
                  {/* Action indicator */}
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 mt-3">
          {offers.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
