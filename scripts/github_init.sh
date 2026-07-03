#!/bin/bash

source .env

if [[ -z $CLOUDFLARE_API_TOKEN || -z $CLOUDFLARE_ACCOUNT_ID ]]; then 
  echo "API token or account ID unset"
  exit 1
fi

REPO="yiorgoss/${PUBLIC_DOMAIN_NAME//./-}"

git remote add upstream "https://github.com/yiorgoss/base-calisto.git"
git remote remove origin "https://github.com/yiorgoss/$REPO.git"
git remote add origin "https://github.com/yiorgoss/$REPO.git"

echo $REPO

gh secret set CLOUDFLARE_API_TOKEN --body "$CLOUDFLARE_API_TOKEN" -R "$REPO"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "$CLOUDFLARE_ACCOUNT_ID" -R "$REPO"


gh variable set PUBLIC_ENV --body "$PUBLIC_ENV" -R "$REPO"
gh variable set PUBLIC_DOMAIN_NAME --body "$PUBLIC_DOMAIN_NAME" -R "$REPO"
gh variable set PUBLIC_DEV_CMS --body "$PUBLIC_DEV_CMS" -R "$REPO"
gh variable set PUBLIC_PROD_CMS --body "$PUBLIC_PROD_CMS" -R "$REPO"
gh variable set PUBLIC_TEST_ASSET_URL --body "$PUBLIC_TEST_ASSET_URL" -R "$REPO"
gh variable set PUBLIC_ASSET_URL --body "$PUBLIC_ASSET_URL" -R "$REPO"
