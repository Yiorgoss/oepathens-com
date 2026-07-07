<script lang="ts">
	import type { ITGKCard2, Page } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: ITGKCard2 } = $props();
</script>

<section id="TGKCard2" class="h-full">
	<a
		href={(blockData.link as Page)?.slug}
		aria-hidden={!(blockData.link as Page)?.slug}
		class="flex hover:scale-105 transition-transform duration-300"
	>
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
			<div class="">
				<RichTextRender richText={blockData.richText} />
			</div>
		</div>
	</a>
</section>
