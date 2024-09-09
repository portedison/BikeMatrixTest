# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
