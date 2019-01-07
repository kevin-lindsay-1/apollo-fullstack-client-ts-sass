# FIXME: this probably doesn't work properly since changes

# specify the node base image with your desired version node:<version>
FROM node:10

# replace this with your application's default port
EXPOSE 3000

# specifies the working directory for the container
WORKDIR /usr/src/app

# copy environment variables
COPY .env ./

# grabs package and package lock files for installation
COPY package*.json ./

# installs prod dependencies
RUN npm install --only-production

# copies the built files into the source directory
COPY ./dist ./dist

CMD [ "npm", "start" ]
