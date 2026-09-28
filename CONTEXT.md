# Calisto Studio

A multi-tenant, CMS-driven marketing-site platform: SvelteKit on Cloudflare Workers, rendering content authored in Payload CMS, plus a client-side EPUB transformation tool ("Embolden").

## Language

### Platform and tenancy

**Calisto Studio**:
The platform in this repo: a reusable marketing-site template deployed once per customer.
_Avoid_: calisto-studio, the app

**Tenant**:
A customer domain served by this platform. Identified by its domain name, and owns exactly one Nav and a set of Pages.
_Avoid_: site, customer, account

**Domain name**:
The tenant key. The same codebase is deployed per domain; the running deployment looks up its tenant by its own domain name.
_Avoid_: host, origin

**base-calisto**:
The upstream template repo. Per-tenant deployments treat it as `upstream` and their own repo as `origin`.
_Avoid_: main repo, template

**CMS**:
The external Payload backend that authors and serves all content. A separate repository, not vendored here.
_Avoid_: backend, admin

### Content model

**Page**:
A CMS-authored document addressed by a slug within a tenant. Composed of a Hero, a Page layout, and Meta.
_Avoid_: document, article

**Block**:
The atomic unit of CMS content: a typed object rendered by a matching Svelte component. Pages, Navs, and footers are all built from blocks.
_Avoid_: section, component, widget

**Block type**:
The string discriminator on a Block that selects which Svelte component renders it.
_Avoid_: block name, kind

**Hero**:
The first Block of a Page, rendered before the rest of the Page layout.
_Avoid_: banner, header

**Page layout**:
The ordered list of Blocks below the Hero. Distinct from a SvelteKit layout.
_Avoid_: layout (ambiguous on its own)

**Nav**:
The header and footer Block lists owned by a Tenant and rendered on every Page.
_Avoid_: navigation, menu

**Meta**:
The SEO fields (title and related tags) attached to a Page.
_Avoid_: SEO, head

**Live Preview**:
Payload's editing mode in which the running site subscribes to CMS changes and re-renders them without a rebuild.
_Avoid_: preview mode, draft mode

### Rendering

**Locale**:
The optional language prefix on a URL. Only `en` is currently supported.
_Avoid_: language, i18n

**Prerender**:
Building a Page's HTML ahead of time from CMS content rather than rendering it per request.
_Avoid_: static generation, SSG

### Embolden

**Embolden**:
The EPUB transformation tool: it bolds the leading characters of each word to produce a Bionic-Reading-style variant.
_Avoid_: emboldener, converter

**EPUB**:
The ebook archive format the tool reads and writes. The tool works entirely in the browser.
_Avoid_: ebook, book

**Bold fullstop**:
The Embolden option that also bolds a trailing period on each word.
_Avoid_: bold period, punctuation bolding

**Embed Font**:
The Embolden option that injects a chosen font file into the EPUB and rewrites its styles and manifest to use it.
_Avoid_: font embedding, custom font
