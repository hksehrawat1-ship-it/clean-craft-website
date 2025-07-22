import { Helmet } from "react-helmet-async";
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

  const { data: seoData, isLoading } = usePageConfigSEO(slug, countryCode);

  if (isLoading) return null;

  const title = seoData?.seo_title?.trim() || defaultTitle;
  const description = seoData?.seo_description?.trim() || defaultDescription;

  const yamlKeywords = seoData?.seo_keywords
    ? seoData.seo_keywords.split(", ").map((k) => k.trim())
    : [];
  const keywords = [...yamlKeywords, ...customKeywords].join(", ");

  const image =
    seoData?.seo_image || `${baseUrl}/lovable-uploads/cleancraft-full-logo.png`;

  const generateRobotsContent = () => {
    const directives = [];
    directives.push(noIndex ? "noindex" : "index");
    directives.push("follow");

    switch (pageType) {
      case "Course":
        directives.push("max-snippet:200", "max-video-preview:30");
        break;
      case "Book":
        directives.push("max-snippet:160", "max-video-preview:20");
        break;
      case "Organization":
        directives.push("max-snippet:300", "max-video-preview:60");
        break;
      default:
        directives.push("max-snippet:250", "max-video-preview:45");
    }

    if (maxSnippet) {
      const snippetIndex = directives.findIndex((d) =>
        d.startsWith("max-snippet")
      );
      if (snippetIndex !== -1) {
        directives[snippetIndex] = `max-snippet:${maxSnippet}`;
      }
    }

    directives.push(`max-image-preview:${maxImagePreview}`);
    return directives.join(", ");
  };

  const structuredData = generateStructuredData(pageType, countryCode, seoData);

  const hreflangUrls = ["in", "au"].map((code) => ({
    hreflang: code === "in" ? "en-IN" : "en-AU",
    href: `${baseUrl}/${code}${slug === "/" ? "" : slug}`,
  }));

  const canonicalUrl = `${baseUrl}/${countryCode}${slug === "/" ? "" : slug}`;

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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

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

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
