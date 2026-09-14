<script lang="ts">
	import type { IClientSideEmbed } from '@payload-types';
	import { onMount } from 'svelte';
	let { blockData }: { blockData: IClientSideEmbed } = $props();

	const { background, padding, margin, height, width } = $derived(blockData || {});

	let container: HTMLElement;

	onMount(() => {
		container.innerHTML = blockData.html;

		const oldScript = container.querySelector('script');
		const newScript = document.createElement('script');

		// copy every attribute (src, async, data-*, etc.) without needing to know them ahead of time
		Array.from(oldScript?.attributes || []).forEach((attr) => {
			newScript.setAttribute(attr.name, attr.value);
		});

		// copy inline script content too, if any
		newScript.textContent = oldScript?.textContent || '';

		oldScript?.replaceWith(newScript);

		const fallback = container.querySelector('.tt-widget-fallback');
		if (fallback) fallback.innerHTML = '';
	});
</script>

<div
	bind:this={container}
	style:height
	style:background
	style:width
	style:margin
	style:padding
	class="max-w-[800px] mx-auto"
	id="ticket-tailor-embed"
></div>
