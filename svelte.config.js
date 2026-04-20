import adapter from "@sveltejs/adapter-cloudflare";
// import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	// build: { minify: process.env.PUBLIC_ENV !== "LOCAL" ? true : false },
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      platformProxy: {
        configPath: 'wrangler.jsonc',
        environment: 'staging',
        experimentalJsonConfig: true,
        persist: true
      }
    }),
      // csp: {
      //   directives: {
      //     'frame-src': ['https://admin.calisto.studio', 'self']
      //   },
      // },
    alias: {
      '@': "src/lib",
      // '@payload-types': '../cms-mt/src/payload-types.ts',
      '@payload-types':'./src/payload-types.ts'
    }
  }
};

export default config;
