// This file will be moved to the scripts directory.

import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sitemapConfig = {
  baseUrl: 'https://cleancraftapp.com',
  countries: ['in', 'au'],
  defaultPriority: 0.7,
  defaultChangefreq: 'weekly'
};

// Load pages.yaml using fs
export function loadPagesYaml() {
  try {
    // Always prioritize the source file first, then fallbacks for different environments
    const possiblePaths = [
      path.join(__dirname, '../src/config/pages.yaml'),    // PRIMARY: Development source (always preferred)
      path.join(__dirname, '../dist/config/pages.yaml'),   // FALLBACK: Production build copy
      path.join(__dirname, '../public/config/pages.yaml'), // FALLBACK: Public directory copy
      path.join(__dirname, '../dist/pages.yaml')           // FALLBACK: Legacy location
    ];

    let yamlText;
    let usedPath;
    let pagesYaml;

    // Try each path until we find a valid file
    for (const pagesYamlPath of possiblePaths) {
      if (fs.existsSync(pagesYamlPath)) {
        yamlText = fs.readFileSync(pagesYamlPath, 'utf8');
        usedPath = pagesYamlPath;
        console.log('Found pages.yaml at:', pagesYamlPath);
        
        try {
          pagesYaml = yaml.load(yamlText);
          
          // Validate that this is the enhanced version with site configuration
          if (pagesYaml?.site?.production_url) {
            console.log('✅ Using enhanced pages.yaml with site configuration');
            break;
          } else if (usedPath.includes('src/config/pages.yaml')) {
            // If it's the source file but missing site config, something is wrong
            console.warn('⚠️  Source pages.yaml missing site configuration - this should not happen');
        break;
          } else {
            // This is a fallback file without enhancements
            console.warn(`⚠️  Found outdated pages.yaml at ${pagesYamlPath} - continuing search for enhanced version`);
            yamlText = null;
            usedPath = null;
            pagesYaml = null;
            continue;
          }
        } catch (parseError) {
          console.warn(`Failed to parse YAML at ${pagesYamlPath}:`, parseError.message);
          yamlText = null;
          usedPath = null;
          pagesYaml = null;
          continue;
        }
      } else {
        console.log('pages.yaml not found at:', pagesYamlPath);
      }
    }

    if (!yamlText || !pagesYaml) {
      throw new Error(`Enhanced pages.yaml not found in any of these locations: ${possiblePaths.join(', ')}`);
    }

    console.log('Loading pages.yaml from:', usedPath);
    
    // Use site configuration if available
    if (pagesYaml.site?.production_url) {
      sitemapConfig.baseUrl = pagesYaml.site.production_url;
      console.log('Using base URL from pages.yaml:', sitemapConfig.baseUrl);
    } else {
      console.warn('⚠️  No site configuration found in pages.yaml - using default base URL');
    }
    
    // Validate essential structure
    if (!pagesYaml.countries || !pagesYaml.seo?.pages) {
      console.warn('⚠️  pages.yaml missing essential structure (countries or SEO pages)');
    }
    
    return pagesYaml;
  } catch (error) {
    console.error('Error loading pages.yaml:', error);
    return null;
  }
}

function processNavigationPages(pages, baseUrl, now, urls, country = '') {
  if (!Array.isArray(pages)) {
    console.warn('Expected pages to be an array, got:', typeof pages);
    return;
  }

  pages.forEach(page => {
    // Add the main page URL
    const urlPath = country ? `/${country}${page.path}` : page.path;
    
    // Determine priority based on page importance and path
    let priority = sitemapConfig.defaultPriority;
    if (page.path === '/') {
      priority = 1.0; // Homepage has highest priority
    } else if (page.order <= 3) {
      priority = 0.8; // High priority for main navigation items
    } else if (page.navbar) {
      priority = 0.7; // Standard priority for navbar items
    } else {
      priority = 0.6; // Lower priority for non-navbar pages
    }
    
    const urlData = {
      url: `${baseUrl}${urlPath}`,
      lastmod: now,
      changefreq: sitemapConfig.defaultChangefreq,
      priority: priority
    };
    urls.add(JSON.stringify(urlData)); // Convert to string for Set storage

    // Process children pages if they exist
    if (page.children && Array.isArray(page.children)) {
      processNavigationPages(page.children, baseUrl, now, urls, country);
    }
  });
}

function processSEOPages(seoPages, baseUrl, now, urls) {
  // Process each SEO page path
  Object.keys(seoPages).forEach(pagePath => {
    const pageConfig = seoPages[pagePath];
    
    // Get SEO metadata for this page
    const priority = pageConfig.priority || sitemapConfig.defaultPriority;
    const changefreq = pageConfig.changefreq || sitemapConfig.defaultChangefreq;
    
    // Add URLs for each country that has SEO data for this page
    Object.keys(pageConfig).forEach(country => {
      // Skip metadata fields
      if (country === 'priority' || country === 'changefreq') return;
      
      const urlPath = `/${country}${pagePath}`;
      const seoData = pageConfig[country];
      
      const urlData = {
        url: `${baseUrl}${urlPath}`,
        lastmod: now,
        changefreq: changefreq,
        priority: priority
      };
      urls.add(JSON.stringify(urlData)); // Convert to string for Set storage
    });
  });
}

