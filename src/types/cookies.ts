export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentData extends CookieConsent {
  uuid: string;
  text: string;
  ip_address?: string;
  user_agent: string;
  timestamp: string;
} 