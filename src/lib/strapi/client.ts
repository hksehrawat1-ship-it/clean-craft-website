
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

const stringifyParams = (params: Record<string, any>) =>
  qs.stringify(params, { encodeValuesOnly: true });

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 15000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
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
  maxRetries: number = 3
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
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
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
    if (isDev && !STRAPI_TOKEN) {
      throw new Error('Development mode: No Strapi token available');
    }

    const queryString = stringifyParams(params);
    const url = `${STRAPI_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    console.log(`🔗 Fetching: ${url}`);
    console.log(`📋 Params:`, params);

    const response = await retryFetch(url);
    const json = await response.json() as StrapiResponse<T>;

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
  const queryString = params ? `?${stringifyParams(params)}` : '';
  const url = `${STRAPI_URL}/${singleName}${queryString}`;

  const response = await retryFetch(url);
  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const createEntry = async <T>(
  collectionName: string,
  data: Record<string, any>
): Promise<T> => {
  const url = `${STRAPI_URL}/${collectionName}`;

  const response = await retryFetch(url, {
    method: 'POST',
    body: JSON.stringify({ data }),
  });

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const updateEntry = async <T>(
  collectionName: string,
  id: string | number,
  data: Record<string, any>
): Promise<T> => {
  const url = `${STRAPI_URL}/${collectionName}/${id}`;

  const response = await retryFetch(url, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const deleteEntry = async <T>(
  collectionName: string,
  id: string | number
): Promise<T> => {
  const url = `${STRAPI_URL}/${collectionName}/${id}`;

  const response = await retryFetch(url, {
    method: 'DELETE',
  });

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

// Remove the old strapi client export since we're not using it anymore
// export const strapiClient = strapi({
//   baseURL: STRAPI_URL,
//   auth: STRAPI_TOKEN,
// });