export function generateSitemapUrls() {
  const pagesYaml = loadPagesYaml();
  if (!pagesYaml) {
    console.error('Failed to load pages.yaml');
    return [];
  }

  const urls = new Set(); // Use Set to avoid duplicates
  const now = new Date().toISOString().split('T')[0];

  // 1. Process navigation structure (global and country-specific)
  if (pagesYaml.global?.pages) {
    console.log('Processing global navigation pages');
    processNavigationPages(pagesYaml.global.pages, sitemapConfig.baseUrl, now, urls);
  }

  // Process country-specific navigation
  sitemapConfig.countries.forEach(country => {
    if (pagesYaml[country]?.pages) {
      console.log(`Processing ${country} navigation pages`);
      processNavigationPages(pagesYaml[country].pages, sitemapConfig.baseUrl, now, urls, country);
    }
  });

  // 2. Process SEO pages to ensure we haven't missed any
  if (pagesYaml.seo?.pages) {
    console.log('Processing SEO pages');
    processSEOPages(pagesYaml.seo.pages, sitemapConfig.baseUrl, now, urls);
  }

  // Convert Set of stringified objects back to array of objects
  const finalUrls = Array.from(urls).map(urlString => JSON.parse(urlString));
  console.log(`Generated ${finalUrls.length} unique URLs`);
  return finalUrls;
}

export async function generateSitemapXML() {
  const urls = await generateSitemapUrls();
  if (!Array.isArray(urls)) {
    console.error('generateSitemapUrls did not return an array');
    return '';
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

export function generateRobotsTxt(isDevelopment = false, pagesYaml = null) {
  let baseUrl;
  
  if (pagesYaml?.site) {
    baseUrl = isDevelopment ? 
      (pagesYaml.site.development_url || 'http://localhost:8080') : 
      (pagesYaml.site.production_url || 'https://cleancraftapp.com');
  } else {
    baseUrl = isDevelopment ? 'http://localhost:8080' : 'https://cleancraftapp.com';
  }
  
  let robotsTxt = '';
  
  // Allow all bots in production, restrict in development
  if (isDevelopment) {
    robotsTxt += 'User-agent: *\n';
    robotsTxt += 'Disallow: /\n\n';
    robotsTxt += '# Development environment - crawling disabled\n\n';
  } else {
    robotsTxt += '# Robots.txt for CleanCraft - Production optimized\n\n';
    
    // Main search engines with optimized crawl delays
    robotsTxt += 'User-agent: Googlebot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 1\n\n';
    
    robotsTxt += 'User-agent: Bingbot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 1\n\n';
    
    // Social media crawlers - immediate access
    robotsTxt += 'User-agent: Twitterbot\n';
    robotsTxt += 'Allow: /\n\n';
    
    robotsTxt += 'User-agent: facebookexternalhit\n';
    robotsTxt += 'Allow: /\n\n';
    
    robotsTxt += 'User-agent: LinkedInBot\n';
    robotsTxt += 'Allow: /\n\n';
    
    robotsTxt += 'User-agent: WhatsApp\n';
    robotsTxt += 'Allow: /\n\n';
    
    // Other search engines
    robotsTxt += 'User-agent: DuckDuckBot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 2\n\n';
    
    robotsTxt += 'User-agent: YandexBot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 3\n\n';
    
    // Default for all other bots
    robotsTxt += 'User-agent: *\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 2\n\n';
    
    // Disallow admin and development paths
    robotsTxt += 'Disallow: /admin/\n';
    robotsTxt += 'Disallow: /_dev/\n';
    robotsTxt += 'Disallow: /api/\n';
    robotsTxt += 'Disallow: /.well-known/\n';
    robotsTxt += 'Disallow: /temp/\n';
    robotsTxt += 'Disallow: /cache/\n\n';
    
    // Allow important static assets
    robotsTxt += 'Allow: /lovable-uploads/\n';
    robotsTxt += 'Allow: /assets/\n';
    robotsTxt += 'Allow: /fonts/\n';
    robotsTxt += 'Allow: /css/\n';
    robotsTxt += 'Allow: /js/\n\n';
  }
  
  // Add sitemap reference
  robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;
  
  return robotsTxt;
}

// Add function to generate blog URLs (for future integration with Strapi)
async function generateBlogUrls(baseUrl, now, urls) {
  // This function can be enhanced to fetch blog posts from Strapi
  // For now, we'll add the blog listing pages which are already handled by SEO pages
  
  // Future implementation could fetch from Strapi:
  // try {
  //   const response = await fetch(`${process.env.VITE_STRAPI_URL}/api/blogs?populate=*`);
  //   const { data: blogs } = await response.json();
  //   
  //   blogs.forEach(blog => {
  //     const country = blog.attributes.country?.data?.attributes?.code || 'in';
  //     const slug = blog.attributes.slug || blog.id;
  //     const urlPath = `/${country}/blog/${slug}`;
  //     
  //     const urlData = {
  //       url: `${baseUrl}${urlPath}`,
  //       lastmod: blog.attributes.updatedAt?.split('T')[0] || now,
  //       changefreq: 'monthly',
  //       priority: 0.6
  //     };
  //     urls.add(JSON.stringify(urlData));
  //   });
  // } catch (error) {
  //   console.warn('Could not fetch blog posts for sitemap:', error.message);
  // }
  
  console.log('Blog URL generation placeholder - can be enhanced with Strapi integration');
}
