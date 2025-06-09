// This file will be moved to the scripts directory.

import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sitemapConfig = {
  baseUrl: 'https://cleancraft.com',
  countries: ['in', 'au'],
  defaultPriority: 0.7,
  defaultChangefreq: 'weekly'
};

// Load pages.yaml using fs
function loadPagesYaml() {
  try {
    // Try multiple possible locations for the YAML file
    const possiblePaths = [
      path.join(__dirname, '../src/config/pages.yaml'),  // Development source
      path.join(__dirname, '../dist/config/pages.yaml'), // Production build from src/config
      path.join(__dirname, '../public/config/pages.yaml'), // Public directory source
      path.join(__dirname, '../dist/pages.yaml')  // Production build from public
    ];

    let yamlText;
    let usedPath;

    // Try each path until we find the file
    for (const pagesYamlPath of possiblePaths) {
      if (fs.existsSync(pagesYamlPath)) {
        yamlText = fs.readFileSync(pagesYamlPath, 'utf8');
        usedPath = pagesYamlPath;
        console.log('Found pages.yaml at:', pagesYamlPath);
        break;
      } else {
        console.log('pages.yaml not found at:', pagesYamlPath);
      }
    }

    if (!yamlText) {
      throw new Error(`pages.yaml not found in any of these locations: ${possiblePaths.join(', ')}`);
    }

    console.log('Loading pages.yaml from:', usedPath);
    const pagesYaml = yaml.load(yamlText);
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
    const urlData = {
      url: `${baseUrl}${urlPath}`,
      lastmod: now,
      changefreq: sitemapConfig.defaultChangefreq,
      priority: page.path === '/' ? 1.0 : sitemapConfig.defaultPriority
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
    
    // Add URLs for each country that has SEO data for this page
    Object.keys(pageConfig).forEach(country => {
      const urlPath = `/${country}${pagePath}`;
      const urlData = {
        url: `${baseUrl}${urlPath}`,
        lastmod: now,
        changefreq: sitemapConfig.defaultChangefreq,
        priority: pagePath === '/' ? 1.0 : sitemapConfig.defaultPriority
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

export function generateRobotsTxt(isDevelopment = false) {
  const baseUrl = isDevelopment ? 'http://localhost:8080' : 'https://cleancraft.com';
  
  let robotsTxt = '';
  
  // Allow all bots in production, restrict in development
  if (isDevelopment) {
    robotsTxt += 'User-agent: *\n';
    robotsTxt += 'Disallow: /\n\n';
  } else {
    // Main search engines
    robotsTxt += 'User-agent: Googlebot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 1\n\n';
    
    robotsTxt += 'User-agent: Bingbot\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 1\n\n';
    
    // Social media crawlers
    robotsTxt += 'User-agent: Twitterbot\n';
    robotsTxt += 'Allow: /\n\n';
    
    robotsTxt += 'User-agent: facebookexternalhit\n';
    robotsTxt += 'Allow: /\n\n';
    
    // Default for all other bots
    robotsTxt += 'User-agent: *\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Crawl-delay: 2\n\n';
    
    // Disallow admin and development paths
    robotsTxt += 'Disallow: /admin/\n';
    robotsTxt += 'Disallow: /_dev/\n';
    robotsTxt += 'Disallow: /api/\n';
    robotsTxt += 'Disallow: /.well-known/\n\n';
  }
  
  // Add sitemap reference
  robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;
  
  return robotsTxt;
}
