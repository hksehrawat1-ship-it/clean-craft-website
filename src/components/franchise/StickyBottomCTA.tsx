import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import FranchiseFormModal from "./FranchiseFormModal";

const StickyBottomCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCall = () => {
    window.location.href = "tel:+918800771349";
  };

  const handleInquire = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-3">
            <Button
              onClick={handleCall}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
            <Button
              onClick={handleInquire}
              className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Inquire Now
            </Button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to content to prevent overlap */}
      <div className="h-20"></div>

      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Show Your Interest in Laundry Business"
        sourceCta="Sticky Bottom Inquire"
      />
    </>
  );
};

export default StickyBottomCTA;
