#!/bin/bash
# replace instances of ${domainName} with ENV variable of Domain Name

source .env

if [[ -z "$IS_BASE" ]]; then
  echo "Changing Domain Name ..."
  sed -i '' -Ee "s/%domainName%/$PUBLIC_DOMAIN_NAME/g" wrangler.jsonc
  sed -i '' -Ee "s/x---domain-name-with-dashes---x/${PUBLIC_DOMAIN_NAME//./-}/g" wrangler.jsonc
  exit 0
else
  echo "You are trying to push the base template...Are you sure you want to do this?"
  exit 1
fi



