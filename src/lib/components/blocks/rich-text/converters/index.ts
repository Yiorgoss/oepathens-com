import { objToCSS } from './text-state';
import { customText } from "./text"
import { divider } from "./divider"
import { richTextImg, richTextIcon, richTextBtn } from '@/utils';
import { site } from '@/config';


export const syncConverters: any = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: customText,
})

export const htmlConverters: any = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: customText,
  blocks: {
    divider,
    lexImg: async (args: any) => {
      const fields = args.node.fields || {}
      console.log({ node: args.node })
      return `
        <div
          style="
            justify-content:${fields.style.alignX};
            align-items:${fields.style.alignY};
            width:100%;
          "
          class="w-full flex "
          >
          <div
            style="
              padding:${fields.style.padding};
              width:${fields.style.width};
              height:auto;
            class="w-full h-auto flex"
            >
            <image src="${fields.image.url}"
              width="${fields.image.width}"
              height="${fields.image.height}" />
          </div>
        </div>
        `
    },
    lexIcon: async (args: any) => {
      const fields = args.node.fields || {}
      const { name, style } = fields.icon || {}
      console.log({ fields })
      return `
        <div id="richtextIcon"
            style="
              height:${fields.style?.height};
              width:${fields.style?.width};
              padding:${fields.style?.padding};
              justify-content:${style?.alignX};
              align-items:${style?.alignY}; "
            class=''
          >
          ${richTextIcon({ name, style })}
        </div>`
    }
  },
  inlineBlocks: {
    // Each key should match your inline block's slug
    listMarkerIcon: async (args: any) => {
      const parent = args.parent
      const fields = args.node.fields || {}
      const { name, style } = fields.icon || {}

      return `<div id="replace-marker-id-${fields?.id}" class="replace-marker" style="height:${style.width}px;width:${style.width}px;display:inline;">
        ${richTextIcon({ name, style })}
      </div>`
    },
    svgText: async (args: any) => {
      const { childIndex, node, parent } = args
      const siblings = parent.children
      const { text, shouldAnimate, style, image: _image } = node.fields || {}
      const { color } = style || {}

      // const image = await resolveID({ collection: 'assets', data: _image.url }) //only url cos its svg

      let wordStyles = ""
      if (siblings.length >= 2) { //inc this
        if (childIndex - 1 >= 0) {
          //use prev node styles
          wordStyles += objToCSS(siblings[childIndex - 1])
        }
        if (!wordStyles && childIndex + 1 < siblings.length) {
          //only if styles not found
          wordStyles += objToCSS(siblings[childIndex + 1])
        }
      }

      //can expand too any svg by using api to reflect external svg
      const elem = `
      <span class="" style="display:inline-block; position:relative;">
        <span class="animate-word " style="position:absolute; top:0; left:0; right:0; bottom:0;" >
          <svg class="animate-svg" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 181 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M117.637 2.86134C55.6369 -2.63843 -18.8594 8.36133 6.63897 38.8615C41.6403 75.8615 103.472 64.9534 122.64 61.8615C138.14 59.3615 181.613 49.6723 178.64 28.8615C175.14 4.36128 107.642 6.36118 81.1424 14.3648" stroke="${color ?? "var(--foreground)"}" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="animate-word" style="${wordStyles}">${text}</span>
      </span>`
      const span = document.createElement("span")
      span.innerHTML = elem
      // const e = span.querySelectorAll("#animate-circle-object")

      // animate(e, { pathLength: [0, 1] }, { repeat: Infinity })
      return span.innerHTML
      return elem

    },
    // word class is used for rich text animations be careful with removing it
    buttonRT: async (args: any) => {
      const { link } = args.node.fields

      if (!link || !(link.reference || link.url)) return

      try {
        let href = link.url
        if (link.type == 'reference') {
          // in theory whenever value is not a number it will have a slug
          href = typeof link.reference.value == 'number'
            ? await args.populate({ id: link.reference.value, collection: link.reference.relationTo })
            : link.reference.value.slug
        }

        const buttonHTML = richTextBtn({ href, link });
        return `<span class="animate-word">${buttonHTML}</span>`
      } catch (err) {
        console.error(`Error converting buttonRT: ${err}`)
      }
    },
    pill: async (args: any) => {
      const { image, width, height, vertAlign, phone } = args.node.fields;
      const { width: phoneWidth, height: phoneHeight } = phone

      // const id = typeof image == 'number' ? image : image.id
      //     if (typeof link.reference.value === "number") console.log({ xx: link.reference })
      const doc = typeof image == 'number' ? await args.populate({ collection: "assets", id: image }) : image
      // const src = doc.sizes.sm.url
      const id = image.id
      const src = `${site.storage}/${image.sizes.sm.filename}`
      // console.log({ image, src })

      const imageString = richTextImg(src);

      const normalSize = `
      width:${width};
      height:${height};
      vertical-align:${vertAlign};`

      const minSize = `
      @media(width <= 810px) {
        width:${phoneWidth ?? width};
        height:${phoneHeight ?? height};
        vertical-align:${vertAlign}
      }`

      // word class is used for rich text animations be careful with removing it
      return `
        <style>
      #pill-image-${id} {
        margin: 0 20px;
        display: inline-block;
        border-radius: 9999px;
        overflow: hidden;
      ${normalSize ?? ""}
      }
      ${minSize}
      </style>
        <span id="pill-image-${id}" class="animate-word" style="" >
          ${imageString}
      </span>
        `;
    }
  }
});
