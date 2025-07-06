# Sitemap and SEO Scripts

This directory contains scripts for generating sitemaps and robots.txt files for the CleanCraft website.

## Files Overview

- `generate-sitemap.js` - Main entry point for sitemap generation
- `sitemap-generator.js` - Core sitemap generation logic
- `sitemap.js` - URL processing and robots.txt generation utilities

## How It Works

### 1. Configuration Source
The system uses `src/config/pages.yaml` as the **primary and preferred** configuration source, which contains:

- **Site Configuration**: Production/development URLs, site name, default language
- **Country Metadata**: Supported countries with languages, currencies, timezones
- **SEO Configuration**: Page-specific metadata including titles, descriptions, keywords, priorities, and change frequencies
- **Navigation Structure**: Global and country-specific page hierarchies

### 2. URL Generation Process

1. **Load Configuration**: **Always prioritizes** `src/config/pages.yaml` over any other location
2. **Validate Enhancement**: Ensures the loaded file has site configuration (enhanced version)
3. **Process Navigation**: Generates URLs from global and country-specific navigation structures
4. **Process SEO Pages**: Adds URLs from SEO configuration with explicit priorities and change frequencies
5. **Remove Duplicates**: Uses Set to ensure unique URLs
6. **Generate Sitemap**: Creates XML sitemap with proper metadata
7. **Generate Robots.txt**: Creates robots.txt with correct base URL and sitemap references

### 3. Enhanced File Priority System

The system now uses an **intelligent priority system** that ensures the enhanced configuration is always used:

#### **Search Order & Validation**
1. **`src/config/pages.yaml`** ⭐ **ALWAYS PREFERRED**
   - ✅ Enhanced version with site configuration
   - ✅ Most up-to-date with all features
   - ✅ Primary source of truth

2. **`dist/config/pages.yaml`** (Production fallback)
   - ✅ Automatically copied from src during build
   - ✅ Contains all enhancements

3. **`public/config/pages.yaml`** (Legacy fallback)
   - ⚠️ Only used if source is missing
   - ⚠️ Validates for site configuration before use

4. **`dist/pages.yaml`** (Legacy location)
   - ⚠️ Last resort fallback

#### **Validation Logic**
- **Enhanced Detection**: Checks for `site.production_url` to identify enhanced version
- **Automatic Rejection**: Skips outdated files without site configuration
- **Error Prevention**: Warns if source file is missing enhancements
- **Fallback Protection**: Only uses fallbacks if they contain enhancements

### 4. Build Process Integration

#### **Vite Build Enhancement**
The build process now includes automatic copying of the enhanced configuration:

```typescript
// Custom Vite plugin ensures enhanced pages.yaml is always available
const copyPagesYaml = () => ({
  name: 'copy-pages-yaml',
  writeBundle() {
    // Copies src/config/pages.yaml → dist/config/pages.yaml
    // Ensures production builds always have enhanced configuration
  }
});
```

#### **Build Output**
```bash
npm run build
# Output shows:
# ✅ Copied enhanced pages.yaml to dist/config/
# ✅ Using enhanced pages.yaml with site configuration
# Using base URL from pages.yaml: https://cleancraftapp.com
```

### 5. Generated Files

#### sitemap.xml
- Contains all pages from navigation and SEO configuration
- Includes proper priorities (0.5-1.0) based on page importance
- Uses change frequencies (daily, weekly, monthly) based on content type
- Updates lastmod date automatically

#### robots.txt
- Production: Allows all major search engines with optimized crawl delays
- Development: Disallows all crawling
- Includes proper sitemap references
- Blocks admin and development paths

## Usage

### Generate Sitemap
```bash
# Production sitemap (uses pages.yaml production_url)
npm run generate-sitemap

# Development sitemap (uses pages.yaml development_url)
npm run generate-sitemap:dev
```

### Current Production URL
The system now correctly uses `https://cleancraftapp.com` as defined in `pages.yaml` site configuration.

## Configuration

### Adding New Pages

1. **Add to Navigation Structure** (in pages.yaml):
```yaml
in:
  pages:
    - path: "/new-page"
      navbar: true
      title: "New Page"
      order: 9
```

2. **Add SEO Configuration**:
```yaml
seo:
  pages:
    "/new-page":
      priority: 0.8
      changefreq: "monthly"
      in:
        title: "New Page Title"
        description: "Page description"
        keywords: ["keyword1", "keyword2"]
```

