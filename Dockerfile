# Use the official Node.js image as the base image
FROM node:16-alpine

RUN apk add --no-cache curl jq

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port on which the Express server will be running
EXPOSE 3000

# Define the command to start the application (transpiled JavaScript)
CMD ["npm", "start"]

# HEALTHCHECK command to call the health endpoint with curl
HEALTHCHECK --interval=5s --timeout=5s \
 CMD curl --silent --fail http://localhost:3000/health | jq --exit-status '.status == "UP"' || exit 1
