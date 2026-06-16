<script lang="ts">
	const { data }: { data: any } = $props();
</script>

<svg>
	<defs>
		<clipPath transform={`scale(${data.scale})`} id="wave-1" clipPathUnits="objectBoundingBox">
			<path d={data.path} />
		</clipPath>
	</defs>
</svg>
