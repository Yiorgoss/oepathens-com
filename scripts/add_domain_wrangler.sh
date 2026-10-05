#!/bin/bash
# replace instances of ${domainName} with ENV variable of Domain Name
# Portable across GNU/Linux and macOS: plain `sed` to a temp file, no in-place flag.

source .env

if [[ -z "$IS_BASE" ]]; then
  echo "Changing Domain Name ..."
  DOMAIN_SLUG="$(printf '%s' "$PUBLIC_DOMAIN_NAME" | tr '.' '-')"
  sed -E "s/%domainName%/$PUBLIC_DOMAIN_NAME/g" wrangler.jsonc > wrangler.jsonc.tmp && mv wrangler.jsonc.tmp wrangler.jsonc
  sed -E "s/x---domain-name-with-dashes---x/$DOMAIN_SLUG/g" wrangler.jsonc > wrangler.jsonc.tmp && mv wrangler.jsonc.tmp wrangler.jsonc
  exit 0
else
  echo "You are trying to push the base template...Are you sure you want to do this?"
  exit 1
fi



