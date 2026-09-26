# Architecture

Orientation for this repo. Vocabulary lives in `CONTEXT.md`; this file is the implementation map.

## What this is

A multi-tenant, CMS-driven marketing-site platform. The frontend (SvelteKit) fetches everything from a **Payload CMS** and renders it. The same codebase is deployed once per customer domain, each with its own Cloudflare Worker, GitHub repo, and domain name.

- **Payload CMS** is the source of truth for pages, tenants, nav, and assets. It is a **separate repository** (`../cms-mt`), not vendored here. `src/payload-types.ts` is generated from it; do not edit it by hand.
- **Cloudflare Workers** is the deploy target, via `@sveltejs/adapter-cloudflare` and `wrangler.jsonc` (separate `production` and `staging` environments). Assets are served from `assets.calisto.studio`.
- **`base-calisto`** is the upstream template. Per-tenant repos keep it as `upstream` and rewrite `origin` to their own repo via `scripts/github_init.sh`.

## Request flow

```
Browser -> Cloudflare Worker (SvelteKit)
        -> fetch Payload CMS REST API (by tenant domain + slug)
        -> render Payload Blocks as Svelte components
```

Routing lives in `src/routes/[[locale=locale]]/`:

- `+layout.server.ts` loads the tenant's Nav by domain name.
- `[...slug]/+page.server.ts` loads the Page by `tenant-domain` + `slug`.
- The page route sets `prerender = true` and exports an `entries` generator, so Pages are built ahead of time from CMS content.
- Live Preview is wired via `@payloadcms/live-preview` in the layout and page, keyed on `?livePreview=true&collection=...`.

## The block rendering model

Everything is a Block. `src/lib/components/blocks/render-blocks.svelte` maps a `blockType` string to a Svelte component through a large `switch` plus dynamic `import()`.

| Directory | Purpose |
| --- | --- |
| `hero/` | landing heroes (cutout, video, scroll-grow, gradient) |
| `cards/` | feature, discount, wellness, hover, rich-text cards |
| `layout/`, `common/` | gutters, flex/column layouts, images, iframes, buttons |
| `navigation/` | headers and footers |
| `forms/`, `special/` | contact forms, accordions, carousels, marquees, bento grids |
| `rich-text/` | Payload Lexical rich-text to Svelte converters |
| `tgk/`, `seo/`, `embed/`, `unique/` | client-specific blocks, meta tags, TicketTailor, the EPUB tool |

## The EPUB tool (`packages/epub_converter`)

A Rust crate named **`embolden`**, compiled to WASM with `wasm-pack`. It runs entirely in the browser.

`lib.rs` exposes three functions:

- `convert` - inserts `<b>` tags around the first 1 to 4 characters of each word (`convert_to_bold.rs`).
- `insert_into_content_opf` - injects a custom font entry into the EPUB manifest (`custom_font.rs`).
- `alter_identifier` - appends `_diff_copy` to the EPUB identifier.

The frontend is `src/lib/components/blocks/unique/embolden/epub-converter.svelte` plus `functions/process_files.ts`: it unzips the `.epub` with `fflate`, transforms each XHTML/CSS/OPF entry, rezips, and offers a download. Options are bold-fullstop, font embedding (OpenDyslexic, Montserrat, Noto Sans Mono), and weight sliders.

## Known rough edges

These are observations, not decided direction. Record a decision as an ADR if one gets settled.

- **Duplicate WASM output.** Built WASM is committed in both `src/lib/wasm/embolden/` and `src/lib/assets/wasm/embolden/`, and the two copies differ. Only `@/assets/wasm/...` is imported. The npm script `embolden` writes to `src/lib/wasm`, while `scripts/embolden_wasm_gen.sh` points at `assets/wasm` and a `converter` directory that does not exist, so the two generation paths have drifted.
- **Dead Rust code.** `packages/epub_converter/src/add_global_styles.rs` is empty and its exports are commented out in `lib.rs`.
- **The block switch will not scale.** `render-blocks.svelte` carries `// FIX figure out a glob match this will become unmanageable at some point` above a roughly 60-case `switch`.
- **Live Preview subscription leak.** `[...slug]/+page.svelte` calls `payloadSubscribe` in `onMount` but never returns an unsubscribe (the layout does).
- **Loader error handling.** The load functions use a `.then(...).catch(...)` chain that throws inside `then` and assumes `json.docs[0]` exists; a missing page or tenant can produce a `TypeError` rather than the intended 404.
- **Sibling-repo dependency.** `pnpm typegen:payload` copies from `../cms-mt`, so types cannot be regenerated without that checkout.
- **English-only locales.** `el` is commented out in `src/lib/config.ts`.
- **Thin testing.** No meaningful test suite; the Rust `convert_to_bold` test is an empty stub. CI (`update_worker.yaml`) runs on `workflow_dispatch` only.
