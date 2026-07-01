<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';
	import { cn } from '@/utils';
	import { type IClipGutter } from '@payload-types';

	const { blockData: data }: { blockData: IClipGutter } = $props();

	const [minX, minY, width, height] = data.viewbox?.split(' ').filter(Boolean) || [];
</script>

<svg
	class="h-full w-full"
	viewBox={data.viewbox ?? '0 0 100 100'}
	preserveAspectRatio="xMinYMin slice"
>
	{#if data.background || data.clipPath}
		<clipPath id="clip-gutter-path">
			<path d={data.clipPath} />
		</clipPath>
		<rect
			fill={data.background}
			x={minX}
			y={minY}
			{height}
			{width}
			clip-path="url(#clip-gutter-path)"
		/>
	{/if}
</svg>

<!--  <div class="">
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
</div>  -->
