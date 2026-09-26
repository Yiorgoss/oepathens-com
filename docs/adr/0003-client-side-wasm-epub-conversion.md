# Client-side WASM EPUB conversion

The EPUB tool transforms files entirely in the browser, using a Rust crate compiled to WASM (`packages/epub_converter`), rather than uploading them to a server. This keeps user files off our infrastructure and avoids a server-side job queue and storage, at the cost of shipping the WASM binary and doing the work on the user's machine.

## Considered Options

- **Server-side conversion**: simpler client, but requires upload, storage, and cleanup of user files, plus compute to run the transforms.
- **Pure JavaScript conversion**: no WASM toolchain, but loses the Rust XML handling and would be a substantial rewrite.
