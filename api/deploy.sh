#!/bin/sh -eux

cd `dirname $0`
rm -rf public/
cp -r ../front/dist public/

APPLICATION=ucon-todo
if [ -n "${CIRCLE_SHA1:""}" ]; then
    VERSION=`TZ=JST-9 date '+%Y-%m-%d-%H%M'`-`echo $CIRCLE_SHA1 | cut -c 1-6`
else
    VERSION=`TZ=JST-9 date '+%Y-%m-%d-%H%M'`-manual
fi


set +x

echo $GCLOUD_KEY | base64 --decode > service_account.json

gcloud auth activate-service-account appengine-deployer@${APPLICATION}.iam.gserviceaccount.com --key-file ./service_account.json

appcfg.py update \
  --oauth2_access_token $(gcloud auth print-access-token 2> /dev/null) \
  --application=$APPLICATION \
  --version=$VERSION \
  ./
