<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { type IFlexboxLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';

	const { blockData }: { blockData: IFlexboxLayout } = $props();
</script>

<section id="flexbox-layout" class="">
	<div
		style:justify-center={blockData.style?.alignX}
		style:align-items={blockData.style?.alignY}
		style:gap={blockData.style?.gap}
		style:flex-direction={blockData.style?.flexDirection}
		style:flex-wrap={blockData.style?.flexWrap}
		style:overflow={blockData.style?.overflow}
		class="w-full h-full flex flex-wrap justify-start md:justify-center items-center gap-2"
	>
		{#each blockData.list ?? [] as { block }}
			<div class="shrink-0">
				<RenderBlocks blockData={block?.[0]} />
			</div>
		{/each}
	</div>
</section>
