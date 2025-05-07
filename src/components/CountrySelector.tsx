
import React from 'react';
import { useCountry } from '@/contexts/CountryContext';
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
    <Select
      value={currentCountry.code}
      onValueChange={setCurrentCountry}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
