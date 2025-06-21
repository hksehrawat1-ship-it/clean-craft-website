
/**
 * Utility function to handle Strapi image URLs consistently
 */
export function getStrapiImageUrl(imageObj: any): string | null {
  if (!imageObj) return null;
  
  // Handle array format
  if (Array.isArray(imageObj)) {
    imageObj = imageObj[0];
  }
  
  // Handle data.attributes format
  const image = imageObj?.data?.attributes ?? imageObj;
  
  if (!image?.url) return null;
  
  // Return full URL if already complete
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  // Construct full URL from relative path
  const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace('/api', '') ?? '';
  return `${baseUrl}${image.url}`;
}

/**
 * Get alternative text for Strapi images
 */
export function getStrapiImageAlt(imageObj: any, fallback: string = ''): string {
  if (!imageObj) return fallback;
  
  // Handle array format
  if (Array.isArray(imageObj)) {
    imageObj = imageObj[0];
  }
  
  // Handle data.attributes format
  const image = imageObj?.data?.attributes ?? imageObj;
  
  return image?.alternativeText || fallback;
}
