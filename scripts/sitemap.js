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
  pages: [
    { path: '/', changefreq: 'weekly', priority: 1.0, includeCountries: true },
    { path: '/services', changefreq: 'weekly', priority: 0.9, includeCountries: true },
    { path: '/learning/courses', changefreq: 'monthly', priority: 0.8, includeCountries: true },
    { path: '/learning/book', changefreq: 'monthly', priority: 0.8, includeCountries: true },
    { path: '/franchise', changefreq: 'monthly', priority: 0.8, includeCountries: true },
    { path: '/faq', changefreq: 'weekly', priority: 0.7, includeCountries: true },
    { path: '/policies', changefreq: 'monthly', priority: 0.5, includeCountries: true }
  ]
};

// Load pages.yaml using fs
function loadPagesYaml() {
  try {
    const pagesYamlPath = path.join(__dirname, '../config/pages.yaml'); // Adjust the path as needed
    const yamlText = fs.readFileSync(pagesYamlPath, 'utf8');
    const pagesYaml = yaml.load(yamlText);
    console.log('Loaded pagesYaml:', pagesYaml); // Log the loaded YAML
    return pagesYaml;
  } catch (error) {
    console.error('Error loading pages.yaml:', error);
    return null; // Return null or an empty object to handle errors gracefully
  }
}

function processPages(pages, baseUrl, now, urls, country = '') {
  pages.forEach(page => {
    const urlPath = country ? `/${country}${page.path}` : page.path;
    urls.push({
      url: `${baseUrl}${urlPath}`,
      lastmod: now,
      changefreq: 'weekly', // Default changefreq
      priority: 0.7 // Default priority
    });

    // Recursively process children if they exist
    if (page.children) {
      processPages(page.children, baseUrl, now, urls, country);
    }
  });
}

export function generateSitemapUrls() {
  const pagesYaml = loadPagesYaml();
  if (!pagesYaml) {
    console.error('Failed to load pages.yaml');
    return [];
  }

  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  // Process global pages
  if (pagesYaml.global && pagesYaml.global.pages) {
    processPages(pagesYaml.global.pages, sitemapConfig.baseUrl, now, urls);
  }

  // Process country-specific pages
  Object.keys(pagesYaml).forEach(country => {
    if (country !== 'global' && pagesYaml[country] && pagesYaml[country].pages) {
      processPages(pagesYaml[country].pages, sitemapConfig.baseUrl, now, urls, country);
    }
  });

  console.log('Generated URLs:', urls); // Log the generated URLs
  return urls;
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
