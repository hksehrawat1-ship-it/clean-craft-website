
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { componentTagger } from "lovable-tagger";
import yaml from "@rollup/plugin-yaml";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["s3jdsg2tcp.us-east-1.awsapprunner.com"],
  },

  plugins: [
    react(),

    legacy({
     
      targets: ["defaults", "last 3 iOS versions", "Safari >= 12"],
      modernPolyfills: true,
    }),

    yaml({ include: ["**/*.yaml"] }),

    ...(mode === "production"
      ? [removeConsole({ external: ["error", "warn"] })]
      : []),

    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  define: {
    "process.env": {},
    process: { env: {} },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: true,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog"],
          utils: ["clsx", "tailwind-merge", "date-fns"],
          query: ["@tanstack/react-query"],
          forms: ["react-hook-form", "@hookform/resolvers"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },

    chunkSizeWarningLimit: 800,
    sourcemap: false,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "react-helmet-async",
      "framer-motion",
      "lucide-react",
    ],
  },

  esbuild: {
    drop: mode === "production" ? ["debugger"] : [],
    keepNames: true,
  },
}));
