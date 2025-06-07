
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import yaml from '@rollup/plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "s3jdsg2tcp.us-east-1.awsapprunner.com"
    ],
  },
  plugins: [
    react(),
    yaml(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {},
    'process': {
      env: {},
    },
  },
  build: {
    // iPhone compatibility - changed from 'esnext' to 'es2015'
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
          'utils': ['clsx', 'tailwind-merge', 'date-fns'],
          'query': ['@tanstack/react-query'],
          'forms': ['react-hook-form', '@hookform/resolvers'],
        },
        // Optimize chunk names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging
    sourcemap: false,
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev startup
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'react-helmet-async',
      'framer-motion',
      'lucide-react'
    ],
  },
  // Performance monitoring
  esbuild: {
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
