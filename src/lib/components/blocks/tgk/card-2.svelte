<script lang="ts">
	import type { ITGKCard2 } from '@payload-types';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ITGKCard2 } = $props();
</script>

<section id="TGKCard2" class="h-full">
	<div
		style:background={blockData.style?.background}
		style:border={blockData.style?.border}
		style:height={blockData.style?.height}
		style:width={blockData.style?.width}
		class:max-w-sm={!blockData.style?.width}
		class="flex flex-col border-2 border-border p-6 h-full justify-between items-center overflow-hidden rounded-3xl"
	>
		<div class="w-full h-auto rounded-xl aspect-3/4 overflow-hidden">
			<Image class="" image={blockData.image} />
		</div>
		<div
			style:font-size={blockData.style?.fontSize}
			style:color={blockData.style?.color}
			class="font-serif pt-6 text-xl"
		>
			{blockData.title}
		</div>
	</div>
</section>
