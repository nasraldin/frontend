# Base image
FROM node:lts-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
# Update and install required packages in one layer
RUN apk update && apk upgrade && \
  apk add --no-cache libc6-compat ca-certificates dumb-init && update-ca-certificates && \
  npm install -g npm && npm i -g pnpm && rm -rf /root/.npm && rm -rf /var/lib/apt/lists/*

# Install dependencies only when needed
FROM base AS dependencies
ENV NODE_ENV=production
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .husky/install.mjs ./.husky/install.mjs
RUN pnpm install

# Rebuild the source code only when needed
FROM base AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

# Production image
FROM base AS runner
ENV NODE_ENV=production
# Create a non-root user and group for security
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S -G nodejs -s /bin/false nodejs
WORKDIR /app
# Copy production build files with proper ownership
COPY --from=builder --chown=nodejs:nodejs /app/.vinxi ./.vinxi
COPY --from=builder --chown=nodejs:nodejs /app/.output ./.output
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nodejs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder --chown=nodejs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

ENV PATH=/app/node_modules/.bin:$PATH

USER nodejs
EXPOSE 3000
# Use dumb-init as PID 1 for proper signal forwarding
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]
HEALTHCHECK --interval=30s --timeout=30s --retries=3 \
  CMD wget --spider --quiet http://localhost:3000/api/healthy || exit 1
