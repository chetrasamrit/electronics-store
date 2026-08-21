# Stage 1 — deps
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2 — build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3 — production
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nuxtjs

COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output

USER nuxtjs

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
