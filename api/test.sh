#!/bin/sh -eux

cd `dirname $0`

targets=`find . -type f \( -name '*.go' -and -not -iwholename '*vendor*'  -and -not -iwholename '*node_modules*' \)`
packages=`go list ./app/...`

# Apply tools
export PATH=$(pwd)/build-cmd:$PATH
which goimports golint staticcheck gosimple unused jwg qbg
goimports -w $targets
go tool vet $targets
golint -min_confidence 0.6 -set_exit_status $packages
# staticcheck $packages
# gosimple $packages
# unused $packages
go generate $packages

# TODO Go 1.10 から -coverpkg=. 的なのがいる
goapp test $packages -p 1 -covermode=atomic -coverprofile=coverage.txt $@
