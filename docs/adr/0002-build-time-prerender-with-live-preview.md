# Build-time prerender from the CMS, with Live Preview

Pages are prerendered at build time from Payload CMS content rather than fetched per request. This keeps the Worker cheap and the site fast, at the cost of content changes requiring a rebuild. Payload's Live Preview channel is the escape hatch for editors, letting the running site subscribe to draft changes without a rebuild.

## Considered Options

- **Per-request server rendering**: always fresh, but pays a CMS round trip on every request and needs caching to stay fast.
- **Incremental/on-demand revalidation**: fresher than a full rebuild, but adds cache-invalidation machinery this project has not needed.
