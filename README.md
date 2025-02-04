# dockdash



## Components

### dockdash-api-server

### dockdash-web-server
Single-site HTML 5 website serving dozen of Docker instances, containers and images data monitoring GUI made with Bootstrap5

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
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

**Note!** *jq* is used here only for JSON formatting in the console

## Troubleshooting
In case of any problems not described or linked in this readme please contact project author: krzysiekmatuszewski@outlook.com



## Notes

- when to use let/const/var
  
**Functionalities / Features**

- checking single instance availabilty
- checking multi instance availabilty
- debug/verbose mode
- colored and labeled API server logging divied to types of messages (info/debug/success/failure) + left place for future improvements as it contains as well logging entity name, currently set to'api-server'
- loading instances configuration from JSON file
- saving instances configuration in JSON file
- loading api-server configuration from JSON file
- whole code in english language
- whole code with many comments
- whole code formatted using Prettier (3 spaces as separator + all default and most up to date coding rules applied)
- timeouts settings picked individualy for each docker api action to take, taken from settings JSON config file
- API created in REST type
- using Axios as a new, secure and better alternative to popular Request module using in REST API

## TODO
- [ ] make it work with Docker instance hosted on macOS
- [ ] split the api-server to many files, OOP or single scope of responsibilty per file
- [ ] add prettierrc and format all