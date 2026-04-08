<script lang="ts">
	import type { IRichTextCard } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import * as Card from '@/components/ui/card';
	import Image from '@/components/common/image.svelte';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IRichTextCard } = $props();
	const {
		richText,
		style: { background, alignX, alignY, borderRadius, width, maxWidth, border, hasShadow } = {}
	} = $derived(blockData);
</script>

<section id="rich-text-card-block" class="flex items-center justify-center h-full w-full py-8">
	<Card.Root
		style={`background:${background};border:${border};border-radius:${borderRadius};width:${width};max-width:${width && 'unset'};`}
		class={cn(
			'overflow-hidden relative h-full max-w-xs w-full hover:scale-105 transition-transform duration-300',
			hasShadow && 'shadow-none'
		)}
	>
		{#if blockData?.image}
			<div class="absolute inset-0">
				<Image image={blockData?.image} />
			</div>
		{/if}
		<Card.Content
			style={`justify-content:${alignX};align-items:${alignY}`}
			class="h-full z-0 flex justify-start col-start-1 row-start-1 items-start"
		>
			<RichTextRender {richText} />
		</Card.Content>
	</Card.Root>
</section>
