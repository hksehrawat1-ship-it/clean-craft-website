import React, { useState, useEffect } from "react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Welcome Offer – 20% OFF on First Order",
    },
    {
      id: 2,
      title: "Shoe Bonanza – 5 Pairs for ₹1000",
    },
    {
      id: 3,
      title: "Helmet Hygiene Deal – 5 Cleans for ₹1000",
    },
    {
      id: 4,
      title: "Saree Dry Clean @ Just ₹99",
    },
    {
      id: 5,
      title: "Coat-Pant Dry Clean – @ Just ₹199",
    },
    {
      id: 6,
      title: "Blanket Dry Clean – Flat 50% OFF",
    },
  ];

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className=" bg-white flex items-center justify-center">
      {/* Google-inspired header strip with dynamic offers - centered */}
      <div className="bg-blue-500 md:py-2 py-0 w-full">
        <div className="container mx-auto px-4">
          <h1 className="md:text-6xl text-2xl font-light text-white text-center md:mb-8 mb-2">
            Grab an Offer
          </h1>
          <div className="text-center">
            <div className="md:text-3xl text-sm font-medium text-white animate-fade-in md:mb-4 mb-2">
              {offers[currentOfferIndex].title}
            </div>
            <div className="text-lg text-blue-100">
              For First-Time User Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
