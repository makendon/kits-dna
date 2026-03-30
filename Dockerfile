FROM node:25-alpine@sha256:cf38e1f3c28ac9d81cdc0c51d8220320b3b618780e44ef96a39f76f7dbfef023

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
