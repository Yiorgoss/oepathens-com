<script lang="ts">
	import Image from '@/components/common/image.svelte';
	import Sticker from '@/components/common/sticker.svelte';
	import { cn } from '@/utils';
	import { type IImage } from '@payload-types';

	let {
		blockData,
		sizes,
		ref = $bindable(null)
	}: { blockData: IImage; sizes?: string; ref?: HTMLElement | null } = $props();
</script>

<div
	id="image-block"
	style:height={blockData.style?.height}
	style:width={blockData.style?.width}
	style:justify-content={blockData.style?.alignX}
	style:align-items={blockData.style?.alignY}
	style:overflow={blockData.style?.overflow}
	style:padding={blockData.style?.padding}
	class="flex h-full relative w-fit max-w-full"
>
	<Image class="h-full w-full" image={blockData.image} {sizes} />
	{#each blockData.arr ?? [] as sticker}
		<Sticker data={sticker.s} />
	{/each}
</div>
