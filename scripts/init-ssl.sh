#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if [ ! -f .env ]; then
  echo "Создайте .env из .env.example" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
. ./.env
set +a
: "${DOMAIN:?DOMAIN в .env}"
: "${CERTBOT_EMAIL:?CERTBOT_EMAIL в .env}"

docker compose --profile cli run --rm --no-deps certbot-cli certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d "$DOMAIN" \
  --email "$CERTBOT_EMAIL" \
  --agree-tos \
  --no-eff-email \
  --non-interactive

docker compose restart nginx
