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
    // ─── ADD THIS ───────────────────────────────────────────
    allowedHosts: [
      "*.awsapprunner.com"
    ],
    // ─────────────────────────────────────────────────────────
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
    // Add process.env if it's used
    'process.env': {},
    // Handle just 'process' if it's accessed directly
    'process': {
      env: {},
    },
  },
}));
