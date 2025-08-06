import React, { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CitySelectionProps {
  cities: string[];
  selectedCity: string;
  onCitySelect: (city: string) => void;
  onOtherCity: () => void;
}

const popularCities = ["MUMBAI", "DELHI", "BANGALORE", "HYDERABAD", "CHENNAI", "PUNE"];

export const CitySelection: React.FC<CitySelectionProps> = ({
  cities,
  selectedCity,
  onCitySelect,
  onOtherCity,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchTerm) return cities;
    return cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const popularAvailableCities = useMemo(() => {
    return popularCities.filter(city => cities.includes(city));
  }, [cities]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Select Your City
        </h2>
        <p className="text-muted-foreground">
          Choose your city to see available services
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for your city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Popular Cities */}
      {!searchTerm && popularAvailableCities.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Popular Cities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularAvailableCities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => onCitySelect(city)}
                className="justify-start h-auto p-3"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span className="capitalize">{city.toLowerCase()}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* All Cities */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          {searchTerm ? "Search Results" : "All Cities"}
        </h3>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <Card
                key={city}
                className={cn(
                  "p-3 cursor-pointer transition-all duration-200 hover:shadow-md",
                  selectedCity === city
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "hover:border-brand-blue"
                )}
                onClick={() => onCitySelect(city)}
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span className="capitalize font-medium">
                    {city.toLowerCase()}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No cities found matching "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* Other City Option */}
      <Card className="p-4 border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Don't see your city listed?
          </p>
          <Button
            variant="outline"
            onClick={onOtherCity}
            className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            Enter Custom City
          </Button>
        </div>
      </Card>
    </div>
  );
};
