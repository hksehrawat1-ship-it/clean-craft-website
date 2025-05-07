
import React from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter,
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCountry } from '@/contexts/CountryContext';

const CookieConsentBanner = () => {
  const { isOpen, setIsOpen, acceptAll, rejectAll, savePreferences, consent } = useCookieConsent();
  const { currentCountry } = useCountry();
  const [tempConsent, setTempConsent] = React.useState({ ...consent });

  // Reset temp consent when sheet opens
  React.useEffect(() => {
    if (isOpen) {
      setTempConsent({ ...consent });
    }
  }, [isOpen, consent]);

  // Handle checkbox changes
  const handleCheckboxChange = (key: keyof typeof tempConsent) => {
    if (key === 'essential') return; // Can't change essential cookies
    
    setTempConsent(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Determine if we should show Indian or Australian legal information
  const isIndian = currentCountry?.code === 'in';
  const isAustralian = currentCountry?.code === 'au';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="h-auto max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Cookie Preferences</SheetTitle>
          <SheetDescription className="text-base">
            {isIndian ? (
              <p>
                Under the Information Technology Act, 2000 and Information Technology 
                (Reasonable Security Practices) Rules, 2011, we use cookies to provide our services 
                and enhance your experience on our website.
              </p>
            ) : isAustralian ? (
              <p>
                In accordance with the Australian Privacy Act 1988 and the Privacy Amendment (Notifiable Data Breaches) Act 2017, 
                we use cookies to provide our services and enhance your experience.
              </p>
            ) : (
              <p>
                We use cookies to provide our services and enhance your experience on our website.
              </p>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox id="essential" checked={true} disabled />
              <div className="grid gap-1.5">
                <Label htmlFor="essential" className="text-base font-semibold">
                  Essential Cookies (Required)
                </Label>
                <p className="text-sm text-muted-foreground">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                  They enable core functionality such as security, network management, and account access.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox 
                id="analytics" 
                checked={tempConsent.analytics} 
                onCheckedChange={() => handleCheckboxChange('analytics')} 
              />
              <div className="grid gap-1.5">
                <Label htmlFor="analytics" className="text-base font-semibold">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  These cookies allow us to analyze website traffic and usage patterns, 
                  helping us improve the functionality of our service.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox 
                id="marketing" 
                checked={tempConsent.marketing} 
                onCheckedChange={() => handleCheckboxChange('marketing')} 
              />
              <div className="grid gap-1.5">
                <Label htmlFor="marketing" className="text-base font-semibold">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  These cookies help us show you relevant advertisements based on your interests 
                  and browsing habits, and measure the effectiveness of our marketing campaigns.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox 
                id="preferences" 
                checked={tempConsent.preferences} 
                onCheckedChange={() => handleCheckboxChange('preferences')} 
              />
              <div className="grid gap-1.5">
                <Label htmlFor="preferences" className="text-base font-semibold">
                  Preference Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  These cookies remember your choices such as location, language, and 
                  display preferences, to provide a more personalized experience.
                </p>
              </div>
            </div>
          </div>

          {(isIndian || isAustralian) && (
            <div className="border-t pt-4 text-sm text-muted-foreground">
              <h4 className="font-medium mb-2">Your Rights</h4>
              {isIndian ? (
                <p>
                  Under the Information Technology (Reasonable Security Practices) Rules, 2011, 
                  you have the right to withdraw consent at any time, access and correct your personal information. 
                  For more information, please see our Privacy Policy.
                </p>
              ) : (
                <p>
                  Under the Australian Privacy Principles, you have the right to access and correct your 
                  personal information, and to complain about a breach of the Australian Privacy Principles. 
                  For more information, please see our Privacy Policy.
                </p>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
          <Button variant="outline" onClick={rejectAll}>
            Reject All
          </Button>
          <Button variant="outline" onClick={() => savePreferences(tempConsent)}>
            Save Preferences
          </Button>
          <Button onClick={acceptAll}>
            Accept All
          </Button>
        </SheetFooter>
      </SheetContent>

      {/* Fixed bottom banner for initial consent (only shown on mobile) */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg md:hidden z-50">
          <div className="flex flex-col space-y-2">
            <p className="text-sm">
              We use cookies to improve your experience. Choose your preferences below.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={rejectAll}>
                Reject All
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
};

export default CookieConsentBanner;
