import React, { createContext, useContext, useState, useEffect } from "react";
import { CookieService } from "@/lib/services/cookie.service";
import { CookieConsent } from "@/types/cookies";
import { toast } from "sonner";

interface CookieConsentContextType {
  consent: CookieConsent | null;
  updateConsent: (newConsent: CookieConsent) => Promise<void>;
  isConsentRequired: boolean;
  hasConsent: (type: keyof CookieConsent) => boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null
);

function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}

function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const cookieService = CookieService.getInstance();

  useEffect(() => {
    const initializeConsent = async () => {
      try {
        const storedConsent = await cookieService.getStoredConsent();
        if (storedConsent) {
          setConsent(storedConsent);
        }
      } catch (error) {
        console.error("Error initializing consent:", error);
      }
    };

    initializeConsent();
  }, []);

  const updateConsent = async (newConsent: CookieConsent) => {
    try {
      setConsent(newConsent);
      cookieService.storeConsent(newConsent);

      // ✅ Store in actual browser cookie for server/client usage
      document.cookie = `cookie_consent=${encodeURIComponent(
        JSON.stringify(newConsent)
      )}; path=/; SameSite=Lax; Secure; max-age=${60 * 60 * 24 * 365}`;
    } catch (error) {
      console.error("Error updating consent:", error);
      toast.error("Failed to update preferences. Please try again.");
    }
  };

  const hasConsent = (type: keyof CookieConsent): boolean => {
    return consent?.[type] ?? false;
  };

  const isConsentRequired = !consent;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        updateConsent,
        isConsentRequired,
        hasConsent,
        setIsOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export { CookieConsentProvider, useCookieConsent };
