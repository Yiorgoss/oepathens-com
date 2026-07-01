import { defaultColors } from "./colors"

const NodeFormat = {
  DOM_ELEMENT_TYPE: 1,
  DOM_TEXT_TYPE: 3,
  // Reconciling
  NO_DIRTY_NODES: 0,
  HAS_DIRTY_NODES: 1,
  FULL_RECONCILE: 2,
  // Text node modes
  IS_NORMAL: 0,
  IS_TOKEN: 1,
  IS_SEGMENTED: 2,
  IS_INERT: 3,
  // Text node formatting
  IS_BOLD: 1,
  IS_ITALIC: 1 << 1,
  IS_STRIKETHROUGH: 1 << 2,
  IS_UNDERLINE: 1 << 3,
  IS_CODE: 1 << 4,
  IS_SUBSCRIPT: 1 << 5,
  IS_SUPERSCRIPT: 1 << 6,
  IS_HIGHLIGHT: 1 << 7,
  // Text node details
  IS_DIRECTIONLESS: 1,
  IS_UNMERGEABLE: 1 << 1,
  // Element node formatting
  IS_ALIGN_LEFT: 1,
  IS_ALIGN_CENTER: 2,
  IS_ALIGN_RIGHT: 3,
  IS_ALIGN_JUSTIFY: 4,
  IS_ALIGN_START: 5,
  IS_ALIGN_END: 6,
} as const

const textState = {
  type: {
    cursive: { css: { 'font-family': 'var(--cursive, cursive)' }, label: 'cursive' },
    sans: { css: { 'font-family': 'var(--sans, sans-serif)' }, label: 'sans-serif' },
    serif: { css: { 'font-family': 'var(--serif, serif)' }, label: 'serif' },
    'multi-lingual-serif': { label: "serif-multi-lingual", css: { 'font-family': 'var(--multi-lingual-serif, serif)' } },
    'multi-lingual-sans': { label: "sans-multi-lingual", css: { 'font-family': 'var(--multi-lingual-sans, sans)' } },
  },
  background: {
    background: { css: { background: 'var(--background, #3a383b)', padding: "5px" }, label: 'background' },
    foreground: { css: { background: 'var(--foreground, #bbb5bd)', padding: "5px" }, label: 'foreground' },
    primary: { css: { background: 'var(--primary, #531970)', padding: "5px" }, label: 'primary' },
    'secondary': { css: { background: 'var(--secondary, #6155cf )', padding: "5px" }, label: 'secondary' },
    'chart-1': { label: 'chart-1 ', css: { background: 'var(--chart-1, #f54a00 )', padding: "5px" } },
    'chart-2': { label: 'chart-2 ', css: { background: 'var(--chart-2, #009689)', padding: "5px" } },
    'chart-3': { label: 'chart-3 ', css: { background: 'var(--chart-3, #104e64)', padding: "5px" } },
    'chart-4': { label: 'chart-4 ', css: { background: 'var(--chart-4, #ffba00)', padding: "5px" } },
    'chart-5': { label: 'chart-5 ', css: { background: 'var(--chart-5, #009528)', padding: "5px" } },
  },
  color: {
    ...defaultColors.text,
  },
  themeColors: {
    background: { css: { color: 'var(--background, #3a383b)' }, label: 'background' },
    foreground: { css: { color: 'var(--foreground, #bbb5bd)' }, label: 'foreground' },
    primary: { css: { color: 'var(--primary, #531970)' }, label: 'primary' },
    'secondary': { css: { color: 'var(--secondary, #6155cf )' }, label: 'secondary' },
    'chart-1': { label: 'chart-1 ', css: { color: 'var(--chart-1, #f54a00 )' } },
    'chart-2': { label: 'chart-2 ', css: { color: 'var(--chart-2, #009689)' } },
    'chart-3': { label: 'chart-3 ', css: { color: 'var(--chart-3, #104e64)' } },
    'chart-4': { label: 'chart-4 ', css: { color: 'var(--chart-4, #ffba00)' } },
    'chart-5': { label: 'chart-5 ', css: { color: 'var(--chart-5, #009528)' } },
  },
  fontWeight: {
    black: { css: { 'font-weight': '900' }, label: 'black' },
    bold: { css: { 'font-weight': '700' }, label: 'bold' },
    extrabold: { css: { 'font-weight': '800' }, label: 'extrabold' },
    extralight: { css: { 'font-weight': '200' }, label: 'extralight' },
    light: { css: { 'font-weight': '300' }, label: 'light' },
    medium: { css: { 'font-weight': '500' }, label: 'medium' },
    normal: { css: { 'font-weight': '400' }, label: 'normal' },
    semibold: { css: { 'font-weight': '600' }, label: 'semibold' },
    thin: { css: { 'font-weight': '100' }, label: 'thin' },
  },
  size: {
    'text-2xl': {
      css: {
        'font-size': 'var(--text-2xl,24px)',
        'line-height': 'var(--text-2xl--line-height, 1.2)',
      },
      label: 'text-2xl',
    },
    'text-3xl': {
      css: {
        'font-size': 'var(--text-3xl,30px)',
        'line-height': 'var(--text-3xl--line-height,1.2 )',
      },
      label: 'text-3xl',
    },
    'text-4xl': {
      css: {
        'font-size': 'var(--text-4xl,36px)',
        'line-height': 'var(--text-4xl--line-height, 1.2)',
      },
      label: 'text-4xl',
    },
    'text-5xl': {
      css: {
        'font-size': 'var(--text-5xl,48px)',
        'line-height': 'var(--text-5xl--line-height, 1)',
      },
      label: 'text-5xl',
    },
    'text-6xl': {
      css: {
        'font-size': 'var(--text-6xl,60px)',
        'line-height': 'var(--text-6xl--line-height, 1)',
      },
      label: 'text-6xl',
    },
    'text-7xl': {
      css: {
        'font-size': 'var(--text-7xl,72px)',
        'line-height': 'var(--text-7xl--line-height,1 )',
      },
      label: 'text-7xl',
    },
    'text-8xl': {
      css: {
        'font-size': 'var(--text-8xl, 96px)',
        'line-height': 'var(--text-8xl--line-height, 1)',
      },
      label: 'text-8xl',
    },
    'text-9xl': {
      css: {
        'font-size': 'var(--text-9xl, 128px)',
        'line-height': 'var(--text-9xl--line-height, 1)',
      },
      label: 'text-9xl',
    },
    'text-base': {
      css: {
        'font-size': ' var(--text-base, 16px)',
        'line-height': ' var(--text-base--line-height,1.5)',
      },
      label: 'text-base',
    },
    'text-lg': {
      css: {
        'font-size': 'var(--text-lg, 18px)',
        'line-height': 'var(--text-lg--line-height,1.4)',
      },
      label: 'text-lg',
    },
    'text-sm': {
      css: {
        'font-size': ' var(--text-sm, 14px)',
        'line-height': ' var(--text-sm--line-height, 1.6])',
      },
      label: 'text-sm',
    },
    'text-xl': {
      css: {
        'font-size': 'var(--text-xl, 20px)',
        'line-height': 'var(--text-xl--line-height, 1.4)',
      },
      label: 'text-xl',
    },
    'text-xs': {
      css: {
        'font-size': ' var(--text-xs, 12px)',
        'line-height': ' var(--text-xs--line-height,1.7)',
      },
      label: 'text-xs',
    },
  },
}

