<script lang="ts">
	import type { IVertColumnLayout } from '@payload-types';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';

	const { blockData }: { blockData: IVertColumnLayout } = $props();
	$inspect(blockData.block)
</script>

<section id="VerticalColumn">
	<div
		style:background={blockData.style?.background}
		class="flex flex-col">
		{#each blockData.block as b}
			<RenderBlocks blockData={b} />
		{/each}
	</div>
</section>
