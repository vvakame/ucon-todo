#!/bin/sh -eux

cd `dirname $0`

GOPATH=$(pwd)/vendor:$GOPATH

cd ./src/

goimports -w .
gb generate ./...
go tool vet .
golint ./...

gb gae test ./... $@
