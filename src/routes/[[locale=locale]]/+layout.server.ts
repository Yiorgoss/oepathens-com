import { dev } from '$app/environment';
import { PUBLIC_ENV } from '$env/static/public';
import type { LayoutServerLoad } from './$types';
import { site, defaultLocale } from '@/config';

import type { Tenant } from '@payload-types';
import { error } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (args) => {
  if (dev) console.log(`ENV=${PUBLIC_ENV}`)

  const { params, fetch } = args

  const locale = params.locale ?? defaultLocale
  const layoutUrl = `${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}&select[id]=true&select[nav]=true&depth=1&locale=${locale}`
  if (dev) console.log({ layoutUrl })

  const response = await fetch(layoutUrl)
    .then((res: any) => res.json())
    .then((json: any) => json?.docs[0])
    .catch((err: any) => error(404, { message: "Page Not Found" }))

  return {
    nav: response.nav as Tenant['nav'],
    id: response.id as number
  }
};

