import React, { useState, useEffect } from "react";
import { Gift, Star, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Welcome Offer",
      subtitle: "20% OFF on First Order",
      description: "Start your laundry journey with exclusive savings",
      badge: "NEW USER",
      discount: "20%",
      category: "welcome",
      validUntil: "Limited Time",
      icon: "🎉",
    },
    {
      id: 2,
      title: "Shoe Bonanza",
      subtitle: "5 Pairs for ₹1000",
      description: "Professional shoe cleaning at unbeatable prices",
      badge: "HOT DEAL",
      discount: "50%",
      category: "shoes",
      validUntil: "This Month",
      icon: "👟",
    },
    {
      id: 3,
      title: "Helmet Hygiene",
      subtitle: "5 Cleans for ₹1000",
      description: "Keep your helmet fresh and sanitized",
      badge: "SPECIAL",
      discount: "40%",
      category: "helmet",
      validUntil: "Weekly Deal",
      icon: "🪖",
    },
    {
      id: 4,
      title: "Saree Special",
      subtitle: "Dry Clean @ Just ₹99",
      description: "Premium care for your precious sarees",
      badge: "PREMIUM",
      discount: "60%",
      category: "saree",
      validUntil: "Today Only",
      icon: "🥻",
    },
    {
      id: 5,
      title: "Formal Wear",
      subtitle: "Coat-Pant @ Just ₹199",
      description: "Professional dry cleaning for formal attire",
      badge: "BUSINESS",
      discount: "45%",
      category: "formal",
      validUntil: "This Week",
      icon: "🤵",
    },
    {
      id: 6,
      title: "Blanket Care",
      subtitle: "Flat 50% OFF",
      description: "Deep cleaning for your comfort essentials",
      badge: "SEASONAL",
      discount: "50%",
      category: "bedding",
      validUntil: "Winter Sale",
      icon: "🛏️",
    },
  ];

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentOfferIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    setIsAutoPlaying(false);
  };

  const goToOffer = (index: number) => {
    setCurrentOfferIndex(index);
    setIsAutoPlaying(false);
  };

  const currentOffer = offers[currentOfferIndex];

  return (
    <div className="bg-gradient-to-br from-brand-blue-light via-white to-brand-blue-light py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-brand-blue" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Exclusive Offers
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals and save big on premium laundry services
          </p>
        </div>

        {/* Main Offer Card */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <Card className="overflow-hidden border-2 border-brand-blue/20 shadow-elevation-2 bg-gradient-to-r from-white via-brand-blue-light/30 to-white">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Offer Content */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentOffer.icon}</span>
                    <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                      {currentOffer.badge}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {currentOffer.title}
                    </h3>
                    <p className="text-xl md:text-2xl font-semibold text-brand-blue mb-3">
                      {currentOffer.subtitle}
                    </p>
                    <p className="text-gray-600 text-lg">
                      {currentOffer.description}
                    </p>
                  </div>

                  {/* Validity and CTA */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{currentOffer.validUntil}</span>
                    </div>
                    <Button 
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Claim Offer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Discount Display */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-full w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center shadow-elevation-3">
                      <Star className="h-6 w-6 mb-2 text-yellow-300" />
                      <span className="text-3xl md:text-4xl font-bold">
                        {currentOffer.discount}
                      </span>
                      <span className="text-sm md:text-base">OFF</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full p-2 animate-float">
                      <Gift className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-blue/20 shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-blue/20 shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Offer Indicators */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToOffer(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentOfferIndex 
                  ? 'bg-brand-blue scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Quick Offer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {offers.slice(0, 3).map((offer, index) => (
            <Card 
              key={offer.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elevation-2 border ${
                index === currentOfferIndex 
                  ? 'border-brand-blue bg-brand-blue-light/50' 
                  : 'border-gray-200 hover:border-brand-blue/50'
              }`}
              onClick={() => goToOffer(index)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{offer.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{offer.title}</h4>
                <p className="text-sm text-brand-blue font-medium">{offer.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            * Offers valid for first-time users only. Terms and conditions apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offers;
