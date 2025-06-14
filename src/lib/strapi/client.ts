import qs from 'qs';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

if (!STRAPI_URL) throw new Error('VITE_STRAPI_URL is not defined');
if (!STRAPI_TOKEN) throw new Error('VITE_STRAPI_API_TOKEN is not defined');

// 🔧 Clean undefined values (even nested)
function cleanUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined);
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanUndefined(v)])
    );
  }
  return obj;
}

const stringifyParams = (params: Record<string, any>) =>
  qs.stringify(cleanUndefined(params), { encodeValuesOnly: true });

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

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 15000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function retryFetch(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${url}`);
      const response = await fetchWithTimeout(url, options);

      if (response.ok) {
        console.log(`✅ Success on attempt ${attempt} for ${url}`);
        return response;
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`❌ Attempt ${attempt} failed for ${url}:`, lastError.message);

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

export const getCollection = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<StrapiResponse<T>> => {
  try {
    const queryString = stringifyParams(params);
    const url = `${STRAPI_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    console.log(`🔗 Fetching: ${url}`);
    const response = await retryFetch(url);
    const json = (await response.json()) as StrapiResponse<T>;

    console.log(`✅ [${endpoint}] fetched successfully`);
    return json;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const getSingle = async <T>(
  singleName: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const queryString = params ? `?${stringifyParams(params)}` : '';
    const url = `${STRAPI_URL}/${singleName}${queryString}`;

    const response = await retryFetch(url);
    const json = (await response.json()) as StrapiSingleResponse<T>;
    return json.data;
  } catch (error) {
    console.error(`❌ Error in getSingle:`, error);
    throw error;
  }
};

export const createEntry = async <T>(
  collectionName: string,
  data: Record<string, any>
): Promise<T> => {
  try {
    const url = `${STRAPI_URL}/${collectionName}`;

    const response = await retryFetch(url, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    const json = (await response.json()) as StrapiSingleResponse<T>;
    return json.data;
  } catch (error) {
    console.error(`❌ Error in createEntry:`, error);
    throw error;
  }
};

export const updateEntry = async <T>(
  collectionName: string,
  id: string | number,
  data: Record<string, any>
): Promise<T> => {
  try {
    const url = `${STRAPI_URL}/${collectionName}/${id}`;

    const response = await retryFetch(url, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });

    const json = (await response.json()) as StrapiSingleResponse<T>;
    return json.data;
  } catch (error) {
    console.error(`❌ Error in updateEntry:`, error);
    throw error;
  }
};

export const deleteEntry = async <T>(
  collectionName: string,
  id: string | number
): Promise<T> => {
  try {
    const url = `${STRAPI_URL}/${collectionName}/${id}`;

    const response = await retryFetch(url, {
      method: 'DELETE',
    });

    const json = (await response.json()) as StrapiSingleResponse<T>;
    return json.data;
  } catch (error) {
    console.error(`❌ Error in deleteEntry:`, error);
    throw error;
  }
};
