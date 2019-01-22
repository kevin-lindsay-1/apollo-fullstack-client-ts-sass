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
RUN npm test -- --coverage

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

# Install production dependencies
RUN npm i --only-production

# Inform container runner which port to use
EXPOSE $port

# Start the server when the container initializes
CMD [ "serve", "-s", "build" ]
