import fs from 'fs';
import path from 'path';
import { sitemapConfig, generateSitemapUrls } from './sitemap';

export function generateSitemapFiles() {
  const urls = generateSitemapUrls();
  
  // Generate main sitemap.xml
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
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  
  // Generate robots.txt for production
  const robotsTxt = generateRobotsTxtContent(false);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  
  console.log('✅ Generated sitemap.xml and robots.txt');
  console.log(`📄 Sitemap contains ${urls.length} URLs`);
}

function generateRobotsTxtContent(isDevelopment: boolean = false): string {
  const baseUrl = isDevelopment ? 'http://localhost:8080' : 'https://cleancraft.com';
  
  let robotsTxt = '';
  
  if (isDevelopment) {
    robotsTxt += 'User-agent: *\n';
    robotsTxt += 'Disallow: /\n\n';
  } else {
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
  
  // Add sitemap references
  robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;
  
  return robotsTxt;
}

// CLI function for manual generation
export function runSitemapGeneration() {
  try {
    generateSitemapFiles();
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSitemapGeneration();
}
