/**
 * ✅ Get full image URL from Strapi image object
 * Supports various formats: string, object, or array (Strapi v4 friendly)
 */
export function getStrapiImageUrl(imageObj: any): string | null {
  console.log("🖼️ Raw image object received:", imageObj);

  if (!imageObj) {
    console.log("❌ No image object provided");
    return null;
  }

  let imageUrl: string | null = null;

  // Format 1: If it's already a string URL
  if (typeof imageObj === "string") {
    imageUrl = imageObj;
  }

  // Format 2: imageObj.url (possibly old format or manual object)
  else if (imageObj.url) {
    imageUrl = imageObj.url;
  }

  // Format 3: Strapi v4 format - image.data.attributes.url
  else if (imageObj.data?.attributes?.url) {
    imageUrl = imageObj.data.attributes.url;
  }

  // Format 4: Array of images → use first
  else if (Array.isArray(imageObj) && imageObj.length > 0) {
    const first = imageObj[0];
    if (typeof first === "string") {
      imageUrl = first;
    } else if (first?.url) {
      imageUrl = first.url;
    } else if (first?.data?.attributes?.url) {
      imageUrl = first.data.attributes.url;
    }
  }

  // Format 5: imageObj.attributes.url
  else if (imageObj.attributes?.url) {
    imageUrl = imageObj.attributes.url;
  }

  // Final check
  if (!imageUrl) {
    console.log("❌ No URL found in image object structure");
    return null;
  }

  // Return full URL
  if (imageUrl.startsWith("http")) {
    console.log("✅ Full URL found:", imageUrl);
    return imageUrl;
  }

  const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace(/\/api$/, "") ?? "";
  const fullUrl = `${baseUrl}${imageUrl}`;
  console.log("🔗 Constructed URL:", fullUrl);
  return fullUrl;
}

/**
 * ✅ Get alt text from Strapi image object
 * Uses fallback if alt text not found
 */
export function getStrapiImageAlt(imageObj: any, fallback: string = ""): string {
  if (!imageObj) return fallback;

  if (Array.isArray(imageObj)) {
    imageObj = imageObj[0];
  }

  return (
    imageObj?.alternativeText ||
    imageObj?.attributes?.alternativeText ||
    imageObj?.data?.attributes?.alternativeText ||
    fallback
  );
}
