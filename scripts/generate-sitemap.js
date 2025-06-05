
import { generateSitemapFiles } from '../src/utils/sitemap-generator.js';

// Set production environment for proper URL generation
process.env.NODE_ENV = 'production';
process.env.VITE_ENVIRONMENT = 'production';

console.log('🚀 Generating production sitemap and robots.txt...');
generateSitemapFiles();
