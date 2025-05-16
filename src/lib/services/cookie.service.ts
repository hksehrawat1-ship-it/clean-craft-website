import { CookieConsent } from '@/types/cookies';

export class CookieService {
  private static instance: CookieService;
  
  private constructor() {}
  
  public static getInstance(): CookieService {
    if (!CookieService.instance) {
      CookieService.instance = new CookieService();
    }
    return CookieService.instance;
  }

  public async getStoredConsent(): Promise<CookieConsent | null> {
    const storedConsent = localStorage.getItem('cookieConsent');
    return storedConsent ? JSON.parse(storedConsent) : null;
  }

  public storeConsent(consent: CookieConsent): void {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
  }

  public getStoredCountry(): string | null {
    return localStorage.getItem('selectedCountry');
  }

  public storeCountry(countryCode: string): void {
    localStorage.setItem('selectedCountry', countryCode);
  }

  public clearStoredCountry(): void {
    localStorage.removeItem('selectedCountry');
  }
} 