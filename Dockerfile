FROM node:25-alpine@sha256:fd164609b5ab0c6d49bac138ae06c347e72261ec6ae1de32b6aa9f5ee2271110

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
