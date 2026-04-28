FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4

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
