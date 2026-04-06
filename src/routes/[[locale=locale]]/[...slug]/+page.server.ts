import { defaultLocale, site, supportedLocales } from "@/config";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

import type { Page, Tenant } from "@payload-types";
import type { EntryGenerator } from './$types';
import { building } from "$app/environment";

export const load: PageServerLoad = async (args) => {
  const { platform, params, fetch } = args

  const locale = params.locale ?? defaultLocale
  const slug = params.slug

  const data = await fetch(`${site.CMS}/api/pages?&depth=2&locale=${locale}&where[tenant-domain][equals]=${site.domainName}&where[slug][equals]=${slug}`,
    {
      headers: {
        "Cache-Control": building ? 'private, no-store, max-age=0, s-maxage=0, must-revalidate' : ''
      }
    })
    .then((res: any) => res.json())
    .then((json: any) => json.docs[0])
    .catch((err: any) => error(404, { message: err }))

  return {
    pages: [data]
  }
}

export const entries: EntryGenerator = async () => {

  const url = `${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}`
  console.log({ url })
  return await fetch(url)
    .then(data => data.json())
    .then((json: any) => {
      const paths = Object.entries({ ...supportedLocales, "": "include_missing_locale" })
        .reduce((acc, [key, _]) => {
          json.docs[0].pages.docs.forEach((page: Page) => {
            acc.push({ locale: key, slug: page.slug })
          })
          return acc
        }, [])
      console.log({ paths })
      return paths
    })
};
export const prerender = true;

