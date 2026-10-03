# Design choices, code style, and block creation

Orientation for anyone changing Calisto. Domain vocabulary lives in `CONTEXT.md`; the implementation map lives in `docs/architecture.md`; this file records the conventions and the mechanics of adding a block.

## 1. Design choices

### Multi-tenant by per-domain fork

One tenant is one domain, served by one fork of this repo and one Cloudflare Worker.
`base-calisto` is always `upstream`; the tenant's own repo is `origin`.
The running deployment looks up its tenant by its own domain name, so no runtime host-dispatch exists.
Custom block components and divergent styling are expected per tenant, which is why a fork is the unit rather than a shared runtime.

### Payload is the source of truth

All content, pages, navigation, and assets are authored in the Payload CMS (a separate repo, `cms-mt`).
The frontend fetches it over REST and renders it.
No content lives in this repo.

`src/payload-types.ts` is generated from the CMS, never hand-edited.
The CMS runs `pnpm generate:types`; this repo copies the result with `pnpm typegen:payload` (`cp ../cms-mt/src/payload-types.ts ./src/payload-types.ts`).

### Prerender at build, Live Preview at runtime

Pages set `prerender = true` and export an `entries` generator, so HTML is built ahead of time from CMS content.
Payload's Live Preview is the escape hatch: with `?livePreview=true&collection=pages|tenants`, the running site subscribes to CMS changes and re-renders without a rebuild.
The trade-off, recorded in `docs/adr/0002-build-time-prerender-with-live-preview.md`, is that content changes need a rebuild except while an editor is in preview.

### Everything is a Block

A Page is a Hero plus an ordered list of Blocks, plus Meta.
A Nav is two Block lists (header and footer).
The atomic unit is a typed CMS object whose `blockType` string selects a Svelte component.
Blocks can nest: layout blocks (`blockColumnLayout`, `flexboxLayout`), the carousel, and forms all render child Blocks through `RenderBlocks`.

This is what makes the CMS and the site evolve independently: content composition is data, not code.

### Cloudflare Workers, one adapter

Deployment is `@sveltejs/adapter-cloudflare` and `wrangler.jsonc`, with `production` and `staging` environments.
Static assets are served from `assets.calisto.studio`.
`wrangler.jsonc` carries `%domainName%` placeholders that `scripts/add_domain_wrangler.sh` replaces at provisioning time, so the template is not coupled to any one domain.

### Client-rendered blocks (current state, with a known cost)

`render-blocks.svelte` resolves each `blockType` to a component inside a `$effect`, which does not run during server rendering.
A commented-out `$derived(await …)` form sits beside it.
The effect is that every page ships as a shell plus data and all markup is produced by client JS after load.
The render analysis measured the cost: this gates first contentful paint and makes the whole JS graph effectively render-blocking.
Fixing it (the compiler's `experimental.async` is already enabled) is the single highest-impact change available.

### CSP and third parties

`svelte.config.js` sets a strict `kit.csp` policy.
Cloudflare auto-injects its Web Analytics beacon, so `script-src` must allow `https://static.cloudflareinsights.com` and `connect-src` must allow `https://cloudflareinsights.com`.
Iconify fetches at runtime, so `connect-src` must allow `api.iconify.design`, `api.simplesvg.com`, and `api.unisvg.com` - with no trailing spaces, which would invalidate a source.

## 2. Code style and conventions

### Svelte 5 runes only

Components use runes, not the legacy store/`export let` syntax.
- Props: `const { blockData, className }: { blockData: IFoo; className?: string } = $props();`
- Local state: `let open = $state(false);`
- Derived values: `const { richText, image, style } = $derived(blockData || {});`
- Side effects: `$effect(() => { ... })`.
- Snippets (`{#snippet}` / `{@render}`) for reused markup, including recursive `RenderBlocks` calls.
- `$bindable()` for two-way bound props such as `ref`.

`compilerOptions.experimental.async` is on, so async `$derived`/`{#await}` are available where needed.

### TypeScript, strict, typed from the CMS

`tsconfig.json` runs `strict` and `moduleResolution: bundler`.
Every block imports its interface from `@payload-types` (the alias points at `src/payload-types.ts`) and types its prop with it.
Do not hand-write a shape that the CMS already generates.
When the CMS type lags a deployed field, prefer a narrow local type with a comment over an unbounded `any`.

### Formatting and linting

- Prettier is the formatter: tabs, single quotes, no trailing commas, `printWidth: 100`, with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss` (class order is enforced).
- ESLint is the flat config in `eslint.config.js`: `@eslint/js`, `typescript-eslint`, `eslint-plugin-svelte`, and `eslint-config-prettier`.
- `pnpm lint` is `prettier --check . && eslint .`; `pnpm check` runs `svelte-check`.
- Both must pass before a change ships.

### Tailwind 4, CSS-first

`src/app.css` is the theme: `@import 'tailwindcss'` plus the design tokens as CSS variables.
Colors are `oklch(...)`; the palette is the shadcn-svelte token set (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--ring`, …).
Typography is a custom scale (`--text-xs` … `--text-9xl`) with a mobile override, and font roles are `--sans`, `--serif`, `--cursive`, `--multi-lingual-*`.
There is no Tailwind config file; extend the theme in `app.css`.

