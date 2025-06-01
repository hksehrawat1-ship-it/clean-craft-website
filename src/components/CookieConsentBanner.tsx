import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CookieConsentBanner() {
  const { consent, updateConsent, isConsentRequired } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Only check if consent is required
  if (!isConsentRequired) return null;

  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    updateConsent(allConsent);
    toast.success("Thank you! All cookie preferences have been saved.");
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      essential: true, // Essential cookies are always enabled
      analytics: false,
      marketing: false,
      preferences: false
    };
    updateConsent(minimalConsent);
    toast.success("Preferences saved. Only essential cookies will be used.");
  };

  const handleSavePreferences = () => {
    const updatedPreferences = {
      ...preferences,
      essential: true // Ensure essential cookies are always enabled
    };
    updateConsent(updatedPreferences);
    setShowDetails(false);
    toast.success("Your cookie preferences have been saved.");
  };

  return (
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              {window.location.pathname === '/' ? (
                <>
                  We use one <strong>essential cookie</strong> to remember your country for this visit. You can also allow analytics, marketing or preference cookies, but they are optional.
                </>
              ) : (
                'We use cookies to enhance your experience. Essential cookies are always enabled as they are required for the website to function. By continuing to visit this site you agree to our use of cookies.'
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowDetails(true)}>
              Cookie Settings
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button 
              onClick={handleAcceptAll}
              className="bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-colors duration-200 rounded-[12px]"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Settings Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you want to accept. Essential cookies can't be disabled as they are required for the website to function.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked disabled />
              <Label>Essential (Required)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked as boolean }))
                }
              />
              <Label htmlFor="analytics">Analytics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked as boolean }))
                }
              />
              <Label htmlFor="marketing">Marketing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, preferences: checked as boolean }))
                }
              />
              <Label htmlFor="preferences">Preferences</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePreferences}
              className="bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-colors duration-200 rounded-[12px]"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
