#!/bin/sh -eux

# install or fetch dependencies
# gcloud components install --quiet app-engine-go
go get -u github.com/golang/dep/cmd/dep
dep ensure

# build tools
rm -rf build-cmd/
mkdir build-cmd
go build -o build-cmd/goimports   ./vendor/golang.org/x/tools/cmd/goimports
go build -o build-cmd/golint      ./vendor/golang.org/x/lint/golint
go build -o build-cmd/gosimple    ./vendor/honnef.co/go/tools/cmd/gosimple
go build -o build-cmd/staticcheck ./vendor/honnef.co/go/tools/cmd/staticcheck
go build -o build-cmd/unused      ./vendor/honnef.co/go/tools/cmd/unused
go build -o build-cmd/jwg         ./vendor/github.com/favclip/jwg/cmd/jwg
go build -o build-cmd/qbg         ./vendor/github.com/favclip/qbg/cmd/qbg
