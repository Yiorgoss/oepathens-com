<script lang="ts">
	import type { IWavyText } from '@payload-types';
	import SVGRender from '@/components/common/svg/svg-render.svelte';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: IWavyText } = $props();
</script>

<div class="">
	<section
		id="WavyText"
		style:height={blockData?.style?.height}
		style:width={blockData?.style?.width}
		class="h-100 w-full overflow-hidden max-w-full grid grid-cols-1 grid-rows-1"
	>
		{#if blockData.bgImage}
			<div class="relative row-start-1 col-start-1">
				<Image class="" image={blockData.bgImage} />
			</div>
		{/if}
		<div style:background={blockData.style?.background} class="relative row-start-1 col-start-1">
			<SVGRender
				name="wavy-text"
				class="absolute inset-0 w-full isolate h-full "
				data={blockData}
			/>
		</div>
	</section>
</div>
