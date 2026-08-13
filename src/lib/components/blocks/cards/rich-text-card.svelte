<script lang="ts">
	import type { IRichTextCard } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import * as Card from '@/components/ui/card';
	import Image from '@/components/common/image.svelte';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IRichTextCard } = $props();
	const {
		richText,
		style: {
			background,
			alignX,
			alignY,
			selfAlignX,
			selfAlignY,
			borderRadius,
			width,
			maxWidth,
			border,
			hasShadow
		} = {}
	} = $derived(blockData);
</script>

<section
	id="rich-text-card-block"
	style:justify-content={selfAlignX}
	style:align-items={selfAlignY}
	class="flex items-center justify-center w-full h-full py-8"
>
	<Card.Root
		style={`background:${background};border:${border};border-radius:${borderRadius};width:${width};max-width:${width && 'unset'};`}
		class={cn(
			'relative h-full max-w-xs w-full hover:scale-105 transition-transform duration-300',
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
