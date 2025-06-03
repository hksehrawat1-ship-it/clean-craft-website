
import qs from 'qs';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const isDev = import.meta.env.DEV;
if (!isDev) {
  if (!STRAPI_URL) throw new Error('VITE_STRAPI_URL is not defined');
  if (!STRAPI_TOKEN) throw new Error('VITE_STRAPI_API_TOKEN is not defined');
}

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

interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// Create a custom fetch wrapper with proper timeout and error handling
const strapiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  timeout = 10000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${STRAPI_URL}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Strapi server may be unreachable');
      }
      throw error;
    }
    throw new Error('Unknown error occurred while fetching from Strapi');
  }
};

const stringifyParams = (params: Record<string, any>) =>
  qs.stringify(params, { encodeValuesOnly: true });

export const getCollection = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<StrapiResponse<T>> => {
  try {
    if (isDev && !STRAPI_TOKEN) {
      console.warn('Development mode: No Strapi token available, using fallback data');
      // Return empty response structure for development
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 0,
            pageCount: 0,
            total: 0,
          },
        },
      };
    }

    const queryString = stringifyParams(params);
    const url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    console.log(`🔗 Fetching Strapi collection: ${STRAPI_URL}/${url}`);
    
    const response = await strapiRequest(url);
    const data = await response.json() as StrapiResponse<T>;

    console.log(`✅ Successfully fetched ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    
    // Return empty response structure on error instead of throwing
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};

export const getSingle = async <T>(
  singleName: string,
  params?: Record<string, any>
): Promise<T | null> => {
  try {
    const queryString = params ? `?${stringifyParams(params)}` : '';
    const url = `${singleName}${queryString}`;
    
    console.log(`🔗 Fetching Strapi single: ${STRAPI_URL}/${url}`);
    
    const response = await strapiRequest(url);
    const json = await response.json() as StrapiSingleResponse<T>;
    
    console.log(`✅ Successfully fetched ${singleName}:`, json.data);
    return json.data;
  } catch (error) {
    console.error(`❌ Error fetching ${singleName}:`, error);
    return null;
  }
};

export const createEntry = async <T>(
  collectionName: string,
  data: Record<string, any>
): Promise<T | null> => {
  try {
    const response = await strapiRequest(collectionName, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    const json = await response.json() as StrapiSingleResponse<T>;
    console.log(`✅ Successfully created ${collectionName}:`, json.data);
    return json.data;
  } catch (error) {
    console.error(`❌ Error creating ${collectionName}:`, error);
    return null;
  }
};

export const updateEntry = async <T>(
  collectionName: string,
  id: string | number,
  data: Record<string, any>
): Promise<T | null> => {
  try {
    const response = await strapiRequest(`${collectionName}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });

    const json = await response.json() as StrapiSingleResponse<T>;
    console.log(`✅ Successfully updated ${collectionName}:`, json.data);
    return json.data;
  } catch (error) {
    console.error(`❌ Error updating ${collectionName}:`, error);
    return null;
  }
};

export const deleteEntry = async <T>(
  collectionName: string,
  id: string | number
): Promise<T | null> => {
  try {
    const response = await strapiRequest(`${collectionName}/${id}`, {
      method: 'DELETE',
    });

    const json = await response.json() as StrapiSingleResponse<T>;
    console.log(`✅ Successfully deleted ${collectionName}:`, json.data);
    return json.data;
  } catch (error) {
    console.error(`❌ Error deleting ${collectionName}:`, error);
    return null;
  }
};

// Remove the old strapiClient export that was causing issues
// export const strapiClient = strapi({
//   baseURL: STRAPI_URL,
//   auth: STRAPI_TOKEN,
// });
