import { getCollection } from '../client';

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Country {
  id: number;
  code: string;
  name: string;
  flag_emoji: string;
  is_active: boolean;
}

export class CountryService {
  private static instance: CountryService;
  private countries: Country[] | null = null;

  private constructor() {}

  public static getInstance(): CountryService {
    if (!CountryService.instance) {
      CountryService.instance = new CountryService();
    }
    return CountryService.instance;
  }

  public async getCountries(): Promise<Country[]> {
    if (this.countries) {
      return this.countries;
    }

    try {
      const response = await getCollection<Country>('countries', {
        filters: {
          is_active: { $eq: true }
        }
      });
      
      // Extract the data array from the response
      const countries = response.data || [];
      this.countries = countries;
      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  public clearCache(): void {
    this.countries = null;
  }

  async getCountryByCode(code: string): Promise<Country | null> {
    const params = {
      filters: {
        code: { $eq: code }
      }
    };

    const response = await getCollection<Country>('countries', params);
    return response.data?.[0] || null;
  }
} 