# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 100000 && \
    npm ci --network-timeout=600000 && \
    npm install \
    @clerk/nextjs@^4.31.6 \
    @clerk/themes@^2.1.4 \
    @heroicons/react@^2.0.18 \
    @hookform/resolvers@^3.1.1 \
    @radix-ui/colors@^3.0.0 \
    @radix-ui/react-accordion@^1.1.2 \
    @radix-ui/react-alert-dialog@^1.0.4 \
    @radix-ui/react-avatar@^1.1.1 \
    @radix-ui/react-dialog@^1.0.4 \
    @radix-ui/react-dropdown-menu@^2.0.5 \
    @radix-ui/react-label@^2.1.0 \
    @radix-ui/react-scroll-area@^1.2.1 \
    @radix-ui/react-select@^2.1.2 \
    @radix-ui/react-toast@^1.2.2 \
    @supabase/supabase-js@^2.46.1 \
    @swc/cli@^0.1.65 \
    @swc/core@^1.3.105 \
    @tailwindcss/forms@^0.5.7 \
    @types/date-fns@^2.5.3 \
    @types/node@^20.11.5 \
    @types/react@^18.2.48 \
    @types/react-dom@^18.2.18 \
    date-fns@^4.1.0 \
    framer-motion@^11.11.17 \
    lucide-react@^0.309.0 \
    next@14.1.0 \
    openai@^4.73.0 \
    react@^18.2.0 \
    react-dom@^18.2.0 \
    react-hot-toast@^2.4.1 \
    recharts@^2.13.3 \
    tailwind-merge@^2.5.5 \
    tailwindcss-radix@^3.0.5 \
    tailwindcss-animate@^1.0.7 \
    autoprefixer@^10.4.17 \
    class-variance-authority@^0.7.0 \
    postcss@^8.4.33 \
    sonner@^1.7.0 \
    svix@^1.41.0 \
    tailwindcss@^3.4.1 \
    typescript@^5.3.3 \
    zod@^3.23.8

# Copy source code
COPY . .

# Create public directory if it doesn't exist
RUN mkdir -p public

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create public directory
RUN mkdir -p public

# Copy built assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set host and port
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
