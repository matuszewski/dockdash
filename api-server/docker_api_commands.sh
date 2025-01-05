#!/bin/bash

# get containers details
curl -X GET http://127.0.0.1:2375/v1.41/containers/json | jq

# get images details
curl -X GET http://127.0.0.1:2375/v1.41/images/json | jq

# get information about docker instance
curl -X GET http://127.0.0.1:2375/v1.41/info | jq

# jq is optional (only for pretty-printing JSON formatted data)
