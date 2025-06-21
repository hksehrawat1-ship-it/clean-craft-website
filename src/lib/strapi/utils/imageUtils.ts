
/**
 * Utility function to handle Strapi image URLs consistently
 */
export function getStrapiImageUrl(imageObj: any): string | null {
  console.log("🖼️ Image object received:", imageObj);
  
  if (!imageObj) return null;
  
  // Handle array format (multiple images)
  if (Array.isArray(imageObj)) {
    imageObj = imageObj[0];
  }
  
  // Handle nested data.attributes format (v4 format)
  let image = imageObj?.data?.attributes ?? imageObj;
  
  // Handle direct object format (what we're actually getting)
  if (!image?.url && imageObj?.url) {
    image = imageObj;
  }
  
  if (!image?.url) {
    console.log("❌ No URL found in image object");
    return null;
  }
  
  // Return full URL if already complete
  if (image.url.startsWith('http')) {
    console.log("✅ Full URL found:", image.url);
    return image.url;
  }
  
  // Construct full URL from relative path
  const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace('/api', '') ?? '';
  const fullUrl = `${baseUrl}${image.url}`;
  console.log("🔗 Constructed URL:", fullUrl);
  return fullUrl;
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
