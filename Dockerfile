# --- Build Stage ---
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package configuration and dependency lock files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile for deterministic builds
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the application files
COPY . .

# Build the production bundle
RUN pnpm run build

# --- Production Stage ---
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
