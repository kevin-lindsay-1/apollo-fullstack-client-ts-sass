# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build
ARG REACT_APP_API_URI

# Environment variables
ENV CI=true

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info
COPY package*.json ./

# Install dependencies
RUN npm ci

# Get the rest
COPY ./ ./

# Lint files
RUN npm run lint

# Test files
RUN npm test

# If tests pass, build
RUN REACT_APP_API_URI=${REACT_APP_API_URI} npm run build

# ------
# DEPLOY
# ------

# Reset the container
FROM node:lts
# Environment variables
ENV NODE_ENV=production
ENV APP_LISTEN_PORT=9999

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info from previous build
COPY --from=build /usr/src/app/package*.json ./

# Install tiny webserver
RUN npm ci

# Get sources from previous build
COPY --from=build /usr/src/app/build/ ./build/

RUN ls -a

# Start the server when the container initializes
CMD npx --no-install serve -s build -l ${APP_LISTEN_PORT}
