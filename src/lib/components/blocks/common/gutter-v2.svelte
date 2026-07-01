<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import { type IGutterV2 } from '@payload-types';

	const { blockData: data }: { blockData: IGutterV2 } = $props();
</script>

<div
	style:background={data.style.background}
	style:height={data.style.height}
	class:container={data.style.container}
	id="gutterV2"
	class="relative mx-auto flex items-center"
>
	{#if data?.image}
		<div class="z-0 absolute inset-0">
			<Image image={data?.image} />
		</div>
	{/if}
	<div class="z-0 h-px w-full" style:background={data.style.color}></div>
</div>
