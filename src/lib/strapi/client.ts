import qs from 'qs';
import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  throw new Error('VITE_STRAPI_URL is not defined');
}

if (!STRAPI_TOKEN) {
  throw new Error('VITE_STRAPI_API_TOKEN is not defined');
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
  meta: {};
}

// Helper functions for common operations
export const getCollection = async <T>(
  collectionName: string, 
  params?: Record<string, any>
): Promise<T[]> => {
  const queryString = params ? `?${qs.stringify(params)}` : '';
  const response = await fetch(`${STRAPI_URL}/${collectionName}${queryString}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collectionName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiResponse<T>;
  return json.data;
};

export const getSingle = async <T>(
  singleName: string, 
  params?: Record<string, any>
): Promise<T> => {
  const queryString = params ? `?${qs.stringify(params)}` : '';
  const response = await fetch(`${STRAPI_URL}/${singleName}${queryString}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${singleName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const createEntry = async <T>(
  collectionName: string, 
  data: Record<string, any>
): Promise<T> => {
  const response = await fetch(`${STRAPI_URL}/${collectionName}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ${collectionName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const updateEntry = async <T>(
  collectionName: string,
  id: string | number,
  data: Record<string, any>
): Promise<T> => {
  const response = await fetch(`${STRAPI_URL}/${collectionName}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update ${collectionName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const deleteEntry = async <T>(
  collectionName: string,
  id: string | number
): Promise<T> => {
  const response = await fetch(`${STRAPI_URL}/${collectionName}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete ${collectionName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};

export const strapiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
strapiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Strapi API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
); 