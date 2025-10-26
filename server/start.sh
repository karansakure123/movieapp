#!/bin/bash
# Railway deployment script
echo "Starting Railway deployment..."

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start the application
npm start