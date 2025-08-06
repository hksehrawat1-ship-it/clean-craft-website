import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MapPin, User, Mail, Phone, Package } from "lucide-react";
import { ContactFormData } from "./ContactForm";

interface Service {
  id: string;
  name: string;
  description?: string;
}

interface BookingConfirmationProps {
  contactData: ContactFormData;
  selectedCity: string;
  selectedServices: Service[];
  showCustomCity?: boolean;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  contactData,
  selectedCity,
  selectedServices,
  showCustomCity = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-muted-foreground">
          Please review your booking details before submitting
        </p>
      </div>

      {/* Contact Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-brand-blue" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{contactData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{contactData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{contactData.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">
                {showCustomCity ? contactData.customCity : selectedCity}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Selected Services */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-brand-blue" />
          Selected Services ({selectedServices.length})
        </h3>
        <div className="space-y-3">
          {selectedServices.map((service) => (
            <div
              key={service.id}
              className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {service.name}
                </h4>
                {service.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="ml-3">
                Selected
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Important Note */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              What happens next?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Our team will contact you within 2 hours</li>
              <li>• We'll confirm your booking and schedule pickup</li>
              <li>• Professional cleaning with 24-48 hour turnaround</li>
              <li>• Free pickup and delivery to your doorstep</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};