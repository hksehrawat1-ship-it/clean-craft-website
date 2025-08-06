import React, { useState, useEffect } from "react";
import { Gift, ChevronLeft, ChevronRight } from "lucide-react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Welcome Offer",
      description: "For new customers",
      discount: "20% OFF",
      badge: "NEW",
      icon: "🎉",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Shoe Bonanza",
      description: "Professional shoe cleaning",
      discount: "₹1000 OFF",
      badge: "HOT",
      icon: "👟",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Helmet Hygiene",
      description: "Deep sanitization service",
      discount: "40% OFF",
      badge: "SPECIAL",
      icon: "🪖",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Saree Special",
      description: "Delicate fabric care",
      discount: "₹99 ONLY",
      badge: "PREMIUM",
      icon: "🥻",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      title: "Formal Wear",
      description: "Business attire cleaning",
      discount: "₹199 ONLY",
      badge: "BUSINESS",
      icon: "🤵",
      color: "from-gray-700 to-gray-800"
    },
    {
      id: 6,
      title: "Blanket Care",
      description: "Winter special cleaning",
      discount: "50% OFF",
      badge: "WINTER",
      icon: "🛏️",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [offers.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const currentOffer = offers[currentIndex];

  return (
    <div className="w-full bg-gradient-to-r from-brand-blue-light via-white to-cleancraft-light border-y border-gray-200 py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-brand-blue" />
            <h3 className="text-xl font-bold text-gray-900">Exclusive Offers</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-1.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
              aria-label="Previous offer"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="p-1.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
              aria-label="Next offer"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Single Full-Width Offer Card */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="w-full flex-shrink-0"
              >
                <div className={`relative bg-gradient-to-r ${offer.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-12 -mb-12"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    {/* Left Content */}
                    <div className="flex items-center gap-4">
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
                        <p className="text-3xl font-bold text-white">
                          {offer.discount}
                        </p>
                      </div>
                    </div>
                    
                    {/* Right Action */}
                    <div className="flex flex-col items-center gap-2">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md">
                        Claim Now
                      </button>
                      <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-brand-blue' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
