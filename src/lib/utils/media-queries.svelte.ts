import { MediaQuery } from 'svelte/reactivity';

export const clipped = new MediaQuery('min-width: 1024px');

export const mobile = new MediaQuery('max-width: 768px');

export const large = new MediaQuery('min-width: 1280px')

