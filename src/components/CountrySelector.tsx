
import React from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { Check, Globe } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CountrySelector: React.FC = () => {
  const { currentCountry, countries, setCurrentCountry, getCountryRegion } = useCountry();

  if (!currentCountry || countries.length <= 1) return null;

  return (
    <div className="relative">
      <Select
        value={currentCountry.code}
        onValueChange={setCurrentCountry}
      >
        <SelectTrigger className="w-[180px] bg-white/90 backdrop-blur-sm">
          <SelectValue>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              {currentCountry.name}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {/* Group countries by region */}
          {['ASIA/PACIFIC', 'EUROPE', 'NORTH AMERICA', 'GLOBAL'].map(region => {
            // Get countries for this region
            const regionCountries = countries.filter(c => 
              getCountryRegion(c.code) === region
            );
            
            if (regionCountries.length === 0) return null;
            
            return (
              <div key={region}>
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                  {region}
                </div>
                {regionCountries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    value={country.code}
                    className="relative pl-8"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        {country.name}
                      </span>
                      {currentCountry.code === country.code && (
                        <Check className="w-4 h-4 ml-2 text-primary" />
                      )}
                    </div>
                  </SelectItem>
                ))}
                <div className="h-px bg-gray-100 my-1"></div>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
