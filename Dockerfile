# ─────────── Build Stage ───────────
FROM node:18-alpine AS builder

# 1. Set working dir
WORKDIR /app

# 2. Copy package manifests & install deps
COPY package*.json ./
RUN npm install

# 3. Copy source & build
COPY . .
ENV NODE_ENV=production
# Build target supports modern browsers including mobile
ENV VITE_BUILD_TARGET=modern

# 4. Generate sitemap and robots.txt for production
RUN npm run build
RUN npm run generate-sitemap

# 5. Verify the build
RUN echo "Verifying build files..." && \
    ls -la dist && \
    echo "Checking for main JavaScript bundle..." && \
    find dist -name "*.js" -type f

# 6. Clean up unnecessary files
RUN rm -rf node_modules src scripts

# ────────── Runtime Stage ──────────
FROM node:18-alpine AS runner

# 1. Install the 'serve' CLI with specific version for stability
RUN npm install -g serve@14.2.1

# 2. Create an unprivileged user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 3. Set working dir
WORKDIR /app

# 4. Copy built assets and config
COPY --from=builder /app/dist ./dist
COPY serve.config.json ./

# 5. Switch to non-root user
USER appuser

# 6. Expose the port
EXPOSE 3000

# 7. Set NODE_ENV for serve
ENV NODE_ENV=production

# 8. Use serve with specific configuration
CMD ["serve", "--config", "/app/serve.config.json", "-s", "dist", "--listen", "3000"]
