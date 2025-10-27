# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Install bash and curl for Railway compatibility
RUN apk add --no-cache bash curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Debug: Check what's available
RUN ls -la && which node && which npm

# Verify npm is available and install dependencies
RUN node --version && \
    npm --version && \
    echo "Installing dependencies..." && \
    npm ci --include=dev && \
    npm cache clean --force

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy application code
COPY . .

# Make start script executable
RUN chmod +x start.sh

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["./start.sh"]