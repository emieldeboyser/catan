# Stage 1: Build the React app
FROM node:alpine AS build
# Set the working directory
WORKDIR /build
# Copy package.json and lock files
COPY package*.json ./
# Install dependencies
RUN yarn install
# Copy the app source code
COPY . .
# Build the React app
RUN yarn run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
# Copy the built React app to Nginx's default static directory
COPY --from=build /build/build /usr/share/nginx/html
# Expose the port on which the app runs
EXPOSE 80
# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]