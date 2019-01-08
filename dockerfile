# Arguments/varibles to be used later
ARG port=5000

# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build

# Set the working directory
WORKDIR /usr/src/app

# Get package information
COPY package*.json ./

# Install all dependencies
RUN npm i

# Get rest of files
COPY . ./

# Run tests
RUN npm run test

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

# Get sources from previous build
COPY --from=build /usr/src/app/build ./

# Install serve
RUN npm i serve

EXPOSE $port

CMD [ "serve", "-s", "build" ]