### Class composition

Use `cn(...)` from `@/utils`, which is `clsx` plus `tailwind-merge`, so later classes win.
Variant-driven components use `tailwind-variants` (see the `ui/button` primitive).
Prefer `cn` over string concatenation.

### UI primitives

`src/lib/components/ui/*` holds shadcn-svelte primitives built on `bits-ui` (button, card, dialog, select, sheet, carousel, accordion, …), configured by `components.json`.
Aliases: `@/components` → `src/lib/components`, `@/utils` → `src/lib/utils`, `@/components/ui` → the primitives.
Reach for an existing primitive before writing new interaction code.

### Naming

- Block component files are kebab-case (`single-card.svelte`, `mid-float-header.svelte`).
- CMS block slugs and `blockType` strings are camelCase (`singleCard`, `scrollGrowLanding`, `tgkCard1`).
- `interfaceName` is `I` + PascalCase (`ISingleCard`), generating that interface in `payload-types.ts`.
- Content-block components live in one prop shape (see below); shared helpers live in `src/lib/utils` and are re-exported from `@/utils`.

### Errors, `dev`-gating, and comments

Server loaders currently use `.then(...).catch(...)` chains that can throw inside `then`; treat loader error handling as an area to improve, not a pattern to copy.
Diagnostic `console.log` calls exist in the loaders; keep new noise out of production paths and gate anything unavoidable behind `dev`.
Comments are used for genuine constraints and known rough edges (the block-switch FIX, the Live Preview unsubscribe); keep them accurate when you change the code beside them.

## 3. Block creation methods

Adding a block is a two-repo change: define it in the CMS, render it in the frontend, then regenerate types.

### 3.1 CMS side (`cms-mt`)

A block is a `Block` object under `src/blocks/<category>/<slug>.ts`:

```ts
import { Block } from 'payload'
import { smallBlockList } from '../block-list'
import { StyleField } from '@/fields'

export const Carousel: Block = {
  slug: 'carousel',
  dbName: 'block_c',          // unique across all blocks
  interfaceName: 'ICarousel', // generates the TS interface
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Carousel Content', fields: [ /* content fields */ ] },
        { label: 'Carousel Styles', fields: [ StyleField({ include: ['background', 'padding', 'gap', 'container', 'width'] }) ] }
      ]
    }
  ]
}
```

Conventions:
- Organise fields into a `Content` tab and a `Styles` tab; use `StyleField({ include: [...] })` for style controls so the frontend gets a typed `style` object.
- Use the shared field helpers from `@/fields`: `RichText()`, `Image()`, `LinkButton()`, `Icon()`, plus `StyleField`, `Animation`, and the rest.
- Nest blocks with `{ type: 'blocks', name: 'items', blockReferences: <list>, blocks: [] }`.

Registration, all in `cms-mt`:
1. Import the new block in `src/blocks/index.ts` and add it to the default export array.
2. Add its slug to the appropriate list in `src/blocks/block-list.ts` (`defaultBlockList` for page layouts, `heroBlockList` for heroes, `headerBlockList` / `footerBlockList` for nav, `smallBlockList` for carousel-style children, `contentBlockList` for reusable content).
3. Regenerate types: `pnpm generate:types`.
4. Add a migration for the schema change: `pnpm mc` (`payload migrate:create`) and commit it under `src/migrations/`. In dev, `push: true` auto-syncs the schema; staging and production use migrations.

### 3.2 Frontend side (`base-calisto`)

A component mirrors the CMS block and consumes `blockData`:

```svelte
<script lang="ts">
  import type { ISingleCard } from '@payload-types';
  import { cn } from '@/utils';

  const { blockData, className, cb, ref = $bindable(null) }:
    { blockData: ISingleCard; className?: string; cb?: () => void; ref?: HTMLElement | null } = $props();
  const { richText, image, style } = $derived(blockData || {});
</script>
```

