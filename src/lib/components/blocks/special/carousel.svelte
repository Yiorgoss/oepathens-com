<script lang="ts">
	import { type ICarousel } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import * as Carousel from '@/components/ui/carousel';
	import { type CarouselAPI } from '@/components/ui/carousel/context';
	import { cn } from '@/utils';
	import { MediaQuery } from 'svelte/reactivity';

	const { blockData }: { blockData: ICarousel; class?: string } = $props();
	const { items, options } = $derived(blockData);

	let api = $state<CarouselAPI>();
	$effect(() => {
		if (!api) return;
	});

	let categories = $derived.by(() => {
		const categ = (items ?? [])
			.map((item) => item.blockName)
			.filter(Boolean)
			.map((categoryList) => categoryList?.split(',').map((x) => x.trim()))
			.flat(2);

		return [...new Set(categ)];
	});
	let selected = $state('all');
	let filteredItems = $derived.by(() => {
		if (!items) return [];
		if (items.length <= 0) return [];
		if (selected == 'all') return items;

		return items?.filter((item) => item.blockName?.includes(selected));
	});

	const mobile = new MediaQuery('max-width: 768px');
</script>

<section style:background={blockData.style?.background} id="carouselBlock" class="max-md:pb-12">
	{#if categories && categories.length > 0}
		<div
			style:padding={blockData.categS?.padding}
			class="flex flex-wrap items-center justify-center pb-10"
		>
			<button
				onclick={() => (selected = 'all')}
				class={cn(
					'hover:text-primary/50 elected px-3 font-semibold',
					selected == 'all' && 'text-primary underline underline-offset-6 '
				)}
			>
				All
			</button>
			{#each categories as category}
				<button
					onclick={() => (selected = category)}
					class={cn(
						'hover:text-primary/50 elected px-3 font-semibold',
						selected == category && 'text-primary underline underline-offset-6 '
					)}>{category}</button
				>
			{/each}
		</div>
	{/if}
	<div
		class:container={blockData.style?.container}
		style:padding={blockData.style?.padding}
		class=" relative mx-auto px-1"
	>
		<Carousel.Root
			opts={{
				loop: !!options?.loop,
				align: 'start'
			}}
			setApi={(emblaApi: CarouselAPI | undefined) => (api = emblaApi)}
		>
			<Carousel.Content style={`padding:${blockData.interS?.padding}`} class="w-full">
				{#each filteredItems ?? [] as item (item.id)}
					<Carousel.Item
						style={`padding-right:${blockData.style?.gap};width:${blockData.style?.width}`}
						class="min-w-80 basis-auto"
					>
						<RenderBlocks blockData={item} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous
				variant="ghost"
				style={`color:${blockData.arrowS?.color}; border:${blockData.arrowS?.border};`}
				class={cn(
					'text-secondary border-secondary left-0 translate-0 border-2 hover:border-black max-md:top-auto max-md:right-1/2 max-md:bottom-0 max-md:left-auto max-md:mt-2 max-md:size-12 max-md:-translate-x-5 max-md:translate-y-full',
					blockData.style?.container && '-ml-2 -translate-x-full'
				)}
			/>
			<Carousel.Next
				variant="ghost"
				style={`color:${
					mobile.current
						? (blockData.arrowMobS?.color ?? blockData.arrowS?.color)
						: blockData.arrowS?.color
				};
				 border:${
						mobile.current
							? (blockData.arrowMobS?.border ?? blockData.arrowS?.border)
							: blockData.arrowS?.border
					};`}
				class={cn(
					'text-secondary border-secondary right-0 translate-0 border-2 hover:border-black max-md:top-auto max-md:bottom-0  max-md:left-1/2 max-md:mt-2 max-md:size-12 max-md:translate-x-5 max-md:translate-y-full',
					blockData.style?.container && '-mr-2 translate-x-full'
				)}
			/>
		</Carousel.Root>
	</div>
</section>
