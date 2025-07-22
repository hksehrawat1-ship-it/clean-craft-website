import { Helmet } from "react-helmet";
import { useStrapiPageSEO } from "@/hooks/useStrapi";

interface SEOProps {
  slug: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function SEO({ slug, defaultTitle, defaultDescription }: SEOProps) {
  const { data: seoData, isLoading } = useStrapiPageSEO(slug);

  const title =
    seoData?.seo_title || seoData?.title || defaultTitle || "CleanCraft";
  const description =
    seoData?.seo_description ||
    defaultDescription ||
    "Professional laundry services";

  if (isLoading) {
    return null;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
}
