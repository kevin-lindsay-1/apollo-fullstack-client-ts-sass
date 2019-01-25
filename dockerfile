# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build
# Environment variables
ENV CI=true
ENV REACT_APP_API_URI=''

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info
COPY package*.json ./

# Install dependencies
RUN npm ci

# Get the rest
COPY ./ ./

# If tests pass, build
RUN npm run build

# ------
# DEPLOY
# ------

# Reset the container
FROM node:lts
# Environment variables
ENV NODE_ENV=production

# Note: env-cmd and cross-var in npm script should override this
ENV APP_LISTEN_PORT=9999

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info from previous build
COPY --from=build /usr/src/app/package*.json ./

# Install tiny webserver
RUN npm ci

# Get sources from previous build
COPY --from=build /usr/src/app/build/ ./build/

# Start the server when the container initializes
CMD npx --no-install serve -s build -l ${APP_LISTEN_PORT}
