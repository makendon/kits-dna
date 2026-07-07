FROM node:26-alpine@sha256:725aeba2364a9b16beae49e180d83bd597dbd0b15c47f1f28875c290bfd255b9

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the site
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve@14.2.5

# Expose port
EXPOSE 8080

# Serve the built site
CMD ["serve", "dist", "-p", "8080"]
