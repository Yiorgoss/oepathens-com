<script lang="ts">
	import { type ICarousel } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import * as Carousel from '@/components/ui/carousel';
	import { type CarouselAPI } from '@/components/ui/carousel/context';

	const { blockData }: { blockData: ICarousel; class?: string } = $props();
	const { items, options } = $derived(blockData);

	let api = $state<CarouselAPI>();
	$effect(() => {
		if (!api) return;
	});
</script>

<section style:background={blockData.style?.background} id="carouselBlock" class="max-md:pb-12">
	<div
		class:container={blockData.style?.container}
		class:padding={blockData.style?.padding}
		class=" mx-auto relative px-2"
	>
		<Carousel.Root
			opts={{
				loop: !!options?.loop,
				align: 'start'
			}}
			setApi={(emblaApi: CarouselAPI | undefined) => (api = emblaApi)}
		>
			<Carousel.Content class="w-full">
				{#each items ?? [] as item (item.id)}
					<Carousel.Item
						style={`padding-right:${blockData.style?.gap};width:${blockData.style?.width}`}
						class="basis-auto min-w-80"
					>
						<RenderBlocks blockData={item} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous
				variant="ghost"
				class="text-secondary border-2 border-secondary hover:border-black max-md:size-12 max-md:mt-2 max-md:top-auto max-md:bottom-0 max-md:left-auto max-md:right-1/2 translate-0 left-0 max-md:-translate-x-5 max-md:translate-y-full"
			/>
			<Carousel.Next
				variant="ghost"
				class=" text-secondary border-2 border-secondary hover:border-black max-md:size-12 max-md:mt-2 max-md:top-auto max-md:bottom-0  max-md:left-1/2 translate-0 right-0 max-md:translate-x-5 max-md:translate-y-full"
			/>
		</Carousel.Root>
	</div>
</section>
