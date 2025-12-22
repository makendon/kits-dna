FROM node:25-alpine@sha256:f4769ca6eeb6ebbd15eb9c8233afed856e437b75f486f7fccaa81d7c8ad56007

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
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Serve the built site
CMD ["serve", "dist", "-p", "8080"]
