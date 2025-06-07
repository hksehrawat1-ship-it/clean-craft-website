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

# 4. Generate sitemap and robots.txt for production
RUN npm run build
RUN npm run generate-sitemap

# 6. Clean up unnecessary files
RUN rm -rf node_modules src scripts

# ────────── Runtime Stage ──────────
FROM node:18-alpine AS runner

# 1. Install the 'serve' CLI
RUN npm install -g serve@14

# 2. Create an unprivileged user (optional but recommended)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 3. Set working dir
WORKDIR /app

# 4. Copy built assets and your serve.config.json (with headers)
COPY --from=builder /app/dist ./dist
COPY serve.config.json ./

# 5. Switch to non-root user
USER appuser

# 6. Expose the port (must match your App Runner start command)
EXPOSE 3000

CMD ["serve", "--config", "/app/serve.config.json", "-s", "dist"]
