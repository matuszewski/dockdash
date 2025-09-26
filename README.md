# dockdash
**Dockdash** - Simple platform for managing and monitoring container infrastructure.

*Project component of master's thesis*

```text
Krzysztof Matuszewski
Computer Science, Master's degree, 2nd year, 3rd semester
AHE 2024-2025
```

## Installation
If the platform source code files are not copied from the CD attached to the written thesis, they should be downloaded from the repository on the GitHub platform. To run both applications, Node.js runtime environment version 23.1.0 is required, on which the platform was tested. Other dependencies should be installed automatically after executing the appropriate commands mentioned later.

```bash
git clone git@github.com:matuszewski/dockdash.git
  cd dockdash/
```

In case of missing SSL certificates and running the platform with HTTP protocol (by default), the following command must be executed before running, which will allow the use of the unsecured connection version.
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### Running the API server
```bash
cd dockdash/api-server/
  npm install
  npm run
```

### Running the web application
```bash
cd dockdash/web-server/
  npm install
  npm run
```

## Using the API server

Retrieving the list of Docker instances available on the API server

```bash
curl 127.0.0.1:4000/api/instances | jq
```

Retrieving the list with image data available on a specific Docker instance from the API server

```bash
curl 127.0.0.1:4000/api/<instance>/images | jq
```

Retrieving the list with container data available on a specific Docker instance from the API server

```bash
curl 127.0.0.1:4000/api/<instance>/containers | jq
```

Retrieving the list of resources available for a specific Docker instance from the API server

```bash
curl 127.0.0.1:4000/api/<instance>/resources | jq
```

**Note!** The _jq_ package is used for proper formatting of the received response and displaying it in the terminal in a user-friendly way


## Known issues
If you encounter a problem not described in the thesis or in this README.md file, you can contact krzysiekmatuszewski@outlook.com

## Dependencies

Both the api-server and web-server components use package.json files, which should properly define dependencies and not generate additional problems after running the installation command.
```bash
npm install
```
However, if manual package installation is needed, it is usually sufficient to install missing ones, for example for the web-server:
```bash
cd web-server/
  npm install @mui/material @emotion/react @emotion/styled
  npm install @mui/icons-material
  npm install react-copy-to-clipboard
  npm install recharts
  npm install <other modules>
```


## Useful Docker API commands

Retrieving data about containers available on a given Docker instance

```bash
curl -X GET http://127.0.0.1:2375/v1.41/containers/json | jq
```

Retrieving data about images available on a given Docker instance
```bash
curl -X GET http://127.0.0.1:2375/v1.41/images/json | jq
```

Retrieving information about the Docker instance

```bash
curl -X GET http://127.0.0.1:2375/v1.41/info | jq
# jq is optional (only for pretty-printing JSON formatted data)
```

**Note!** When using Docker Desktop on macOS, the following command will enable TCP connection on port 2375 to execute commands using Docker API from outside the system.

```bash
docker run -d \
  --name docker-api-proxy \
  -p 2375:2375 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  alpine/socat \
  TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock
```

When the container has been stopped, we start it normally:

```bash
docker start docker-api-proxy
```

And we can check if it worked and port 2375 is open:

```bash
curl http://localhost:2375/version
```

Example commands for running test containers

```bash
docker run -it -d --name test-alpine-2 alpine:3.21.3
docker run -it -d --name test-alpine-3 alpine:3.21.3
docker run -it -d --name test-node-2 node:current
```


## Notes

- checking availability of a single Docker instance
- checking availability of multiple Docker instances
- colorful, labeled logs divided by message types (info/debug/success/failure)
- log creation mechanism with event time - timestamp in user-friendly Polish date and time format
- log creation mechanism extendable for future development having the name of the object creating logs - currently defaulting to 'api-server'
- loading Docker instance configuration from JSON file
- saving Docker instance configuration to JSON file
- loading API server configuration from JSON file
- debug mode changeable from configuration file level
- verbosity mode changeable from configuration file level
- ability to change API server port from configuration file level
- good source code documentation with comments
- source code along with comments in English
- functions having descriptions in comments compliant with JSDoc format
- code formatted using Prettier (3 spaces were used as separator)
- timeout settings for individual actions can be set separately from configuration file level
- API compliant with REST API principles
- using Axios instead of Request package
- added ASCII art as a banner with the Dockdash platform logo in the API server
