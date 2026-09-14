<script lang="ts">
	import type { IWellnessCard, Page } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: IWellnessCard } = $props();
	const { borderRadius, height, width, alignY, alignX } = $derived(blockData.style || {});
	$inspect(blockData.style);
</script>

<section id="IWellnessCard" class="">
	<a
		href={(blockData.link as Page)?.slug}
		aria-hidden={!(blockData.link as Page)?.slug}
		style:border-radius={borderRadius}
		style:height
		style:width
		class="grid grid-cols-1 grid-rows-1 overflow-hidden"
	>
		<div class="col-start-1 row-start-1">
			<Image image={blockData.image} />
		</div>
		<div
			style:justify-content={alignX}
			style:align-items={alignY}
			class="col-start-1 row-start-1 flex justify-start items-start"
		>
			<RichTextRender richText={blockData.richText} />
		</div>
	</a>
</section>
