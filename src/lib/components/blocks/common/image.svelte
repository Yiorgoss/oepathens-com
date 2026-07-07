<script lang="ts">
	import Image from '@/components/common/image.svelte';
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
	class="h-fit w-fit max-w-full overflow-hidden"
>
	<Image class="h-full w-full" image={blockData.image} {sizes} />
</div>
