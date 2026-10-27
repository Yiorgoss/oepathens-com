<script lang="ts">
	import { type IRichText } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Image from '@/components/common/image.svelte';
	import { mobile } from '@/utils/media-queries.svelte';

	const { blockData }: { blockData: IRichText } = $props();
</script>

<section
	id="rich-text-block"
	style:height={blockData.style?.height}
	style:width={blockData.style?.width}
	style:background={blockData.style?.background}
	style:justify-content={blockData.style?.alignX}
	style:align-items={blockData.style?.alignY}
	style:padding={mobile.current ? blockData.mobileS?.padding : blockData.style?.padding}
	style:overflow={blockData.style?.overflow}
	style:border-radius={blockData.style?.borderRadius}
	class:container={blockData.style?.container}
	class="relative grid justify-center items-center mx-auto py-0 md:py-5"
>
	{#if blockData?.bgImg}
		<div class="col-start-1 row-start-1">
			<Image image={blockData?.bgImg} />
		</div>
	{/if}
	<div class="col-start-1 row-start-1">
		{#if blockData.richText}
			<RichTextRender richText={blockData.richText} />
		{/if}
	</div>
</section>
