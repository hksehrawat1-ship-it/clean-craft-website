import React, { useState, useMemo } from "react";
import { Search, Shirt, Package, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  price_type?: string;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
  isLoading?: boolean;
}

const getServiceIcon = (slug: string = "") => {
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes("wash") || lowerSlug.includes("laundry")) {
    return <Shirt className="w-5 h-5" />;
  }
  if (lowerSlug.includes("dry") || lowerSlug.includes("cleaning")) {
    return <Sparkles className="w-5 h-5" />;
  }
  return <Package className="w-5 h-5" />;
};

const getServiceCategory = (slug: string = "") => {
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes("wash") || lowerSlug.includes("laundry")) return "Washing";
  if (lowerSlug.includes("dry") || lowerSlug.includes("cleaning")) return "Dry Cleaning";
  if (lowerSlug.includes("iron")) return "Ironing";
  return "Other";
};

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedServices,
  onServiceToggle,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(services.map(s => getServiceCategory(s.slug)))];
    return cats;
  }, [services]);

  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(service => 
        getServiceCategory(service.slug) === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [services, selectedCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Select Services
          </h2>
          <p className="text-muted-foreground">Loading services...</p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Select Services
        </h2>
        <p className="text-muted-foreground">
          Choose the services you need
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors",
              selectedCategory === category
                ? "bg-brand-blue text-white"
                : "hover:bg-brand-blue hover:text-white"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Selected Services Count */}
      {selectedServices.length > 0 && (
        <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-3">
          <p className="text-sm text-brand-blue font-medium">
            {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}

      {/* Services */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Card
              key={service.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedServices.includes(service.id)
                  ? "bg-brand-blue/5 border-brand-blue"
                  : "hover:border-brand-blue/50"
              )}
              onClick={() => onServiceToggle(service.id)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedServices.includes(service.id)}
                  onChange={() => onServiceToggle(service.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-brand-blue">
                      {getServiceIcon(service.slug)}
                    </div>
                    <h3 className="font-medium text-foreground">
                      {service.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {service.price_type || "item"}
                    </Badge>
                  </div>
                  {service.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {searchTerm ? `No services found for "${searchTerm}"` : "No services available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};