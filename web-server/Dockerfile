# use node base image
FROM node:23.1.0 AS build

# set the working directory
WORKDIR /usr/src/app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# copy the dockdash web server code
COPY . .

# build the dockdash web server
RUN npm run build

# use node base image to serve the built app
FROM node:23.1.0

# set the working directory
WORKDIR /usr/src/app

# set node options for disabling SSL warning
ENV NODE_OPTIONS=--openssl-legacy-provider

# copy the built application from the build stage
COPY --from=build /usr/src/app/build ./build

# install a lightweight HTTP server to serve the static files
RUN npm install -g serve

# expose the port the app runs on
EXPOSE 3000

# start the dockdash web server
CMD ["serve", "-s", "build", "-l", "3000"]
