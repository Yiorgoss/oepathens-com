<script lang="ts">
	import type { IFooterDesign2 } from '@payload-types';
	import RenderBlocks from '../../render-blocks.svelte';

	const { blockData }: { blockData: IFooterDesign2 } = $props();
</script>

<section id="footer-design-2" class="">
	<div
		style:border-radius={blockData.style?.borderRadius}
		style:background={blockData.style?.background}
		style:flex-direction={blockData.style?.flexDirection}
		style:justify-content={blockData.style?.alignX}
		style:align-items={blockData.style?.alignY}
		class:container={blockData.style?.container}
		class="flex justify-center p-4 md:p-8 items-center flex-col sm:flex-row mx-auto gap-10"
	>
		<div class="w-full">
			{#each blockData.columnOne ?? [] as block, i}
				<RenderBlocks blockData={block} />
			{/each}
		</div>
		<div class="w-full">
			{#each blockData.columnTwo ?? [] as block, i}
				<RenderBlocks blockData={block} />
			{/each}
		</div>
		<div class="w-full mx-auto grid place-content-center bg-blue-400">
			<div class="">
				{#each blockData.columnThree ?? [] as block, i}
					<RenderBlocks className="" blockData={block} />
				{/each}
			</div>
		</div>
	</div>
</section>
