<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import type { IMarquee, Page } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import { resolveID } from '@/utils';
	import { page } from '$app/state';
	import { prefersReducedMotion } from 'svelte/motion';

	const { blockData }: { blockData: IMarquee } = $props();
	const {
		items = [],
		style: { font, background, color, height, border, padding, gap } = {},
		options,
		link
		//  animation
	} = $derived(blockData);
</script>

<section
	id="marquee-block"
	style:border
	style:padding
	style:background
	style:color
	class:mask-none={!options?.maskEdges}
	class="mask-l-from-90% mask-r-from-90% overflow-clip"
>
	<a href={(link as Page)?.slug} aria-hidden={!(link as Page)?.slug}>
		<div
			style:height
			style:gap
			style:animation-duration={options?.duration}
			class:flex-wrap={prefersReducedMotion.current}
			class="marquee-default w-max flex justify-center items-center gap-x-10"
		>
			{#each [...items!, ...items!] as { image, text }, i}
				<Image {image} class="h-full" />
				<div style:font class="text-nowrap">{text}</div>
			{/each}
		</div>
	</a>
</section>

<style>
	.marquee-default {
		animation: marquee 40s linear infinite;
	}
</style>
