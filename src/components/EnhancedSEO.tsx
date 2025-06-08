
import { Helmet } from 'react-helmet-async';
import { useCountry } from '@/contexts/CountryContext';
import { usePageConfigSEO } from '@/hooks/usePageConfigSEO';
import { generateStructuredData } from '@/config/seo-config';

interface EnhancedSEOProps {
  slug: string;
  defaultTitle?: string;
  defaultDescription?: string;
  pageType?: 'LocalBusiness' | 'Course' | 'Book' | 'Organization';
  customKeywords?: string[];
  noIndex?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
}

export function EnhancedSEO({ 
  slug, 
  defaultTitle, 
  defaultDescription, 
  pageType = 'LocalBusiness',
  customKeywords = [],
  noIndex = false,
  maxSnippet,
  maxImagePreview = 'large'
}: EnhancedSEOProps) {
  const { currentCountry } = useCountry();
  const { data: seoData } = usePageConfigSEO(slug);
  
  const countryCode = currentCountry?.toLowerCase() || 'in';
  
  // Prioritize: YAML config > Default props
  const title = seoData?.seo_title || defaultTitle || 'CleanCraft';
  const description = seoData?.seo_description || defaultDescription || 'Professional dry cleaning and wet cleaning services';
  const yamlKeywords = seoData?.seo_keywords ? seoData.seo_keywords.split(', ') : [];
  const keywords = [...yamlKeywords, ...customKeywords].join(', ');
  const image = seoData?.seo_image || 'https://cleancraft.com/lovable-uploads/cleancraft-full-logo.png';
  
  // Generate page-type specific robots meta tags
  const generateRobotsContent = () => {
    const directives = [];
    
    // Index/noindex
    directives.push(noIndex ? 'noindex' : 'index');
    directives.push('follow');
    
    // Page-type specific directives
    switch (pageType) {
      case 'Course':
        directives.push('max-snippet:200');
        directives.push('max-video-preview:30');
        break;
      case 'Book':
        directives.push('max-snippet:160');
        directives.push('max-video-preview:20');
        break;
      case 'Organization':
        directives.push('max-snippet:300');
        directives.push('max-video-preview:60');
        break;
      default: // LocalBusiness
        directives.push('max-snippet:250');
        directives.push('max-video-preview:45');
    }
    
    // Custom max-snippet if provided
    if (maxSnippet) {
      const snippetIndex = directives.findIndex(d => d.startsWith('max-snippet'));
      if (snippetIndex !== -1) {
        directives[snippetIndex] = `max-snippet:${maxSnippet}`;
      }
    }
    
    // Image preview setting
    directives.push(`max-image-preview:${maxImagePreview}`);
    
    return directives.join(', ');
  };
  
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

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced Robots Meta Tags */}
      <meta name="robots" content={generateRobotsContent()} />
      <meta name="googlebot" content={generateRobotsContent()} />
      <meta name="bingbot" content="index, follow" />
      
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
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Geographic targeting */}
      <meta name="geo.region" content={countryCode.toUpperCase()} />
      <meta name="geo.placename" content={countryCode === 'in' ? 'India' : 'Australia'} />
      
      {/* Performance and SEO optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cleancraft.com" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
