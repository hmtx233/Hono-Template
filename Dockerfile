# Use the latest Node image as the build environment
FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat

# Set the working directory for the build process
WORKDIR /app

# Copy the necessary files for dependency installation and build
COPY package*.json tsconfig.json ./
COPY src ./src

# Install dependencies using Bun with production flag for optimized installation
RUN npm install && \
    npm run build

# Use Node.js 20 on Alpine as the final runtime environment
FROM base AS runner

# Set the working directory for the runtime environment
WORKDIR /app

# Copy the built application files from the builder stage to the runtime stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Set environment variables for staging
ENV NODE_ENV=staging

# Expose port 3000 for the app to be accessible on this port
EXPOSE 3000

# Define the command to start the Node.js application
CMD ["node", "/app/dist/index.js"]
