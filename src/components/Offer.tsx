"use client";
import * as React from "react";
import { OfferMessage } from "./OfferMessage";
import { OfferButton } from "./OfferButton";

const Offer: React.FC = () => {
  const handleClaimOffer = React.useCallback(() => {
    // Handle claim offer click
    console.log("Offer claimed");
  }, []);

  return (
    <section className="flex flex-wrap gap-6 justify-center items-center px-32 py-6 text-center bg-indigo-50 max-md:px-5">
      <OfferMessage />
      <OfferButton onClick={handleClaimOffer} />
    </section>
  );
};

export default Offer;
