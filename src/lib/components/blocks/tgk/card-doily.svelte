<script lang="ts">
	import type { ITGKDoilyCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ITGKDoilyCard } = $props();
</script>

<section id="TGKDoilyCard" class="">
	<div
		style:width={blockData.style?.width}
		style:height={blockData.style?.height}
		class="grid grid-cols-1 grid-rows-1 justify-center items-center"
	>
		<div class="col-start-1 row-start-1">
			<Image image={blockData.bg} class="" />
		</div>
		<div style:padding={blockData.style?.padding} class="col-start-1 row-start-1">
			<Image image={blockData.img} class="" />
		</div>
	</div>
</section>
