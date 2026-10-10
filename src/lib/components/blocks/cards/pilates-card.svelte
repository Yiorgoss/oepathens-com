<script lang="ts">
	import type { IPilatesCard, Page } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import Stars from '@/components/common/stars.svelte';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: IPilatesCard } = $props();
</script>

<section id="PilatesCard" class="h-full">
	<div
		style:background={blockData.style?.background}
		style:border-radius={blockData.style?.borderRadius}
		class="flex max-w-md flex-col"
	>
		<div class="w-full">
			<Image image={blockData.image} />
		</div>
		<div style:padding={blockData.style?.padding} class="flex flex-col">
			<Stars />
			<RichTextRender richText={blockData.richText} />
		</div>
	</div>
</section>
