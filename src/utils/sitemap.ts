
interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  countries: string[];
  pages: {
    path: string;
    changefreq: SitemapUrl['changefreq'];
    priority: number;
    includeCountries?: boolean;
  }[];
}

export const sitemapConfig: SitemapConfig = {
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

export function generateSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const now = new Date().toISOString().split('T')[0];

  sitemapConfig.pages.forEach(page => {
    if (page.includeCountries) {
      sitemapConfig.countries.forEach(country => {
        urls.push({
          url: `${sitemapConfig.baseUrl}/${country}${page.path === '/' ? '' : page.path}`,
          lastmod: now,
          changefreq: page.changefreq,
          priority: page.priority
        });
      });
    } else {
      urls.push({
        url: `${sitemapConfig.baseUrl}${page.path}`,
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority
      });
    }
  });

  return urls;
}

export function generateSitemapXML(): string {
  const urls = generateSitemapUrls();
  
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

export function generateRobotsTxt(isDevelopment: boolean = false): string {
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
