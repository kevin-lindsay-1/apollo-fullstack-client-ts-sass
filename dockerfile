# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build

# Set the working directory
WORKDIR /usr/src/app

# Get files
COPY . .

# Install all dependencies
RUN npm i

# Run tests
#RUN npm test -- --coverage

# If tests pass, build
RUN npm run build

# ------
# DEPLOY
# ------

# If build succeeds, grab the output files
# Reset the container
FROM node:lts
#
# Define production environment variables
ENV port=3000

# Set the working directory
WORKDIR /usr/src/app

# Install production dependencies
RUN npm i -g serve env-cmd

# Get sources from previous build
COPY --from=build /usr/src/app/.env .
COPY --from=build /usr/src/app/build .

# Inform container runner which port to use
EXPOSE $port

# Start the server when the container initializes
CMD env-cmd .env serve -s build -l ${port}
