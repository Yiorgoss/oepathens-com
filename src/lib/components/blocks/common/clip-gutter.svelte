<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';
	import { cn } from '@/utils';
	import { type IClipGutter } from '@payload-types';

	const { blockData: data }: { blockData: IClipGutter } = $props();

	const [minX, minY, width, height] = $derived(data.svg?.viewbox?.split(' ').filter(Boolean) || []);
</script>

<div
	style:background={data?.style?.background}
	style:height={data?.style?.height}
	class="h-full w-full grid grid-cols-1 grid-rows-1"
>
	{#if data.bgImage}
		<div class="row-start-1 col-start-1">
			<Image image={data.bgImage} />
		</div>
	{/if}
	<svg
		class="row-start-1 col-start-1"
		viewBox={data.svg?.viewbox ?? '0 0 100 100'}
		preserveAspectRatio="xMinYMin slice"
	>
		{#if data.svg?.background || data.svg?.clipPath}
			<clipPath id="clip-gutter-path">
				<path d={data.svg?.clipPath} />
			</clipPath>
			<rect
				fill={data.svg?.background}
				x={minX}
				y={minY}
				{height}
				{width}
				clip-path="url(#clip-gutter-path)"
			/>
		{/if}
	</svg>
</div>
