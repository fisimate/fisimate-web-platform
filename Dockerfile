# Multi-stage build untuk Next.js (output: "standalone")
FROM node:22-alpine AS base

# --- Install dependencies ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables build-time (NEXT_PUBLIC_* di-inline saat build)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_TYPE=prod
ENV NEXT_PUBLIC_API_DEV_URL=http://127.0.0.1:8080
ENV NEXT_PUBLIC_API_URL=https://fisimate-api-gg6y243dza-et.a.run.app
ENV NEXT_PUBLIC_API_DEV_VERSION=v1
ENV NEXT_PUBLIC_API_VERSION=v1

RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone output sudah membundel node_modules yang diperlukan + server.js.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone server (bukan `next start`).
CMD ["node", "server.js"]
