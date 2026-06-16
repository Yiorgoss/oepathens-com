<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';
	import { cn } from '@/utils';
	import { type IClipGutter } from '@payload-types';

	const { blockData }: { blockData: IClipGutter } = $props();
</script>

<div class="">
	<SVGRender
		name="clip-path"
		data={{
			path: blockData.path,
			scale: blockData.scale
		}}
	/>
	<div
		style="clip-path:url(#wave-1);"
		style:background-color={blockData.bgColor}
		class:-scale-100={blockData.keepBelow}
		class="w-full h-100 overflow-hidden"
	>
		{#if blockData.bgImage}
			<Image image={blockData.bgImage} />
		{/if}
	</div>
</div>
