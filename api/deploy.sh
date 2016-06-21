#!/bin/sh -eux

cd `dirname $0`
cp -r ../front/dist/ src/

VERSION=`TZ=JST-9 date '+%Y-%m-%d-%H%M'`-`echo $CIRCLE_SHA1 | cut -c 1-6`

go get -u github.com/k2wanko/gtoken

set +x

echo $GCLOUD_KEY | base64 --decode > service_account.json
gb gae appcfg update \
  --oauth2_access_token $(gtoken --json ./service_account.json) \
  --application=ucon-todo \
  --version=$VERSION \
  src/
gb gae appcfg migrate_traffic \
  --oauth2_access_token $(gtoken --json ./service_account.json) \
  --application=ucon-todo \
  --version=$VERSION \
  src/
