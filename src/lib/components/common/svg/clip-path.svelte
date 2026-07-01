<script lang="ts">
	const { data }: { data: IClipGutter } = $props();
	const [minX, minY, width, height] = data.viewbox?.split(' ').filter(Boolean);
</script>

<svg
	bind:this={elem}
	class="h-full w-full"
	viewBox={data.viewbox ?? '0 0 100 100'}
	preserveAspectRatio="xMinYMin slice"
>
	{#if data.background || data.clipPath}
		<clipPath id="wavyBox">
			<path d={data.clipPath} />
		</clipPath>
		<rect fill={data.background} x={minX} y={minY} {height} {width} clip-path="url(#wavyBox)" />
	{/if}
</svg>
<!--  <svg>
	<defs>
		<clipPath transform={`scale(${data.scale})`} id="wave-1" clipPathUnits="objectBoundingBox">
			<path d={data.path} />
		</clipPath>
	</defs>
</svg>  -->
