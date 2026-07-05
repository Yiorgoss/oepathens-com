<script lang="ts">
	import type { IStickyContainers } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Image from '@/components/common/image.svelte';
	import { cn } from '@/utils';
	import { MediaQuery } from 'svelte/reactivity';

	const mobile = new MediaQuery('max-width: 480px');

	const { blockData }: { blockData: IStickyContainers; index?: number } = $props();
	const { list, title, style } = $derived(blockData);

	//  const height = mobile.current ? mobileStyle?.height : style?.height;
</script>

<section id="sticky-container-root" class="container mx-auto">
	<div class="relative">
		{#each list ?? [] as { richText, image }, i}
			{@const left = i % 2 == 1}

			<div
				style:top={`${50 * i + 5}px`}
				style:border={blockData.style?.border}
				style:background={style?.multiBg?.bgs?.split(',')[i % style?.multiBg?.k]}
				style:border-radius={style?.borderRadius}
				class={cn(
					` text-background bg-foreground rounded-3xl sticky`,
					left && 'bg-background border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="px-6 font-serif italic break-all w-full p-2 text-xl">
						{title}
					</div>
				{/if}
				<div
					style:gap={style?.gap}
					style:padding={style?.padding}
					class="flex flex-col md:flex-row justify-start items-center"
				>
					<div
						class:md:order-last={left}
						class="dh-[300px] rounded-2xl overflow-hidden md:h-auto w-full md:w-1/2 px-4 py-10 md:px-10"
					>
						{#if image}
							<Image {image} class="" />
						{/if}
					</div>
					<div class:md:pl-10={left} class="h-full grow-2 shrink-0 flex-2 py-10 px-2">
						<RichTextRender
							overrides={cn(
								'prose-p:text-background prose-headings:text-background',
								left && 'prose-p:text-foreground prose-headings:text-foreground'
							)}
							{richText}
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
