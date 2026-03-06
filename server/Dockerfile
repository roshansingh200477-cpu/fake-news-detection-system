 # Use official Node image
FROM node:20-alpine

# Create app directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --omit=dev

# Copy all source code
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "src/server.js"]

ENV NODE_ENV=production