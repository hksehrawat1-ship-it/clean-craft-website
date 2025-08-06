import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../contexts/CountryContext";

const Offers = () => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();

  const offers = [
    {
      id: 1,
      title: "Welcome Offer",
      description: "For new customers",
      discount: "20% OFF",
      badge: "NEW",
      icon: "🎉",
      color: "from-brand-blue to-brand-blue-dark"
    },
    {
      id: 2,
      title: "Shoe Bonanza",
      description: "Professional shoe cleaning",
      discount: "₹1000 OFF",
      badge: "HOT",
      icon: "👟",
      color: "from-cleancraft-gold to-brand-blue"
    },
    {
      id: 3,
      title: "Helmet Hygiene",
      description: "Deep sanitization service",
      discount: "40% OFF",
      badge: "SPECIAL",
      icon: "🪖",
      color: "from-brand-blue-dark to-brand-blue"
    },
    {
      id: 4,
      title: "Saree Special",
      description: "Delicate fabric care",
      discount: "₹99 ONLY",
      badge: "PREMIUM",
      icon: "🥻",
      color: "from-brand-blue to-cleancraft-gold"
    },
    {
      id: 5,
      title: "Formal Wear",
      description: "Business attire cleaning",
      discount: "₹199 ONLY",
      badge: "BUSINESS",
      icon: "🤵",
      color: "from-cleancraft-gold to-brand-blue-dark"
    },
    {
      id: 6,
      title: "Blanket Care",
      description: "Winter special cleaning",
      discount: "50% OFF",
      badge: "WINTER",
      icon: "🛏️",
      color: "from-brand-blue-dark to-cleancraft-gold"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [offers.length, isHovered]);

  const handleClaimNow = () => {
    const countryCode = currentCountry || 'in';
    navigate(`/${countryCode}/book`);
  };

  return (
    <div className="w-full py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Pure Carousel Strip */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="w-full flex-shrink-0"
              >
                <div className={`relative bg-gradient-to-r ${offer.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-12 -mb-12"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    {/* Left Content */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{offer.icon}</span>
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-2xl font-bold text-white">
                            {offer.title}
                          </h4>
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                            {offer.badge}
                          </span>
                        </div>
                        <p className="text-white/90 text-base mb-1">
                          {offer.description}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold text-white">
                            {offer.discount}
                          </p>
                          <p className="text-white/70 text-sm">
                            *Valid for first-time customers only
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Action */}
                    <div className="flex flex-col items-center gap-2">
                      <button 
                        onClick={handleClaimNow}
                        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
