
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCountry } from './CountryContext';

export interface CookieConsent {
  essential: boolean; // Always true, required for site functionality
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentContextType {
  consent: CookieConsent;
  hasResponded: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Partial<CookieConsent>) => void;
}

const initialConsent: CookieConsent = {
  essential: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false
};

// Create context with default values
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

// Generate a unique session ID for anonymous users
const generateSessionId = (): string => {
  return 'session_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Get the session ID from localStorage or generate a new one
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('cookie_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('cookie_session_id', sessionId);
  }
  return sessionId;
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent>(initialConsent);
  const [hasResponded, setHasResponded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { currentCountry } = useCountry();
  
  // Initialize the consent state from localStorage
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    const sessionId = getSessionId();
    setSessionId(sessionId);
    
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setConsent({
          ...initialConsent,
          ...parsedConsent
        });
        setHasResponded(true);
      } catch (error) {
        console.error('Error parsing stored cookie consent:', error);
        // Reset to default if there's an error
        localStorage.removeItem('cookie_consent');
      }
    } else {
      // If no consent is stored, show the banner
      setIsOpen(true);
    }
  }, []);

  // Save consent preferences to both localStorage and Supabase
  const saveConsentToStorage = async (newConsent: CookieConsent) => {
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setHasResponded(true);
    setIsOpen(false);

    try {
      // Save anonymized consent data to Supabase for analytics/compliance
      await supabase.from('cookie_consents').upsert({
        session_id: sessionId,
        essential: newConsent.essential,
        analytics: newConsent.analytics,
        marketing: newConsent.marketing,
        preferences: newConsent.preferences,
        country_code: currentCountry?.code || null,
        user_agent: navigator.userAgent || null,
        ip_address: null // IP is captured serverside via RLS policy if needed
      }, {
        onConflict: 'session_id'
      });
    } catch (error) {
      console.error('Error saving cookie consent to Supabase:', error);
      // Don't show error to user as this is background analytics
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const allConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveConsentToStorage(allConsent);
    toast.success("Thank you! All cookie preferences have been saved.");
  };

  // Reject all optional cookies
  const rejectAll = () => {
    const minimalConsent: CookieConsent = {
      essential: true, // Essential cookies are always enabled
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveConsentToStorage(minimalConsent);
    toast.success("Preferences saved. Only essential cookies will be used.");
  };

  // Save custom preferences
  const savePreferences = (preferences: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      ...consent,
      ...preferences,
      essential: true // Essential cookies can't be disabled
    };
    saveConsentToStorage(newConsent);
    toast.success("Your cookie preferences have been saved.");
  };

  const value = {
    consent,
    hasResponded,
    isOpen,
    setIsOpen,
    acceptAll,
    rejectAll,
    savePreferences
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// Custom hook to use the cookie consent context
export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