Conventions:
- Live at `src/lib/components/blocks/<same-category>/<kebab-name>.svelte`, mirroring the CMS grouping.
- Accept the shared props: `blockData` (typed), optional `className`, optional `cb` (called from `onMount` when the block is ready), optional `ref` (`$bindable`), and `...restProps`.
- Read style through `blockData.style` and apply background, padding, border, radius, max-width, and layout with inline styles (the CMS emits free-form values) plus Tailwind classes for everything else.
- Render nested blocks with `RenderBlocks` and rich text with `RichTextRender` from `../rich-text`.
- Use `Image` from `@/components/common/image.svelte` for images (it handles `srcset`, the placeholder, and preload); use `Icon` for icons.

Registration:
- Add a `case '<blockType>':` to the `dynamicResolveBlock` switch in `src/lib/components/blocks/render-blocks.svelte`, returning the dynamic `import(...)`.
  The switch is deliberately explicit; `render-blocks.svelte` carries a FIX noting it will not scale indefinitely.
- Blocks are code-split by that dynamic import, so only the blocks a page uses are fetched.

### 3.3 Type and schema flow

1. CMS: change the block, `pnpm generate:types`, `pnpm mc`.
2. Frontend: `pnpm typegen:payload` copies the regenerated `payload-types.ts` in.
3. Frontend: the block's `blockData` now types cleanly against the generated interface.

### 3.4 Verifying a block

- `pnpm check` (svelte-check) and `pnpm lint` must pass.
- `pnpm build` must complete; it prerenders from the live CMS, so the CMS must be reachable and the tenant must exist.
- A block with visual behaviour should be driven in a browser (the project's own visual check is expected for UI changes).

## 4. Rendering and data flow

- `src/routes/[[locale=locale]]/+layout.server.ts` loads the tenant's Nav by domain name.
- `src/routes/[[locale=locale]]/[...slug]/+page.server.ts` loads the Page by tenant domain and slug, and exports `entries` for prerendering.
- The layout renders header and footer through `RenderBlocks`; the page renders Hero then the layout blocks, each through `RenderBlocks`.
- Rich text is Lexical in Payload and is converted to HTML with `convertLexicalToHTMLAsync` plus the custom `htmlConverters` in `rich-text/converters`, populating relationships through `getRestPopulateFn`.
- Images use `image.svelte`: responsive `srcset` from the CMS `sizes`, a placeholder `preload`, lazy loading by default, and an optional hover zoom.
- Animations are `motion`-based and configured from CMS animation fields (`src/lib/attachments/animations`).

## 5. Where things live

| Path | Purpose |
| --- | --- |
| `src/routes/[[locale=locale]]/` | Layout and page routes, server loads, prerender entries |
| `src/lib/components/blocks/` | Block components grouped by category, plus `render-blocks.svelte` |
| `src/lib/components/blocks/rich-text/` | Lexical-to-HTML rendering and converters |
| `src/lib/components/common/` | Shared non-block components (`image`, `icon`, `button`, …) |
| `src/lib/components/ui/` | shadcn-svelte primitives (bits-ui based) |
| `src/lib/utils/` | `cn`, CMS fetch/resolve helpers, rich-text-to-HTML helpers |
| `src/lib/config.ts` | `site` config (CMS URL, domain, assets) and locales |
| `src/lib/attachments/animations/` | `motion` scroll and viewport animation helpers |
| `src/payload-types.ts` | Generated CMS types; never edit by hand |
| `scripts/` | Provisioning (`github_init.sh`), domain rewrite (`add_domain_wrangler.sh`), WASM build |
| `packages/epub_converter/` | Rust crate for the Embolden EPUB tool, compiled to WASM |

## 6. Known rough edges

These are observations, not decisions; record a decision as an ADR if one is settled.

- **Client-rendered blocks.** The `$effect` resolver means no block content is server-rendered; this is the dominant render-performance cost. The async alternative is already scaffolded.
- **The block switch will not scale.** `render-blocks.svelte` hard-codes one `case` per block; a glob or registry-based resolver would replace it.
- **Duplicate WASM output.** Built Embolden WASM exists in two places and has drifted; only `@/assets/wasm/...` is imported.
- **Live Preview subscription leak.** The page component subscribes in `onMount` without returning an unsubscribe, unlike the layout.
- **Loader error handling.** The loaders throw inside `.then` and assume `docs[0]` exists, so a missing page or tenant can surface as a `TypeError` instead of a 404.
- **Sibling-repo dependency.** `pnpm typegen:payload` copies from `../cms-mt`, so types cannot be regenerated without that checkout.
- **English-only locales.** `el` is commented out in `src/lib/config.ts`.
- **Thin testing.** There is no meaningful test suite, and CI only runs on manual dispatch.