### Priority Guidelines
- **1.0**: Homepage only
- **0.9**: Critical business pages (services, franchise)
- **0.8**: Important content pages (blog, learning)
- **0.7**: Standard navigation pages
- **0.6**: Secondary pages
- **0.5**: Support pages (FAQ, policies)

### Change Frequency Guidelines
- **daily**: Blog listing, frequently updated content
- **weekly**: Homepage, main navigation
- **monthly**: Business pages, static content
- **yearly**: Policies, terms

## Future Enhancements

### 1. Dynamic Blog Content
To include individual blog posts from Strapi, uncomment and modify the `generateBlogUrls` function in `sitemap.js`:

```javascript
// Fetch blog posts from Strapi
const response = await fetch(`${process.env.VITE_STRAPI_URL}/api/blogs?populate=*`);
const { data: blogs } = await response.json();

blogs.forEach(blog => {
  const country = blog.attributes.country?.data?.attributes?.code || 'in';
  const slug = blog.attributes.slug || blog.id;
  const urlPath = `/${country}/blog/${slug}`;
  
  const urlData = {
    url: `${baseUrl}${urlPath}`,
    lastmod: blog.attributes.updatedAt?.split('T')[0] || now,
    changefreq: 'monthly',
    priority: 0.6
  };
  urls.add(JSON.stringify(urlData));
});
```

### 2. Multiple Sitemaps
For large sites, consider splitting into multiple sitemaps:
- Main sitemap index
- Pages sitemap
- Blog sitemap
- Services sitemap

### 3. Automated Generation
Consider adding sitemap generation to:
- Build process (in package.json build script)
- GitHub Actions workflow
- Strapi webhook for blog updates

## Environment Variables

The system supports these environment variables:
- `NODE_ENV`: Determines production vs development mode
- `VITE_ENVIRONMENT`: Alternative environment flag
- `VITE_STRAPI_URL`: For future blog content integration

## Troubleshooting

### Common Issues

1. **pages.yaml not found**: Check file exists in `src/config/pages.yaml`
2. **Wrong base URL**: Verify `site.production_url` in pages.yaml
3. **Missing URLs**: Check both navigation and SEO sections in pages.yaml
4. **Duplicate URLs**: System automatically deduplicates using Set

### Debug Output
The scripts provide detailed console output showing:
- Where pages.yaml was found
- Base URL being used
- Number of URLs processed
- Environment detection

## Integration with Build Process

The sitemap generation integrates with the Vite build process:
- Development: Generates to `public/` directory
- Production: Generates to `dist/` directory after build
- Uses correct base URLs for each environment

### Docker Build Integration

The Dockerfile automatically includes sitemap generation:

```dockerfile
# Build step in Dockerfile
RUN --mount=type=cache,target=/root/.cache \
    npm run build
```

Since `npm run build` now includes sitemap generation (`vite build && npm run generate-sitemap`), the Docker build process automatically:

1. **Builds the application** using Vite
2. **Generates sitemap.xml and robots.txt** with correct production URLs
3. **Includes SEO files in final image** - both files are copied to the runtime container
4. **Serves with optimized headers** - `serve.config.json` includes specific headers for SEO files:
   - `sitemap.xml`: 1-hour cache with XML content-type
   - `robots.txt`: 24-hour cache with plain text content-type

### Build Arguments and Environment

The Docker build supports environment variables for dynamic configuration:

```bash
# Example Docker build with environment variables
docker build \
  --build-arg VITE_STRAPI_URL=https://strapi.cleancraftapp.com \
  --build-arg VITE_STRAPI_API_TOKEN=your-token \
  --build-arg VITE_PUBLIC_BUILDER_KEY=your-key \
  -t cleancraft-website .
```

These environment variables are available during the sitemap generation process and can be used for:
- Dynamic content fetching from Strapi
- Environment-specific URL generation
- API token configuration for CMS integration

### Verification

To verify sitemap generation in Docker builds:

```bash
# Check if files exist in built image
docker run --rm cleancraft-website ls -la dist/ | grep -E "(sitemap|robots)"

# Test URLs are accessible
docker run -p 3000:3000 cleancraft-website &
curl -I http://localhost:3000/sitemap.xml
curl -I http://localhost:3000/robots.txt
```

Expected responses:
- `sitemap.xml`: `200 OK` with `Content-Type: application/xml`
- `robots.txt`: `200 OK` with `Content-Type: text/plain` 