########################  Build stage  ########################
# Use the full (glibc) image instead of alpine during build—
# it avoids random "out of memory" crashes from musl + esbuild
# and is only an intermediate layer.
FROM --platform=$BUILDPLATFORM node:20-bookworm-slim AS builder

# 1️⃣ Cache folder for npm / esbuild between layers
RUN --mount=type=cache,target=/root/.cache mkdir -p /root/.cache

# 2️⃣ Project files & deps
WORKDIR /app
COPY package*.json ./

# Prefer deterministic, CI-friendly installs
RUN --mount=type=cache,target=/root/.cache \
    npm ci --legacy-peer-deps

# 3️⃣ Copy the rest of the source
COPY . .

########################  Build & optimise  ########################
# Give Node a 4 GB heap so Vite/ESBuild won't crash.
# Make sure Docker Desktop (or your CI runner) actually has ≥4 GB RAM.

# Declare build arguments that can be passed with --build-arg
ARG VITE_STRAPI_URL
ARG VITE_STRAPI_API_TOKEN
ARG VITE_PUBLIC_BUILDER_KEY

ENV NODE_ENV=production \
    VITE_BUILD_TARGET=modern \
    NODE_OPTIONS=--max-old-space-size=4096 \
    # Set VITE variables from the build arguments
    VITE_STRAPI_URL=$VITE_STRAPI_URL \
    VITE_PUBLIC_BUILDER_KEY=$VITE_PUBLIC_BUILDER_KEY
# Conditionally set the token only if it's provided
ENV VITE_STRAPI_API_TOKEN=$VITE_STRAPI_API_TOKEN

# Disable source-maps in prod to shrink memory & artefacts
ENV VITE_SOURCEMAP=false

# Build + sitemap, re-using the cache mount
RUN --mount=type=cache,target=/root/.cache \
    npm run build:docker

# Remove everything we no longer need in the final artefact
RUN rm -rf node_modules src scripts

########################  Runtime stage  ########################
FROM node:20-alpine AS runner

# 1. Minimal static file server
RUN npm install -g serve@14.2.4

# 2. Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 3. Copy built assets
WORKDIR /app
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/serve.config.json ./serve.config.json

# 4. Permissions & environment
RUN chown -R appuser:appgroup /app
USER appuser
ENV NODE_ENV=production

EXPOSE 3000
CMD ["serve", "--config", "/app/serve.config.json", "-s", "dist"]
