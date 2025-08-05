export const getStrapiImageUrl = (image: any) => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  if (image.data?.attributes?.url) return image.data.attributes.url;
  return null;
};

export const getStrapiImageAlt = (image: any, fallback = 'Image') => {
  if (!image) return fallback;
  if (image.alternativeText) return image.alternativeText;
  if (image.data?.attributes?.alternativeText) return image.data.attributes.alternativeText;
  return fallback;
};