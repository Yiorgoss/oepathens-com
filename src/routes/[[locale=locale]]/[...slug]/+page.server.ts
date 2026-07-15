import { defaultLocale, site, supportedLocales } from "@/config";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

import type { Page, } from "@payload-types";
import type { EntryGenerator } from './$types';
import { dev } from "$app/environment";


export const load: PageServerLoad = async (args) => {
  const { params, fetch } = args


  const locale = params.locale ?? defaultLocale
  const slug = params.slug

  const url = `${site.CMS}/api/pages?&depth=2&locale=${locale}&where[tenant-domain][equals]=${site.domainName}&where[slug][equals]=${slug}`
  if (dev) console.log({ url })

  const data = await fetch(url,
    {
      // headers: {
      //   "Cache-Control": building ? 'private, no-store, max-age=0, s-maxage=0, must-revalidate' : ''
      // }
    })
    .then((res: any) => res.json())
    .then((json: any) => json.docs[0])
    .catch((err: any) => error(404, { message: err }))

  return {
    pages: [data]
  }
}

export const entries: EntryGenerator = async () => {

  // const redirectURL = `${site.CMS}/api/redirects?where[tenant.domain][equals]=${site.domainName}`

  // const { docs }: { docs: Redirect[] } = await fetch(redirectURL)
  //   .then((data) => data.json())
  //   .then((json) => { console.log({ json }); return json })

  // const redirects = docs.map(({ from, to }) => {
  //   if (to.type == 'reference') {
  //     return { locale: "", slug: `${from}?redirect_to=${to.reference.value.slug ?? '/'}` }
  //   }
  //   return { locale: "", slug: `${from}?redirect_to=${to.url ?? '/'}` }
  // })

  // console.log({ redirects })
  console.log("===========================================")
  const url = `${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}&joins[pages][limit]=0`
  console.log({ url })

  const pages = await fetch(url)
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
  return pages
};
export const prerender = true;

