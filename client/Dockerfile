# Use official Node.js image
to match client deployment without nginx
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Vite app for production
RUN npm run build

# Install serve to serve static assets
RUN npm install -g serve

# Expose port for the web server
EXPOSE 3000

# Start the web server serving the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
