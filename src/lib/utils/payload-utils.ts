import type { Asset, Page, Tenant, IButton, IIcon } from '@payload-types';
import { defaultLocale, site, type SiteConfigType } from '@/config';
import { error } from '@sveltejs/kit';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '.';

export function getRestPopulateFn({ apiURL, locale }: { apiURL: string, locale: string }) {
  return async ({ id, collection }: { id: number, collection: string }) => {
    return await fetch(`${apiURL}/${collection}/${id}?locale=${locale}&depth=1`).then(res => res.json())
  }
}

export async function fetchFromCMS({
  collection,
  id,
  locale = 'en'
}: {
  collection: string;
  id: number;
  locale?: string | undefined | null;
}) {
  if (!id) throw Error(`Need ID to Fetch`)
  if (!collection) throw Error(`Need Collection to Fetch`)
  const response = fetch(
    `${site.CMS}/api/${collection}?where[id][equals]=${id}&locale=${locale ?? defaultLocale}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
}

export const getTenantByDomain = async ({ site, locale }: { site: SiteConfigType, locale: string }) => {

  const response = fetch(`${site.CMS}/api/tenants?where[domain][equals]=${site.domainName}&depth=2&locale=${locale}`)
    .then((res) => res.json())
    .then((json: any) => json.docs[0]) //should only ever match one 
    .catch((err: any) => {
      error(404, {
        message: err
      });
    });

  return response as Promise<Tenant>
}

// FIX deprecated
export async function resolveID({
  collection,
  data,
  lang
}: {
  collection: string;
  data: number | any;
  lang?: string;
}) {
  if (!data) return Promise.reject("Data undefined");
  if (typeof data === 'number') {
    try {
      return fetchFromCMS({ collection, id: data, locale: lang })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          return response.json()
        })
        .then((json: any) => {
          if (!json && !json.docs && json.docs.length > 0) {
            throw new Error(`No data returned: CMS returned nothing`);
          }
          return json.docs[0]
        })
        .catch((err) => {
          throw new Error(`ERROR: ${err}`);
        })
    } catch (err) {
      console.log({ err2: err })
      return Promise.reject(`Resolving ID failed: ${err}`);
    }
  }
  return Promise.resolve(data);
}



export const richTextIcon = ({ name, style }: IIcon) =>
  `<iconify-icon
    width="${style?.width}"
    height="${style?.height}"
    style="
          width:100%;
          height:100%;
          background:${style?.background};
          color:${style?.color};
          border:${style?.border};
          border-radius:${style?.borderRadius};
          overflow:${style?.overflow};
          ${style?.string}"
    icon="${name}">
  </iconify-icon>`

// export const richTextImg = ({ image }: { image: Asset }) => {
export const richTextImg = (src: string) => {

  // if (!image || !image.sizes) {
  //   throw Error(`ERROR: sizes does not exist on image: ${image}`)
  // }
  // //@ts-ignore  if typeof  ^
  // const { sizes } = image;

  // for now just default to the smallest one
  return `<img style="object-fit:cover;
                      height:inherit;
                      width:inherit;
                      margin:0px;"
                src="${src}"
                alt=""
          />`
};

export const richTextBtn = ({ href, link }: { href: string, link: IButton }) => {

  let { display, style: linkStyle } = link || {};

  const style = linkStyle && Object.entries(linkStyle)
    .filter(([_, value]) => Boolean(value))
    .reduce((acc, [key, value]) => `${acc};${key}:${value}`, "")

  const { text, variant, size } = display || {}

  const classList = buttonVariants({ variant, size })
  return `<a class="${cn('flex px-4 gap-5 mt-2', classList)}" style="${style};" href="${href}">
      ${text ?? href.replaceAll("/", "")}
      ${link.display?.includeIcon ? `<iconify-icon icon=${link.display.icon?.name}></iconify-icon>` : ""}
    </a>`
}