// export type StateValues = { [stateValue: string]: { css: string; label: string } }

// type ExtractAllColorKeys<T> = {
//   [P in keyof T]: T[P] extends StateValues ? keyof T[P] : never
// }[keyof T]

// type TextStateKeys = ExtractAllColorKeys<typeof textState>

//FIX types
export const customText = ({ node }) => {
  let text = node.text

  const style = {}
  if (node.$) {
    Object.entries(textState).forEach(([stateKey, stateValues]) => {
      const stateValue = node.$ && (node.$[stateKey] as TextStateKeys)
      if (stateValue && stateValues[stateValue]) {
        //@ts-ignore
        Object.assign(style, stateValues[stateValue].css)
      }
    })
  }
  let providedCSSString = ''
  for (const key of Object.keys(style)) {
    providedCSSString += `${key}: ${style[key]};`
  }

  // split each sentence into words
  // is this wasteful?
  text = node.text.split(" ").reduce((acc, word) => acc + `<span class="animate-word"> ${word}</span>`, "")


  text = `<span class="" style="${providedCSSString}">${text}</span>`

  if (node.format & NodeFormat.IS_BOLD) {
    text = `<strong >${text}</strong>`
  }
  if (node.format & NodeFormat.IS_ITALIC) {
    text = `<em >${text}</em>`
  }
  if (node.format & NodeFormat.IS_STRIKETHROUGH) {
    text = `<span style="text-decoration: line-through;">${text}</span>`
  }
  if (node.format & NodeFormat.IS_UNDERLINE) {
    text = `<span style="text-decoration: underline;">${text}</span>`
  }
  if (node.format & NodeFormat.IS_CODE) {
    text = `<code >${text}</code>`
  }
  if (node.format & NodeFormat.IS_SUBSCRIPT) {
    text = `<sub >${text}</sub>`
  }
  if (node.format & NodeFormat.IS_SUPERSCRIPT) {
    text = `<sup >${text}</sup>`
  }

  return text
}
