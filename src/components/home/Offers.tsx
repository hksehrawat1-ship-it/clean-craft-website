import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../contexts/CountryContext";
import { useIsMobile } from "../../hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const Offers = () => {
  const navigate = useNavigate();
  const { currentCountry } = useCountry();
  const isMobile = useIsMobile();

  const offers = [
    {
      id: 1,
      title: "Welcome Offer",
      description: "For new customers",
      discount: "20% OFF",
      badge: "NEW",
      icon: "🎉",
      color: "from-brand-blue to-brand-blue-dark",
    },
    {
      id: 2,
      title: "Shoe Bonanza",
      description: "Professional shoe cleaning",
      discount: "₹1000 OFF",
      badge: "HOT",
      icon: "👟",
      color: "from-cleancraft-gold to-brand-blue",
    },
    {
      id: 3,
      title: "Helmet Hygiene",
      description: "Deep sanitization service",
      discount: "40% OFF",
      badge: "SPECIAL",
      icon: "🪖",
      color: "from-brand-blue-dark to-brand-blue",
    },
    {
      id: 4,
      title: "Saree Special",
      description: "Delicate fabric care",
      discount: "₹99 ONLY",
      badge: "PREMIUM",
      icon: "🥻",
      color: "from-brand-blue to-cleancraft-gold",
    },
    {
      id: 5,
      title: "Formal Wear",
      description: "Business attire cleaning",
      discount: "₹199 ONLY",
      badge: "BUSINESS",
      icon: "🤵",
      color: "from-cleancraft-gold to-brand-blue-dark",
    },
    {
      id: 6,
      title: "Blanket Care",
      description: "Winter special cleaning",
      discount: "50% OFF",
      badge: "WINTER",
      icon: "🛏️",
      color: "from-brand-blue-dark to-cleancraft-gold",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: isMobile,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi || isHovered) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  const handleClaimNow = () => {
    const countryCode = currentCountry || "in";
    navigate(`/${countryCode}/book`);
  };

  return (
    <div className="w-full py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {offers.map((offer) => (
                <div key={offer.id} className="flex-[0_0_100%] min-w-0">
                  <div
                    className={`relative bg-gradient-to-r ${offer.color} rounded-xl mx-2 shadow-lg hover:shadow-xl transition-all duration-300 group/card`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-12 -mb-12"></div>
                    </div>

                    {/* Mobile Layout */}
                    {isMobile ? (
                      <div className="relative p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-2xl">{offer.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-bold text-white">
                                {offer.title}
                              </h4>
                              <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                {offer.badge}
                              </span>
                            </div>
                            <p className="text-white/90 text-sm">
                              {offer.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-white mb-1">
                              {offer.discount}
                            </p>
                            <p className="text-white/70 text-xs">
                              *Valid for first-time customers only
                            </p>
                          </div>
                          <button
                            onClick={handleClaimNow}
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-white/50 focus:outline-none active:scale-95 transition-all duration-300 shadow-md text-sm min-h-[44px] will-change-transform"
                          >
                            Claim Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Desktop Layout */
                      <div className="relative p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover/card:scale-110 transition-transform duration-300">
                              <span className="text-3xl">{offer.icon}</span>
                            </div>

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

                          <div className="flex flex-col items-center gap-2">
                            <button
                              onClick={handleClaimNow}
                              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-xl hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-white/50 focus:outline-none active:scale-95 active:translate-y-0 transition-all duration-300 shadow-md will-change-transform"
                            >
                              Claim Now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Buttons */}
          {!isMobile && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 hover:shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 will-change-transform"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous offer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 hover:shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 will-change-transform"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next offer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Progress Dots */}
          <div className="hidden justify-center gap-2 mt-4 ">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedIndex
                    ? "bg-brand-blue w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
