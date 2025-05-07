
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

interface CookiePreferencesButtonProps {
  className?: string;
}

const CookiePreferencesButton: React.FC<CookiePreferencesButtonProps> = ({ className }) => {
  const { setIsOpen } = useCookieConsent();

  return (
    <Button
      variant="link"
      size="sm"
      className={className}
      onClick={() => setIsOpen(true)}
    >
      Cookie Preferences
    </Button>
  );
};

export default CookiePreferencesButton;
