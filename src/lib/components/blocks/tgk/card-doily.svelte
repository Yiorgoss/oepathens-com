<script lang="ts">
	import type { ITGKDoilyCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ITGKDoilyCard } = $props();
</script>

<section id="TGKDoilyCard" class="">
	<div
		style:width={blockData.style?.width}
		style:height={blockData.style?.height}
		style:aspect-ratio={blockData.style?.aspectRatio}
		class="grid grid-cols-1 grid-rows-1 justify-stretch items-stretch"
	>
		<div class="col-start-1 row-start-1">
			<Image image={blockData.bg} class="" />
		</div>
		<div
			style:padding={blockData.style?.padding}
			class="flex justify-center items-center col-start-1 row-start-1"
		>
			<Image image={blockData.img} class="" />
		</div>
	</div>
</section>
