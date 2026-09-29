<script lang="ts">
	import { type IFlexboxLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: IFlexboxLayout } = $props();
</script>

<section id="flexbox-layout" class="">
	<div style:background={blockData.style?.background} class="grid h-fit grid-cols-1 grid-rows-1">
		<div class="relative z-0 col-start-1 row-start-1">
			<div class="absolute inset-0">
				<Image image={blockData?.bgImg} />
			</div>
		</div>
		<div
			style:justify-center={blockData.style?.alignX}
			style:align-items={blockData.style?.alignY}
			style:flex-direction={blockData.style?.flexDirection}
			style:overflow={blockData.style?.overflow}
			style:container={blockData.style?.container}
			style:padding={blockData.style?.padding ?? '0px 20px'}
			class="z-10 col-start-1 row-start-1 mx-auto flex h-fit w-full flex-wrap justify-center"
		>
			{#each blockData.list ?? [] as { block }}
				{#if block}
					<div
						style:padding={blockData.style?.gap}
						class="flex basis-full max-md:justify-center sm:basis-1/2 xl:basis-1/4"
					>
						<RenderBlocks blockData={block[0]} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
