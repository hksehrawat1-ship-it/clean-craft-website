
/**
 * Utility function to handle Strapi image URLs consistently
 */
export function getStrapiImageUrl(imageObj: any): string | null {
  console.log("🖼️ Raw image object received:", JSON.stringify(imageObj, null, 2));
  
  if (!imageObj) {
    console.log("❌ No image object provided");
    return null;
  }
  
  let imageUrl = null;
  
  // Handle different Strapi image formats
  
  // Format 1: Direct URL (simple string or object with url)
  if (typeof imageObj === 'string') {
    imageUrl = imageObj;
  } else if (imageObj.url) {
    imageUrl = imageObj.url;
  }
  
  // Format 2: Nested data.attributes format (Strapi v4 format)
  else if (imageObj.data?.attributes?.url) {
    imageUrl = imageObj.data.attributes.url;
  }
  
  // Format 3: Array format (multiple images, take first)
  else if (Array.isArray(imageObj) && imageObj.length > 0) {
    const firstImage = imageObj[0];
    if (firstImage.url) {
      imageUrl = firstImage.url;
    } else if (firstImage.data?.attributes?.url) {
      imageUrl = firstImage.data.attributes.url;
    }
  }
  
  // Format 4: Alternative nested structure
  else if (imageObj.attributes?.url) {
    imageUrl = imageObj.attributes.url;
  }
  
  if (!imageUrl) {
    console.log("❌ No URL found in image object structure");
    return null;
  }
  
  // Return full URL if already complete
  if (imageUrl.startsWith('http')) {
    console.log("✅ Full URL found:", imageUrl);
    return imageUrl;
  }
  
  // Construct full URL from relative path
  const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace('/api', '') ?? '';
  const fullUrl = `${baseUrl}${imageUrl}`;
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
  
  // Try different nested formats for alt text
  const altText = 
    imageObj?.alternativeText ||
    imageObj?.data?.attributes?.alternativeText ||
    imageObj?.attributes?.alternativeText ||
    fallback;
  
  return altText;
}
