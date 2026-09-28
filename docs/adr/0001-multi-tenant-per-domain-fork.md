# Multi-tenant via per-domain forked repo and Worker

Each tenant is served by its own fork of `base-calisto` and its own Cloudflare Worker, rather than one shared runtime dispatching on the incoming host. We chose this because tenants need custom block components and divergent styling, and a per-tenant repo gives them an isolated deploy, build, and blast radius. `base-calisto` is kept as `upstream`, and `scripts/github_init.sh` provisions each fork's repo, secrets, and variables.

## Consequences

- A shared fix must be propagated to every tenant via the upstream pull in the `deploy` script, which is the main source of friction.
- Custom per-tenant blocks (`tgk/`) live in the same tree as shared blocks, so the line between template and customisation is maintained by convention, not by the build.
