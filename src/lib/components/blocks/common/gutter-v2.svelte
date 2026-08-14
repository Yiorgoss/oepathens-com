<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import Sticker from '@/components/common/sticker.svelte';
	import { type IGutterV2 } from '@payload-types';

	const { blockData: data }: { blockData: IGutterV2 } = $props();
</script>

<div
	id="gutterV2"
	style:background={data.style?.background}
	style:height={data.style?.height}
	style:justify-content={data.style?.alignX}
	style:align-items={'end' ?? data.style?.alignY}
	class:container={data.style?.container}
	class="relative mx-auto flex items-center"
>
	{#if data?.bgImg}
		<div class="z-0 absolute inset-0 flex">
			<Image image={data?.bgImg} />
		</div>
	{/if}
	{#if data?.image}
		<div class="z-0 absolute left-0 right-0">
			<Image image={data?.image} />
		</div>
	{/if}
	<div class="z-0 h-px w-full" style:background={data.style?.color}></div>
	<div class="">
		<Sticker data={data.s} />
	</div>
</div>
