<script lang="ts">
	const { data }: { data: any } = $props();
</script>

<svg
	class="absolute inset-0 h-full w-full"
	viewBox={data.viewbox ?? '0 0 100 100'}
	preserveAspectRatio="xMinYMin slice"
>
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
			alignment-baseline="middle"
			fill={data.color}
			href="#wavy-text-path"
			startOffset="50%"
			text-anchor="middle"
		>
			{data.text}
		</textPath>
	</text>
</svg>
