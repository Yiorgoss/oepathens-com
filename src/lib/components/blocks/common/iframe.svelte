<script lang="ts">
	import type { IIFrame } from '@payload-types';
	import { onMount } from 'svelte';
	let { blockData }: { blockData: IIFrame } = $props();

	const { height, width, alignX, alignY, overflow, margin } = $derived(blockData || {});

	let iframeContainer: HTMLElement;
	onMount(() => {
		iframeContainer.innerHTML = blockData.iframe;
	});
</script>

<div
	style:height
	style:width
	style:overflow
	style:margin
	style:justify-content={alignX}
	style:align-items={alignY}
	class="h-100 w-full bg-green-400"
	bind:this={iframeContainer}
	id="IFrame-block"
></div>
