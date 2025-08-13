# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 8080 (matching the user's requirement)
EXPOSE 8080

# Start the application using Vite preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]