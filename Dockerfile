# Multi-stage build for React + Vite Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definition
COPY frontend/package*.json ./

# Install packages
RUN npm install

# Copy source code
COPY frontend/ ./

# Build the project
RUN npm run build

# Production server stage with Nginx
FROM nginx:alpine

# Copy SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
