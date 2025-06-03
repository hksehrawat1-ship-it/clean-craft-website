import { strapi } from '@strapi/client';
import qs from 'qs';
import axios from 'axios';

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

export const strapiClient = strapi({
  baseURL: STRAPI_URL,
  auth: STRAPI_TOKEN,
});

const stringifyParams = (params: Record<string, any>) =>
  qs.stringify(params, { encodeValuesOnly: true });

export const getCollection = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<StrapiResponse<T>> => {
  try {
    if (isDev && !STRAPI_TOKEN) {
      throw new Error('Development mode: No Strapi token available');
    }

    const queryString = stringifyParams(params);
    const collection = strapiClient.collection(endpoint);
    const response = await collection.find(params) as unknown as StrapiResponse<T>;

    console.log(`✅ [${endpoint}] fetched with params:`, params);
    console.log(`🔗 Final URL: ${STRAPI_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`);
    return response;
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
  const response = await fetch(`${STRAPI_URL}/${singleName}${queryString}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
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
      Authorization: `Bearer ${STRAPI_TOKEN}`,
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
      Authorization: `Bearer ${STRAPI_TOKEN}`,
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
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete ${collectionName}: ${response.statusText}`);
  }

  const json = await response.json() as StrapiSingleResponse<T>;
  return json.data;
};
