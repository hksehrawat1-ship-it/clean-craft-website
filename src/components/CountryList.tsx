import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Country, CountryService } from '@/lib/strapi/services/country.service';
import { CookieService } from '@/lib/services/cookie.service';

interface CountryListProps {
  onCountrySelect?: (country: Country) => void;
}

export function CountryList({ onCountrySelect }: CountryListProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryService = CountryService.getInstance();
        const fetchedCountries = await countryService.getCountries();
        setCountries(fetchedCountries);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country: Country) => {
    const cookieService = CookieService.getInstance();
    cookieService.storeCountry(country.code);
    onCountrySelect?.(country);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {countries.map((country) => (
        <Link
          key={country.code}
          to={`/${country.code.toLowerCase()}`}
          className="flex items-center p-4 border rounded-lg hover:shadow-lg transition-shadow"
          onClick={() => handleCountryClick(country)}
        >
          <span className="text-2xl mr-3">{country.flag_emoji}</span>
          <span className="text-lg">{country.name}</span>
        </Link>
      ))}
    </div>
  );
} 