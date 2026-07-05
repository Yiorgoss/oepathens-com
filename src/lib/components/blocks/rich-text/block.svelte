<script lang="ts">
	import { type IRichText } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';

	const { blockData }: { blockData: IRichText } = $props();
</script>

<section
	id="rich-text-block"
	style:height={blockData.style?.height}
	style:width={blockData.style?.width}
	style:padding={blockData.style?.padding}
	style:background={blockData.style?.background}
	style:justify-content={blockData.style?.alignX}
	style:align-items={blockData.style?.alignY}
	class="relative flex justify-center items-center container mx-auto py-0 md:py-5"
>
	{#if blockData.richText}
		<RichTextRender richText={blockData.richText} />
	{/if}
</section>
