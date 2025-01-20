# Use official Node.js 20 image as base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN yarn build

# Use nginx to serve the built app
FROM nginx:alpine

# Copy the build output from the build stage to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]