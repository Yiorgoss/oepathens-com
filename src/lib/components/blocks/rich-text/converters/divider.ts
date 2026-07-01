export const divider = async ({ node }) => {
  const { width, border, alignX, padding, height, background } = node.fields.style

  return `<div style="justify-content:${alignX};padding:${padding};height=${height};background:${background};" class="flex w-full">
            <div style="width:${width};border-bottom:${border};height:1px"></div>
          </div>`
}
