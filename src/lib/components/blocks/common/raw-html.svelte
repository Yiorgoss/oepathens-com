<script lang="ts">
	import type { IRawHtml } from '@payload-types';
	import { onMount } from 'svelte';
	let { blockData }: { blockData: IRawHtml } = $props();

	const { height, background, width, alignX, alignY, overflow, margin } = $derived(
		blockData?.style || {}
	);

	let container: HTMLElement;
	// onMount(() => {
	// 	container.innerHTML = blockData.html;
	// });
</script>

<div
	style:height
	style:width
	style:overflow
	style:margin
	style:background
	style:justify-content={alignX}
	style:align-items={alignY}
	class="h-full w-full"
	bind:this={container}
	id="raw-html-block"
>
	<!-- Mindbody Schedules widget begin -->
	<div class="mindbody-widget" data-widget-type="Schedules" data-widget-id="bf846270b81"></div>
	<script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"></script>
	<!-- Mindbody Schedules widget end -->
</div>
