# use node base image
FROM node:23.1.0

# set the working directory
WORKDIR /usr/src/app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# copy the dockdash API application code
COPY . .

# expose the port the API runs on
EXPOSE 4000

# set node options for disabling SSL warning
ENV NODE_OPTIONS=--openssl-legacy-provider

# start the dockdash API server
CMD ["node", "server.js"]
