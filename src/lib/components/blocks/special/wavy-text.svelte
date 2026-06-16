<script lang="ts">
	import type { IWavyText } from '@payload-types';
	import SVGRender from '@/components/common/svg/svg-render.svelte';

	const { blockData }: { blockData: IWavyText } = $props();
	const data = $derived({
		...blockData.svg,
		text: blockData.text
	});
</script>

<section
	id="WavyText"
	style:height={blockData?.style?.height}
	style:width={blockData?.style?.width}
	class="relative h-100 w-full overflow-hidden max-w-full"
>
	<SVGRender name="wavy-text" class="absolute inset-0 z-10 w-full h-full" {data} />
</section>
