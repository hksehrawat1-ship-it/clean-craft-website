/**
 * ✅ Get full image URL from Strapi image object
 */
export function getStrapiImageUrl(imageObj: any): string | null {
  if (!imageObj) return null;

  let imageUrl: string | null = null;

  if (typeof imageObj === "string") {
    imageUrl = imageObj;
  } else if (imageObj.url) {
    imageUrl = imageObj.url;
  } else if (imageObj.data?.attributes?.url) {
    imageUrl = imageObj.data.attributes.url;
  } else if (Array.isArray(imageObj) && imageObj.length > 0) {
    const first = imageObj[0];
    if (typeof first === "string") {
      imageUrl = first;
    } else if (first?.url) {
      imageUrl = first.url;
    } else if (first?.data?.attributes?.url) {
      imageUrl = first.data.attributes.url;
    }
  } else if (imageObj.attributes?.url) {
    imageUrl = imageObj.attributes.url;
  }

  if (!imageUrl) return null;

  // If already full URL
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace(/\/api$/, "") ?? "";
  return `${baseUrl}${imageUrl}`;
}

/**
 * ✅ Get alt text from Strapi image object
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
