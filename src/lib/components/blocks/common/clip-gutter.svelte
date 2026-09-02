<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';
	import { cn } from '@/utils';
	import { type IClipGutter } from '@payload-types';

	const { blockData: data }: { blockData: IClipGutter } = $props();

	const [minX, minY, width, height] = $derived(data.svg?.viewbox?.split(' ').filter(Boolean) || []);
</script>

<section id="ClipGutter">
	<div
		style:background={data?.style?.background}
		style:height={data?.style?.height}
		class="h-full w-auto grid grid-cols-1 grid-rows-1"
	>
		{#if data.bgImage}
			<div class="relative z-0 overflow-hidden row-start-1 col-start-1">
				<Image class="absolute inset-0" image={data.bgImage} />
			</div>
		{/if}
		<svg
			class="h-full w-auto row-start-1 z-10 col-start-1"
			viewBox={data.svg?.viewbox ?? '0 0 100 100'}
			preserveAspectRatio="xMinYMin slice"
		>
			{#if data.svg?.background || data.svg?.clipPath}
				<clipPath id="clip-gutter-path">
					<path d={data.svg?.clipPath} />
				</clipPath>
				<rect
					fill={data.svg?.background}
					x={parseInt(minX) - 10}
					y={parseInt(minY) - 10}
					{height}
					{width}
					clip-path="url(#clip-gutter-path)"
				/>
			{/if}
		</svg>
	</div>
</section>
