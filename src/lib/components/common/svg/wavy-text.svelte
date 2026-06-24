<script lang="ts">
	import { animate, scroll } from 'motion';
	import { onMount } from 'svelte';

	const { data }: { data: any } = $props();

	const [minX, minY, width, height] = data.viewbox.split(' ').filter(Boolean);

	let elem: HTMLElement;
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
	viewBox={data.viewbox ?? '0 0 100 100'}
	preserveAspectRatio="xMinYMin slice"
>
	{#if data.background data.clipPath}
		<clipPath id="wavyBox">
			<path d={data.clipPath} />
		</clipPath>
		<rect
			fill={data.background}
			x={minX}
			y={minY}
			{height}
			{width}
			clip-path="url(#wavyBox)"
		/>
	{/if}
	<path
		stroke={data.strokeColor ?? 'transparent'}
		stroke-width={data.strokeWidth}
		stroke-linecap="round"
		id="wavy-text-path"
		d={data.path}
		fill="none"
	/>
	<text font-size={data.fontSize} word-spacing={data.wordSpacing}>
		<textPath
			href="#wavy-text-path"
			alignment-baseline="middle"
			fill={data.color}
			startOffset="0"
			text-anchor="middle"
		>
			{data.text}
			{data.text}
			{data.text}
		</textPath>
	</text>
</svg>
