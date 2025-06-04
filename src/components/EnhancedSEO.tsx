
import { Helmet } from 'react-helmet-async';
import { useCountry } from '@/contexts/CountryContext';
import { useStrapiPageSEO } from '@/hooks/useStrapi';
import { getPageSEO, generateStructuredData } from '@/config/seo-config';

interface EnhancedSEOProps {
  slug: string;
  defaultTitle?: string;
  defaultDescription?: string;
  pageType?: 'LocalBusiness' | 'Course' | 'Book' | 'Organization';
  customKeywords?: string[];
}

export function EnhancedSEO({ 
  slug, 
  defaultTitle, 
  defaultDescription, 
  pageType = 'LocalBusiness',
  customKeywords = []
}: EnhancedSEOProps) {
  const { currentCountry } = useCountry();
  const { data: seoData, isLoading } = useStrapiPageSEO(slug);
  
  const countryCode = currentCountry?.toLowerCase() || 'in';
  const pageSEO = getPageSEO(slug, countryCode);
  
  // Prioritize: Strapi data > Page-specific config > Defaults
  const title = seoData?.seo_title || pageSEO?.title || defaultTitle || 'CleanCraft';
  const description = seoData?.seo_description || pageSEO?.description || defaultDescription || 'Professional dry cleaning and wet cleaning services';
  const keywords = [...(pageSEO?.keywords || []), ...customKeywords].join(', ');
  
  // Generate structured data
  const structuredData = generateStructuredData(pageType, countryCode, seoData);
  
  // Generate hreflang URLs
  const generateHreflangUrls = () => {
    const baseUrl = 'https://cleancraft.com';
    const supportedCountries = ['in', 'au'];
    
    return supportedCountries.map(country => ({
      hreflang: country === 'in' ? 'en-IN' : 'en-AU',
      href: `${baseUrl}/${country}${slug === '/' ? '' : slug}`
    }));
  };
  
  const hreflangUrls = generateHreflangUrls();
  const canonicalUrl = `https://cleancraft.com/${countryCode}${slug === '/' ? '' : slug}`;

  if (isLoading) {
    return null;
  }

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for international SEO */}
      {hreflangUrls.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="CleanCraft" />
      <meta property="og:locale" content={countryCode === 'in' ? 'en_IN' : 'en_AU'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Geographic targeting */}
      <meta name="geo.region" content={countryCode.toUpperCase()} />
      <meta name="geo.placename" content={countryCode === 'in' ? 'India' : 'Australia'} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
