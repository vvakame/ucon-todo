#!/bin/sh -eux

cd `dirname $0`
cp -r ../front/public src/public

VERSION=$CIRCLE_BRANCH

go get -u github.com/k2wanko/gtoken

set +x

echo $GCLOUD_KEY | base64 --decode > service_account.json
gb gae appcfg update \
  --oauth2_access_token $(gtoken --json ./service_account.json) \
  --application=techbookfest \
  --version=$VERSION \
  src/
