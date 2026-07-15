<script lang="ts">
	import { type IFlexboxLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: IFlexboxLayout } = $props();
</script>

<section id="flexbox-layout" class="">
	<div style:background={blockData.style?.background} class="grid grid-cols-1 grid-rows-1">
		<div class="col-start-1 row-start-1">
			<div class="">
				<Image image={blockData?.bgImg} />
			</div>
		</div>
		<div
			style:justify-center={blockData.style?.alignX}
			style:align-items={blockData.style?.alignY}
			style:gap={blockData.style?.gap ?? '30px'}
			style:flex-direction={blockData.style?.flexDirection}
			style:overflow={blockData.style?.overflow}
			style:padding={blockData.style?.padding ?? '0px 20px'}
			class="w-full h-full container flex flex-wrap justify-center mx-auto col-start-1 row-start-1"
		>
			{#each blockData.list ?? [] as { block }}
				<div class="flex grow justify-center xl:shrink basis-full sm:basis-1/3 xl:basis-1/5">
					<RenderBlocks blockData={block?.[0]} />
				</div>
			{/each}
		</div>
	</div>
</section>
