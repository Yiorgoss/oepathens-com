import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
    // host: '0.0.0.0', // needed so it's reachable over Tailscale at all
    allowedHosts: true,
  },
  plugins: [
    tailwindcss(),
    sveltekit(),
    visualizer({
      emitFile: true,
      filename: 'stats.html'
    })
  ],
  // build: { minify: false },
});
