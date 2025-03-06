# dockdash

## Components

### dockdash-api-server

### dockdash-web-server

Single-site HTML 5 website serving dozen of Docker instances, containers and images data monitoring GUI made with Bootstrap5

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
pm install react-tooltip
```

```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

## Configuration

Currently, the whole project is designed to run out-of-the-box without any need of configuration by default.

## Running

```bash
cd api-server/
npm run
```

## Using

### API server

Getting list of Docker instances available in the API configuration

```bash
curl 127.0.0.1:4000/api/instances | jq
```

Getting list of images on a given docker instance

```bash
curl 127.0.0.1:4000/api/<instance>/images | jq
```

Getting list of containers on a given docker instance

```bash
curl 127.0.0.1:4000/api/<instance>/containers | jq
```

**Note!** _jq_ is used here only for JSON formatting in the console

## Troubleshooting

In case of any problems not described or linked in this readme please contact project author: krzysiekmatuszewski@outlook.com

## Notes

- when to use let/const/var

**Functionalities / Features**

- checking single instance availabilty
- checking multi instance availabilty
- colored and labeled API server logging divied to types of messages (info/debug/success/failure)
- logging with timestamp in 24h time format and friendly PL date format
- logging with place for future improvements as it contains as well logging entity name, currently set to 'api-server'
- loading instances configuration from JSON file
- saving instances configuration in JSON file
- loading api-server configuration from JSON file
- debug mode, and being able to change it from the config file
- verbosity mode, and being able to change it from the config file
- whole code in english language
- whole code with many comments
- functions commented in JSDoc format
- whole code formatted using Prettier (3 spaces as separator + all default and most up to date coding rules applied)
- timeouts settings picked individualy for each docker api action to take, taken from settings JSON config file
- API created in REST type
- using Axios as a new, secure and better alternative to popular Request module using in REST API
- printing ASCII art banner with dockdash logo

## TODO

- [x] make it work with Docker instance hosted on macOS
- [ ] split the api-server to many files, OOP or single scope of responsibilty per file
- [ ] add .prettierrc config files and format all files in web-server/ and api-server/
- [ ] update readme

## Dependencies

### web-server

Installing web-server dependencies manually (for troubleshooting mainly)

```bash
cd web-server/
npm install react-copy-to-clipboard
npm install recharts
```

### api-server

Installing api-server dependencies manually (for troubleshooting mainly)

```bash
cd api-server/
# TODO: add manual dependencies installation commands
```

## Docker API commands

Geting containers details

```bash
curl -X GET http://127.0.0.1:2375/v1.41/containers/json | jq
```

Geting images details

```bash
curl -X GET http://127.0.0.1:2375/v1.41/images/json | jq
```

Getting information about docker instance

```bash
curl -X GET http://127.0.0.1:2375/v1.41/info | jq
# jq is optional (only for pretty-printing JSON formatted data)
```

In case of using docker on macos, enabling connection on port 2375 (as Docker Desktop on macOs runs inside a VM)

```bash
docker run -d \
  --name docker-api-proxy \
  -p 2375:2375 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  alpine/socat \
  TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock
```

If stopped then run by:

```bash
docker start docker-api-proxy
```

And checking if it works fine

```bash
curl http://localhost:2375/version
```

Running test containers

```bash
docker run -it -d --name test-alpine-2 alpine:3.21.3
docker run -it -d --name test-alpine-3 alpine:3.21.3
docker run -it -d --name test-node-2 node:current
```
