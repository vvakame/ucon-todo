#!/bin/sh -eux

cd `dirname $0`

go get -u golang.org/x/tools/cmd/goimports
# go get -u golang.org/x/tools/cmd/vet
go get -u github.com/golang/lint/golint

go get -u github.com/favclip/jwg/cmd/jwg
go get -u github.com/favclip/qbg/cmd/qbg

go get -u github.com/constabulary/gb/...
go get -u code.palmstonegames.com/gb-gae

gb vendor restore
