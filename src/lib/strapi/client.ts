import qs from "qs";

/* ------------------------------------------------------------------ */
/*  Env vars                                                          */
/* ------------------------------------------------------------------ */
const STRAPI_URL   = import.meta.env.VITE_STRAPI_URL   || "http://localhost:1337/api";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

if (!STRAPI_URL)   throw new Error("VITE_STRAPI_URL is not defined");
if (!STRAPI_TOKEN) throw new Error("VITE_STRAPI_API_TOKEN is not defined");

/* ------------------------------------------------------------------ */
/*  Utility: recursively drop undefined                               */
/* ------------------------------------------------------------------ */
function cleanUndefined(obj: any): any {
  if (Array.isArray(obj)) return obj.map(cleanUndefined);
  if (obj && typeof obj === "object")
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanUndefined(v)])
    );
  return obj;
}

/* ------------------------------------------------------------------ */
/*  ⭐ Custom stringify: keep '*' and ':' untouched                    */
/* ------------------------------------------------------------------ */
const stringifyParams = (params: Record<string, any>) =>
  qs.stringify(cleanUndefined(params), {
    encodeValuesOnly: true,
    encoder: (v) => {
      const str = String(v);
      if (str === "*" || str.includes(":")) return str; // keep Strapi wildcards
      return encodeURIComponent(str);
    },
  });

/* ------------------------------------------------------------------ */
/*  Response types                                                    */
/* ------------------------------------------------------------------ */
interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
}
interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Core fetch helpers                                                */
/* ------------------------------------------------------------------ */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 15_000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function retryFetch(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  let lastErr: Error;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`🔄 Attempt ${i}/${maxRetries} → ${url}`);
      const res = await fetchWithTimeout(url, options);
      if (res.ok) return res;

      // ⬇️ READ ERROR BODY FOR DEBUGGING
      const body = await res.text();
      console.error("🔥 Strapi error body:", body);
      throw new Error(`HTTP ${res.status}: ${body}`);
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error("Unknown error");
      console.warn(`❌ Attempt ${i} failed:`, lastErr.message);
      if (i < maxRetries) {
        const wait = Math.min(1000 * 2 ** (i - 1), 5000);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }
  throw lastErr!;
}

/* ------------------------------------------------------------------ */
/*  Public API wrappers                                               */
/* ------------------------------------------------------------------ */
export const getCollection = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<StrapiResponse<T>> => {
  const qsStr = stringifyParams(params);
  const url = `${STRAPI_URL}/${endpoint}${qsStr ? `?${qsStr}` : ""}`;
  const res = await retryFetch(url);
  return (await res.json()) as StrapiResponse<T>;
};

export const getSingle = async <T>(
  single: string,
  params?: Record<string, any>
): Promise<T> => {
  const qsStr = params ? `?${stringifyParams(params)}` : "";
  const url = `${STRAPI_URL}/${single}${qsStr}`;
  const res = await retryFetch(url);
  const json = (await res.json()) as StrapiSingleResponse<T>;
  return json.data;
};

export const createEntry = async <T>(
  collection: string,
  data: Record<string, any>
): Promise<T> => {
  const url = `${STRAPI_URL}/${collection}`;
  const res = await retryFetch(url, {
    method: "POST",
    body: JSON.stringify({ data }),
  });
  const json = (await res.json()) as StrapiSingleResponse<T>;
  return json.data;
};

export const updateEntry = async <T>(
  collection: string,
  id: string | number,
  data: Record<string, any>
): Promise<T> => {
  const url = `${STRAPI_URL}/${collection}/${id}`;
  const res = await retryFetch(url, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });
  const json = (await res.json()) as StrapiSingleResponse<T>;
  return json.data;
};

export const deleteEntry = async <T>(
  collection: string,
  id: string | number
): Promise<T> => {
  const url = `${STRAPI_URL}/${collection}/${id}`;
  const res = await retryFetch(url, { method: "DELETE" });
  const json = (await res.json()) as StrapiSingleResponse<T>;
  return json.data;
};
