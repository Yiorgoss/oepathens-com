import { PUBLIC_ENV, PUBLIC_DEV_CMS, PUBLIC_PROD_CMS, PUBLIC_DOMAIN_NAME, PUBLIC_ASSET_URL, PUBLIC_TEST_ASSET_URL } from '$env/static/public';

export const site = {
  CMS: PUBLIC_ENV == 'PROD' ? PUBLIC_PROD_CMS : PUBLIC_DEV_CMS,
  // assetsURL: PUBLIC_ENV == 'PROD' ? PUBLIC_ASSET_URL : PUBLIC_TEST_ASSET_URL,
  storage: PUBLIC_ASSET_URL,
  currency: '&euro;',
  domainName: PUBLIC_DOMAIN_NAME
};
export type SiteConfigType = typeof site

export const defaultLocale = "en"
export const supportedLocales = {
  'en': "English",
  // 'el': "Ελληνικά",
} as { [key: string]: string }

export type SupportedLocalesType = typeof supportedLocales
export type SupportedLocalesKeys = keyof typeof supportedLocales

