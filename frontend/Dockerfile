# --------------------------------------------
# 1. Build Stage
# --------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Build the frontend (Vite outputs to /app/dist by default)
RUN npm run build

# --------------------------------------------
# 2. Production Stage with Nginx
# --------------------------------------------
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, create if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
