
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
  const { currentCountry, countries, setCurrentCountry } = useCountry();

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
          {countries.map((country) => (
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
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
