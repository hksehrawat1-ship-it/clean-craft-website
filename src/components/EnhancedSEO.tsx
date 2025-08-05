import { Helmet } from "react-helmet"; // ✅ Updated
import { useCountry } from "@/contexts/CountryContext";
import { usePageConfigSEO } from "@/hooks/usePageConfigSEO";
import { generateStructuredData } from "@/config/seo-config";

interface EnhancedSEOProps {
  slug: string;
  defaultTitle?: string;
  defaultDescription?: string;
  pageType?: "LocalBusiness" | "Course" | "Book" | "Organization";
  customKeywords?: string[];
  noIndex?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
}

export function EnhancedSEO({
  slug,
  defaultTitle = "CleanCraft",
  defaultDescription = "Professional dry cleaning and wet cleaning services",
  pageType = "LocalBusiness",
  customKeywords = [],
  noIndex = false,
  maxSnippet,
  maxImagePreview = "large",
}: EnhancedSEOProps) {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";
  const baseUrl = "https://cleancraftapp.com";

  const cleanSlug = slug.replace(/^\/(in|au)(\/|$)/, "/");

  const { data: seoData, isLoading } = usePageConfigSEO(cleanSlug);
  if (isLoading) return null;

  // Debug Logs
  console.log("🔍 Cleaned Slug:", cleanSlug);
  console.log("🌎 Country Code:", countryCode);
  console.log("📦 Raw SEO Data:", seoData);

  const rawDescription = seoData?.seo_description?.trim();
  const description = rawDescription?.length
    ? rawDescription
    : defaultDescription;

  console.log("📌 Final Meta Description:", description);

  const title = seoData?.seo_title?.trim() || defaultTitle;

  const yamlKeywords = seoData?.seo_keywords
    ? seoData.seo_keywords.split(",").map((k) => k.trim())
    : [];
  const keywords = [...yamlKeywords, ...customKeywords].join(", ");

  const image =
    seoData?.seo_image || `${baseUrl}/lovable-uploads/cleancraft-full-logo.png`;

  const generateRobotsContent = () => {
    const directives = [
      noIndex ? "noindex" : "index",
      "follow",
      `max-snippet:${
        maxSnippet ??
        {
          Course: 200,
          Book: 160,
          Organization: 300,
          LocalBusiness: 250,
        }[pageType]
      }`,
      "max-video-preview:45",
      `max-image-preview:${maxImagePreview}`,
    ];
    return directives.join(", ");
  };

  const structuredData = generateStructuredData(pageType, countryCode, seoData);

  const hreflangUrls = ["in", "au"].map((code) => ({
    hreflang: code === "in" ? "en-IN" : "en-AU",
    href: `${baseUrl}/${code}${cleanSlug === "/" ? "" : cleanSlug}`,
  }));

  const canonicalUrl = `${baseUrl}/${countryCode}${
    cleanSlug === "/" ? "" : cleanSlug
  }`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={generateRobotsContent()} />
      <meta name="googlebot" content={generateRobotsContent()} />
      <meta name="bingbot" content="index, follow" />

      {hreflangUrls.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="CleanCraft" />
      <meta
        property="og:locale"
        content={countryCode === "in" ? "en_IN" : "en_AU"}
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo and Others */}
      <meta name="geo.region" content={countryCode.toUpperCase()} />
      <meta
        name="geo.placename"
        content={countryCode === "in" ? "India" : "Australia"}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cleancraft.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
