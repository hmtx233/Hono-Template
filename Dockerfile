# Use the latest Bun image as the build environment
FROM oven/bun:latest as builder

# Set the working directory for the build process
WORKDIR /app

# Copy the necessary files for dependency installation and build
COPY src ./src
COPY package.json tsconfig.json bun.lockb ./

# Install dependencies using Bun with production flag for optimized installation
RUN bun install --production
RUN bun build ./src/app/node.ts \
    --outdir ./dist \
    --entry-naming "[dir]/index.[ext]" \
    --format cjs \
    --target node \
    --splitting

# Use Node.js 20 on Alpine as the final runtime environment
FROM node:20-alpine as runner

# Set the working directory for the runtime environment
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# Copy the built application files from the builder stage to the runtime stage
COPY --from=builder --chown=hono:nodejs /app/dist/index.js ./

# Expose port 3000 for the app to be accessible on this port
USER hono
EXPOSE 3000

# Define the command to start the Node.js application
CMD ["node", "/app/index.js"]
