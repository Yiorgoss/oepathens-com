<script lang="ts">
	import { type IFlexboxLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: IFlexboxLayout } = $props();
</script>

<section id="flexbox-layout" class="">
	<div style:background={blockData.style?.background} class="h-fit grid grid-cols-1 grid-rows-1">
		<div class="z-0 relative col-start-1 row-start-1">
			<div class="absolute inset-0">
				<Image image={blockData?.bgImg} />
			</div>
		</div>
		<div
			style:justify-center={blockData.style?.alignX}
			style:align-items={blockData.style?.alignY}
			style:flex-direction={blockData.style?.flexDirection}
			style:overflow={blockData.style?.overflow}
			style:padding={blockData.style?.padding ?? '0px 20px'}
			class="z-10 w-full h-fit container flex flex-wrap justify-center mx-auto col-start-1 row-start-1"
		>
			{#each blockData.list ?? [] as { block }}
				<div
					style:padding={blockData.style?.gap}
					class="flex max-md:justify-center basis-full sm:basis-1/2 xl:basis-1/4"
				>
					<RenderBlocks blockData={block?.[0]} />
				</div>
			{/each}
		</div>
	</div>
</section>
