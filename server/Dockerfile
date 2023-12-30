FROM node:20-alpine AS base
# Set the working directory to /app
WORKDIR /app

# Install Yarn
RUN npm install -g yarn

# Copy the current directory contents into the container at /app
COPY . /.

# Install project dependencies
RUN yarn install