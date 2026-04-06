#!/bin/sh
set -eu
DOMAIN="${DOMAIN:?set DOMAIN in .env}"
export DOMAIN

if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  envsubst '${DOMAIN}' < /templates/https.conf.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${DOMAIN}' < /templates/http.conf.template > /etc/nginx/conf.d/default.conf
fi

crond
exec nginx -g 'daemon off;'
