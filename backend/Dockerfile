# Use official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Start server
CMD ["npm", "run", "dev"]