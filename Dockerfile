# Use node:18-alpine as the base image
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./
RUN yarn install

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_TYPE prod
ENV NEXT_PUBLIC_API_DEV_URL http://127.0.0.1:8000
ENV NEXT_PUBLIC_API_URL https://fisimate-api-gg6y243dza-et.a.run.app

# Run the build script
RUN yarn build

# Set up the runner environment
FROM base AS runner
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a new system group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the user to nextjs
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set the PORT environment variable
ENV PORT 3000

# Start the application
CMD ["yarn", "start"]
