<script lang="ts">
	import type { IWavyText } from '@payload-types';
	import { animate, scroll } from 'motion';
	import { onMount } from 'svelte';

	const { data }: { data: IWavyText } = $props();

	const [minX, minY, width, height] = data.svg?.viewbox?.split(' ').filter(Boolean);

	let elem: SVGSVGElement;
	onMount(() =>
		scroll(
			animate(elem.querySelectorAll('text > textPath'), {
				//@ts-ignore
				startOffset: '100%',
				repeat: Infinity,
				repeatType: 'mirror'
			}),
			{
				target: elem,
				offset: ['start end', 'end start']
			}
		)
	);
</script>

<svg
	bind:this={elem}
	class="h-full w-full"
	viewBox={data.svg?.viewbox ?? '0 0 100 100'}
	preserveAspectRatio="xMinYMin slice"
>
	{#if data.svg?.background || data.svg?.clipPath}
		<clipPath id="wavyBox">
			<path d={data.svg?.clipPath} />
		</clipPath>
		<rect
			fill={data.svg?.background}
			x={minX}
			y={minY}
			{height}
			{width}
			clip-path="url(#wavyBox)"
		/>
	{/if}
	<path
		stroke={data.svg?.strokeColor ?? 'transparent'}
		stroke-width={data.svg?.strokeWidth}
		stroke-linecap="round"
		id="wavy-text-path"
		d={data.svg?.path}
		fill="none"
	/>
	<text
		font-size={data.svg?.fontSize}
		word-spacing={data.svg?.wordSpacing}
		class="align-middle font-medium"
	>
		<textPath
			href="#wavy-text-path"
			alignment-baseline="middle"
			fill={data.svg?.color}
			startOffset="0"
			text-anchor="middle"
		>
			{data.text}
			{data.text}
			{data.text}
		</textPath>
	</text>
</svg>
