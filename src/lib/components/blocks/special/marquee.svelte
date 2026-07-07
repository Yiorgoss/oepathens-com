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
	style:padding
	style:background
	style:color
	class:mask-none={!options?.maskEdges}
	class="mask-l-from-90% mask-r-from-90% overflow-clip"
>
	<a
		style:height
		style:border-top={border}
		style:border-bottom={border}
		style:max-height={height}
		href={(link as Page)?.slug}
		aria-hidden={!(link as Page)?.slug}
		class="flex"
	>
		{#each { length: 2 }, _}
			<div
				style:gap
				style:animation-duration={options?.duration}
				class:opacity-50={true}
				class:flex-wrap={prefersReducedMotion.current}
				class="marquee-default flex flex-wrap justify-around items-center"
			>
				{#each items as { image, text }}
					<div class="w-full h-full">
						<Image {image} class="h-full object-contain " />
					</div>
					<div style:font class="font-semibold text-xl text-nowrap">{text}</div>
				{/each}
			</div>
		{/each}
	</a>
</section>

<style>
	.marquee-default {
		animation: marquee 50s linear infinite;
	}
</style>
