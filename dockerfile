# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build
# Environment Varibles
ENV NODE_ENV=production
ENV CI=true

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info
COPY package*.json ./

# Install dependencies
RUN npm ci

# Get the rest
COPY ./ ./

# Run tests
RUN npm test

# If tests pass, build
RUN npm run build

# ------
# DEPLOY
# ------

# If build succeeds, grab the output files
# Reset the container
FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Install tiny webserver
RUN npm i -g serve

# Get sources from previous build
COPY --from=build /usr/src/app/build/ ./build/

# Start the server when the container initializes
CMD ["serve", "-s", "build"]
