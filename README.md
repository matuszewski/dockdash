# dockdash



## Components

### dockdash-api-server

### dockdash-web-server
Single-site HTML 5 website serving dozen of Docker instances, containers and images data monitoring GUI made with Bootstrap5

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

**Note!** *jq* is used here only for JSON formatting in the console

## Troubleshooting
In case of any problems not described or linked in this readme please contact project author: krzysiekmatuszewski@outlook.com