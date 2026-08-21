<script lang="ts">
	import { type IMediumHero } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';

	const { blockData, cb }: { blockData: IMediumHero; cb?: () => void } = $props();
	$effect(() => cb && cb());
	//  const { image, richText } = $derived(blockData);
</script>

<section id="medium-hero" class="relative w-full flex justify-center items-center">
	<div class="absolute inset-0 z-0">
		{#if blockData.image}
			<Image class="rounded-none " image={blockData.image} />
		{/if}
	</div>

	{#if blockData.richText}
		<RichTextRender
			overrides="max-w-full container flex justify-center items-center"
			richText={blockData.richText}
		/>
	{/if}
</section>
