#!/bin/bash

# direct docker commands:

# get containers details
curl -X GET http://127.0.0.1:2375/v1.41/containers/json | jq

# get images details
curl -X GET http://127.0.0.1:2375/v1.41/images/json | jq

# get information about docker instance
curl -X GET http://127.0.0.1:2375/v1.41/info | jq

# jq is optional (only for pretty-printing JSON formatted data)


# in case of using docker on macos, enabling connection on port 2375 (as Docker Desktop on macOs runs inside a VM)
docker run -d \                        
  --name docker-api-proxy \
  -p 2375:2375 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  alpine/socat \
  TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock
# and checking if it works fine
curl http://localhost:2375/version
